/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Field from "@/components/widgets/form"
import { Loading } from "@/components/widgets/loading"
import { getErrorMessage } from "@/config/messages"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/tw"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { SignInWithProviderButton } from "./auth-buttons"

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type AuthFormSchema = z.infer<typeof authFormSchema>

export interface AuthFormProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title: ReactNode
  subtitle: ReactNode
  loading?: boolean

  hintText?: ReactNode
  hintAction?: ReactNode
  hintActionTo?: string

  emailPlaceholder?: string
  passwordPlaceholder?: string

  enableForgotPasswordButton?: boolean

  onContinueWithCredentials?: (data: {
    email: string
    password: string
  }) => Promise<any>

  onSuccess?: () => void
}

export function AuthForm({
  className,
  title,
  subtitle,
  loading: isLoading = false,
  hintText,
  hintAction,
  hintActionTo,
  enableForgotPasswordButton = true,
  emailPlaceholder = "next-starter@example.com",
  passwordPlaceholder = "Enter password.",
  onContinueWithCredentials,
  onSuccess,
  ...props
}: AuthFormProps) {
  const searchParams = useSearchParams()
  const methods = useForm<AuthFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authFormSchema),
  })

  const handleSignInWithCredentials = methods.handleSubmit(async (data) => {
    const result = await onContinueWithCredentials?.({
      email: data.email,
      password: data.password,
    })

    const errors = Object.entries(result.validationErrors ?? {})

    if (!errors.length) {
      onSuccess?.()
      return
    }

    errors.forEach(([key, msg]) => {
      methods.setError(key as any, {
        message: (msg as any)._errors.join(", "),
      })
    })
  })

  return (
    <FormProvider {...methods}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          {title || subtitle ? (
            <CardHeader className="text-center">
              {title ? (
                <CardTitle className="text-xl">{title}</CardTitle>
              ) : null}
              {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
            </CardHeader>
          ) : null}
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <SignInWithProviderButton provider="github">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 496 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                  Continue with Github
                </SignInWithProviderButton>
                <SignInWithProviderButton provider="google">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 488 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Continue with Google
                </SignInWithProviderButton>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <form
                onSubmit={handleSignInWithCredentials}
                className="grid gap-6"
              >
                <div className="grid gap-2">
                  <Field
                    component="text"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    label="Email"
                    required
                    tabIndex={1}
                  />
                  {searchParams.get("code") ? (
                    <small className="text-destructive">
                      {getErrorMessage(searchParams.get("code")!)}
                    </small>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {enableForgotPasswordButton ? (
                      <Link
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                        tabIndex={0}
                      >
                        Forgot your password?
                      </Link>
                    ) : null}
                  </div>
                  <Field
                    component="text"
                    name="password"
                    id="password"
                    type="password"
                    placeholder={passwordPlaceholder}
                    tabIndex={2}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  <Loading is={isLoading}>Continue</Loading>
                </Button>
              </form>

              {hintText ? (
                <div className="text-center text-sm">
                  {hintText}{" "}
                  <Link
                    href={hintActionTo ?? "#"}
                    className="underline underline-offset-4"
                  >
                    {hintAction}
                  </Link>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </div>
      </div>
    </FormProvider>
  )
}
