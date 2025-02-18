import { Loader2 } from "lucide-react"
import { PropsWithChildren } from "react"

export interface LoadingProps extends PropsWithChildren {
  is?: boolean
}

export const Loading = ({ is = false, children }: LoadingProps) => {
  return is ? <Loader2 className="size-4 animate-spin" /> : children
}
