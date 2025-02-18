"use client"

import { Session } from "next-auth"
import { SessionProvider as SessionProviderPrimitive } from "next-auth/react"
import { useMemo } from "react"

const SessionProvider = ({
  children,
  session,
}: {
  session: Session | null
  children: React.ReactNode
}) => {
  const sessionId = useMemo(
    () => session?.user.id ?? new Date().getTime(),
    [session]
  )
  return (
    <SessionProviderPrimitive
      key={sessionId}
      session={session}
      baseUrl="/api/auth"
    >
      {children}
    </SessionProviderPrimitive>
  )
}

export default SessionProvider
