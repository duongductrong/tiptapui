"use client"

import { redirect } from "@/i18n/routing"
import { getRedirectAuthPath } from "@/lib/auth-utils"
import { useSession } from "next-auth/react"
import { useLocale } from "next-intl"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const session = useSession()
  const locale = useLocale()

  if (session.status === "authenticated")
    return redirect({ locale, href: getRedirectAuthPath(session.data.user) })

  return children
}
