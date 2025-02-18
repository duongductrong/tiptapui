import { db } from "@/db"
import { users } from "@/db/schema"
import { UserInsertWithProvider } from "@/db/user/schema/user"
import { hashPassword } from "@/lib/password"
import { eq } from "drizzle-orm"
import invariant from "tiny-invariant"
import { connectProvider } from "./connect-provider"
import {
  USER_ALREADY_CONNECTED_ANOTHER_PROVIDER,
  USER_ALREADY_EXISTS,
  USER_CANNOT_CREATE,
} from "../code"

export const createUser = async (
  userReq: Omit<UserInsertWithProvider, "role">
) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, userReq.email),
    with: {
      providers: true,
    },
  })

  invariant(!Object.hasOwn(userReq, "role"), "User request must have a role")

  // If there is no existing user, create a new user
  if (!existingUser) {
    const [newUser] = await db
      .insert(users)
      .values({
        ...userReq,
        role: "customer",
        password: userReq?.password
          ? await hashPassword(userReq.password)
          : undefined,
      })
      .returning()

    // Connect the new user with the provided provider
    await connectProvider(newUser, {
      provider: userReq.provider!,
      providerId: userReq.providerId!,
    })

    return newUser
  }

  const isMatchedProvider = existingUser?.providers.find(
    (provider) => provider.provider === userReq.provider
  )

  const shouldConnectProvider =
    existingUser &&
    !isMatchedProvider &&
    userReq.provider &&
    userReq.provider !== "credentials"

  if (existingUser && isMatchedProvider) {
    throw new Error(USER_ALREADY_EXISTS)
  }

  if (shouldConnectProvider) {
    await connectProvider(existingUser, {
      provider: userReq.provider!,
      providerId: userReq.providerId!,
    })

    return existingUser
  }

  if (existingUser && userReq?.provider === "credentials") {
    throw new Error(USER_ALREADY_CONNECTED_ANOTHER_PROVIDER)
  }

  throw new Error(USER_CANNOT_CREATE)
}
