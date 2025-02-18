import { PropsWithChildren } from "react"

export interface FrontContentProps extends PropsWithChildren {}

const FrontContent = ({ children }: FrontContentProps) => {
  return <main className="container mx-auto min-h-dvh">{children}</main>
}

export default FrontContent
