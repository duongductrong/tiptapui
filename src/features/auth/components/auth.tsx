"use client"

import { urls } from "@/config/urls"
import { redirect } from "@/i18n/routing"
import { useSession } from "next-auth/react"
import { useLocale } from "next-intl"
import { PropsWithChildren } from "react"

export const abilities = {
  admin: {},
  customer: {},
}

export const AuthTrusted = ({ children }: PropsWithChildren) => {
  const session = useSession()
  const locale = useLocale()

  if (session.status === "loading") return "Verifying"

  if (session.status !== "authenticated") {
    return redirect({ href: urls.auth.signIn, locale: locale })
  }

  return children
}
