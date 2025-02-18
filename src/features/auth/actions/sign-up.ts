/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { urls } from "@/config/urls"
import { createUser } from "@/db/user/queries/create-user"
import { getUserByEmail } from "@/db/user/queries/get-user-by-email"
import { redirect } from "@/i18n/routing"
import { safeAction } from "@/lib/safe-action"
import { returnValidationErrors } from "next-safe-action"
import { z } from "zod"

const signUpWithCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const signUpWithCredentials = safeAction
  .schema(signUpWithCredentialsSchema)
  .action(async ({ parsedInput: credentials }) => {
    const user = await getUserByEmail({ email: credentials.email })

    if (user) {
      const isConnectedWithAnotherProvider = user.providers.find(
        (uProvider) => uProvider.provider !== "credentials"
      )

      return returnValidationErrors(signUpWithCredentialsSchema, {
        email: {
          _errors: [
            isConnectedWithAnotherProvider
              ? "The email is already connected to another account"
              : "Email already exists, please use a different email",
          ],
        },
      })
    }

    try {
      await createUser({
        email: credentials.email,
        password: credentials.password,
        provider: "credentials",
        providerId: null,
      })
    } catch (error) {
      return returnValidationErrors(signUpWithCredentialsSchema, {
        email: {
          _errors: [(error as any).message ?? "An unexpected error occurred"],
        },
      })
    }

    redirect({ locale: "en", href: urls.auth.signIn })
  })
