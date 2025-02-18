"use client"

import { webConfig } from "@/config/web"
import { cn } from "@/lib/tw"
import { GalleryVerticalEnd } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { ComponentProps } from "react"
import { AuthForm, AuthFormProps } from "../components/auth-form"
import { urls } from "@/config/urls"
import { signUpWithCredentials } from "../actions/sign-up"

export interface SignInScreenProps extends ComponentProps<"div"> {}

const SignInScreen = ({ className, ...props }: SignInScreenProps) => {
  const signUpWithCredentialsAct = useAction(signUpWithCredentials)

  const handleContinueWithCredentials: AuthFormProps["onContinueWithCredentials"] =
    (data) => {
      return signUpWithCredentialsAct.executeAsync({
        email: data.email,
        password: data.password,
      })
    }

  return (
    <div
      {...props}
      className={cn(
        "flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10",
        className
      )}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {webConfig.name}
        </a>
        <AuthForm
          title="Sign up"
          subtitle="With your Github or Google account"
          hintText="You're already have an account?"
          hintAction="Sign in"
          hintActionTo={urls.auth.signIn}
          enableForgotPasswordButton={false}
          onContinueWithCredentials={handleContinueWithCredentials}
          loading={signUpWithCredentialsAct.status === "executing"}
        />
      </div>
    </div>
  )
}

export default SignInScreen
