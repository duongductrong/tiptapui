import Link from "next/link"

export interface FrontFooterProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FrontFooter = (props: FrontFooterProps) => {
  return (
    <footer className="container mx-auto flex items-center justify-between h-16">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Tiptap Extensions. All rights
        reserved.
      </p>

      <p className="text-sm text-muted-foreground">
        A project by{" "}
        <Link href="https://twitter.com/duongductrong_" target="_blank">
          duongductrong
        </Link>
        .
      </p>
    </footer>
  )
}

export default FrontFooter
