import { USER_ALREADY_CONNECTED_ANOTHER_PROVIDER } from "@/db/user/code"

export const getErrorMessage = (code: string) => {
  switch (code) {
    case USER_ALREADY_CONNECTED_ANOTHER_PROVIDER:
      return "You are already connected with another provider"
    default:
      return "unknown error"
  }
}
