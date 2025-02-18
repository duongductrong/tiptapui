import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"
import { Provider } from "../../schema"
export const rolesEnum = pgEnum("role", ["customer", "admin"])

export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull().unique(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => new Date()),
    avatar: varchar({ length: 255 }),
    emailVerified: timestamp(),
    password: varchar({ length: 255 }),
    role: rolesEnum().default("customer"),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
)

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
export type UserInsertWithProvider = UserInsert &
  Pick<Provider, "provider" | "providerId">
export type UserRole = typeof rolesEnum
