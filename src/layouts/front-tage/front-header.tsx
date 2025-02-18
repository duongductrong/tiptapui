import { Link } from "@/i18n/routing"
import { ArrowUpRight, Sun } from "lucide-react"
import Image from "next/image"

export interface FrontHeaderProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FrontHeader = (props: FrontHeaderProps) => {
  return (
    <header className="flex items-center justify-between h-16 container mx-auto">
      <Image
        src="https://originui.com/_next/static/media/logo.f45f73fa.svg"
        alt="logo"
        width={100}
        height={100}
      />

      <div className="flex items-center gap-8">
        <Link
          href="https://twitter.com/originui"
          target="_blank"
          className="text-sm font-normal flex items-center gap-1"
        >
          Twitter <ArrowUpRight className="size-3 text-muted-foreground" />
        </Link>
        <Link
          href="https://github.com/originui"
          target="_blank"
          className="text-sm font-normal flex items-center gap-1"
        >
          Github <ArrowUpRight className="size-3 text-muted-foreground" />
        </Link>

        <Sun className="size-4 cursor-pointer" />
      </div>
    </header>
  )
}

export default FrontHeader
