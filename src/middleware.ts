import { routing } from "@/i18n/routing"
import { auth } from "auth"
import createMiddleware from "next-intl/middleware"

const middleware = createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
}

export default auth(middleware)
