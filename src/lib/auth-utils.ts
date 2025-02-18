import { urls } from "@/config/urls"
import { User } from "@/db/schema"

export const getRedirectAuthPath = (user: Partial<User>) => {
  if (user?.role === "admin") {
    return urls.admin.index
  }

  return urls.home
}
