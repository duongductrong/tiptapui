import { PropsWithChildren } from "react"
import FrontContent from "../../../layouts/front-stage/front-content"
import FrontFooter from "../../../layouts/front-stage/front-footer"
import FrontHeader from "../../../layouts/front-stage/front-header"

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
