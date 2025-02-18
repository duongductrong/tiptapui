import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import invariant from "tiny-invariant"

export interface GetUserByEmailVariables {
  email: string
}

export const getUserByEmail = async ({ email }: GetUserByEmailVariables) => {
  invariant(email, "Email must be provided")

  return db.query.users.findFirst({
    where: eq(users.email, email),
    columns: {
      avatar: true,
      createdAt: true,
      email: true,
      emailVerified: true,
      id: true,
      name: true,
      role: true,
      updatedAt: true,
      password: true,
    },
    with: {
      providers: true,
    },
  })
}
