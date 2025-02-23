import { PropsWithChildren } from "react"
import FrontContent from "./front-content"
import FrontFooter from "./front-footer"
import FrontHeader from "./front-header"

export interface FrontLayoutProps extends PropsWithChildren {}

const FrontLayout = ({ children }: FrontLayoutProps) => {
  return (
    <div>
      <FrontHeader />
      <FrontContent>{children}</FrontContent>
      <FrontFooter />
    </div>
  )
}

export default FrontLayout
