import { db } from "@/db"
import { Provider, providers, User } from "@/db/schema"

export const connectProvider = async (
  user: User,
  data: Pick<Provider, "provider" | "providerId">
) => {
  const result = await db.insert(providers).values({
    provider: data.provider,
    providerId: data.providerId,
    userId: user.id,
  })

  return result
}
