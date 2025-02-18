import { relations } from "drizzle-orm"
import { ProviderInsert, providers } from "../../schema"
import { User, users } from "./user"

export const usersRelations = relations(users, ({ many }) => ({
  providers: many(providers),
}))

export const providersRelations = relations(providers, ({ one }) => ({
  user: one(users, {
    fields: [providers.userId],
    references: [users.id],
  }),
}))

export type ProviderInsertWithUser = ProviderInsert & {
  userId: User["id"]
}
