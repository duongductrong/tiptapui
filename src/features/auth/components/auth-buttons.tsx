"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { composeEventHandler } from "@/lib/event"
import { Slot, SlotProps } from "@radix-ui/react-slot"
import { BuiltInProviderType } from "next-auth/providers"
import { signInWithOAuth, signOutWithAccount } from "../actions/sign-in"

export interface SignInWithProviderButtonProps extends ButtonProps {
  provider: BuiltInProviderType
}

export const SignInWithProviderButton = ({
  provider,
  children,
  ...props
}: SignInWithProviderButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      {...props}
      onClick={() => {
        signInWithOAuth(provider)
      }}
    >
      {children}
    </Button>
  )
}

export interface SignOutButtonProps extends SlotProps {
  asChild?: boolean
}

export const SignOutButton = ({
  children,
  onClick,
  asChild = false,
  ...props
}: SignOutButtonProps) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      {...props}
      onClick={composeEventHandler(onClick, () => signOutWithAccount())}
    >
      {children}
    </Comp>
  )
}
