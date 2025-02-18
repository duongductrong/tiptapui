import {
  USER_ALREADY_CONNECTED_ANOTHER_PROVIDER,
  USER_ALREADY_EXISTS,
} from "./code"

export const isUserAlreadyExists = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes(USER_ALREADY_EXISTS)
  }

  return false
}

export const isUserAlreadyConnectedAnotherProvider = (
  error: unknown
): boolean => {
  if (error instanceof Error) {
    return error.message.includes(USER_ALREADY_CONNECTED_ANOTHER_PROVIDER)
  }

  return false
}
