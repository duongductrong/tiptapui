/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { cn } from "@/lib/tw"
import {
  BubbleMenu,
  Editor,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Minus,
  Strikethrough,
  TextQuote,
  Type,
  Underline,
} from "lucide-react"
import { ScrollArea } from "./scroll-area"

const extensions = [StarterKit]

const tiptapActions = {
  bold: "bold",
  italic: "italic",
  underline: "underline",
  strikethrough: "strikethrough",
  code: "code",
  divider: "divider",
  heading1: "heading-1",
  heading2: "heading-2",
  heading3: "heading-3",
  heading4: "heading-4",
  heading5: "heading-5",
  heading6: "heading-6",
  text: "text",
  quote: "quote",
} as const

type TiptapAction = (typeof tiptapActions)[keyof typeof tiptapActions]

const tiptapTextParaphItems = [
  {
    key: tiptapActions.text,
    icon: Type,
    label: "Text",
    description: "Start writing with plain text",
  },
  {
    key: tiptapActions.quote,
    icon: TextQuote,
    label: "Quote",
    description: "Capture a quote",
  },
  {
    key: tiptapActions.heading1,
    icon: Heading1,
    label: "Heading 1",
    description: "Use this for main titles",
  },
  {
    key: tiptapActions.heading2,
    icon: Heading2,
    label: "Heading 2",
    description: "Ideal for subsections",
  },
  {
    key: tiptapActions.heading3,
    icon: Heading3,
    label: "Heading 3",
    description: "Use for smaller subsections",
  },
  {
    key: tiptapActions.heading4,
    icon: Heading4,
    label: "Heading 4",
    description: "Suitable for detailed sections",
  },
  {
    key: tiptapActions.heading5,
    icon: Heading5,
    label: "Heading 5",
    description: "For minor details",
  },
  {
    key: tiptapActions.heading6,
    icon: Heading6,
    label: "Heading 6",
    description: "Use for the smallest details",
  },
]

const tiptapDividerItems = [
  {
    key: tiptapActions.divider,
    icon: Minus,
    label: "Divider",
    description: "Visually divide blocks",
  },
]

const tiptapTextStyleItems = [
  {
    key: tiptapActions.bold,
    icon: Bold,
    label: "Bold",
    description: "Make text bold",
  },
  {
    key: tiptapActions.italic,
    icon: Italic,
    label: "Italic",
    description: "Italicize text",
  },
  {
    key: tiptapActions.underline,
    icon: Underline,
    label: "Underline",
    description: "Underline text",
  },
  {
    key: tiptapActions.strikethrough,
    icon: Strikethrough,
    label: "Strikethrough",
    description: "Strike through text",
  },
  {
    key: tiptapActions.code,
    icon: Code,
    label: "Code",
    description: "Format text as code",
  },
]

const tiptapAllBlocks = [
  ...tiptapTextParaphItems,
  ...tiptapTextStyleItems,
  ...tiptapDividerItems,
]

export interface TipTapContextType {
  editor: Editor
}

export const TipTapContext = createContext<TipTapContextType>(
  {} as TipTapContextType
)

export const useTiptapEditor = () => {
  const ctx = useContext(TipTapContext)

  if (!ctx)
    throw new Error("useTiptapEditor must be used within a TiptapEditor")

  return ctx
}

export interface TiptapEditorProps extends PropsWithChildren {
  content: string
  floatingMenu?: React.ReactNode
  bubbleMenu?: React.ReactNode
}

export const TiptapEditor = ({
  content,
  floatingMenu,
  bubbleMenu,
  children,
}: TiptapEditorProps) => {
  const editor = useEditor({
    content,
    extensions,
  })

  const sharedValues = useMemo<TipTapContextType>(
    () => ({ editor: editor! }),
    [editor]
  )

  return (
    <TipTapContext.Provider value={sharedValues}>
      {children}

      {floatingMenu}
      {bubbleMenu}
    </TipTapContext.Provider>
  )
}

export interface TiptapTextParagraphProps
  extends ComponentProps<typeof DropdownMenu> {}

export const TiptapTextParagraph = (props: TiptapTextParagraphProps) => {
  const { editor } = useTiptapEditor()

  const handleClickOnItem = (key: TiptapAction) => {
    switch (key) {
      case tiptapActions.text:
        editor.chain().focus().setParagraph().run()
        break
      case tiptapActions.quote:
        editor.chain().focus().setBlockquote().run()
        break
      case tiptapActions.divider:
        editor.chain().focus().setHorizontalRule().run()
        break
      case tiptapActions.heading1:
        editor.chain().focus().setHeading({ level: 1 }).run()
        break
      case tiptapActions.heading2:
        editor.chain().focus().setHeading({ level: 2 }).run()
        break
      case tiptapActions.heading3:
        editor.chain().focus().setHeading({ level: 3 }).run()
        break
      case tiptapActions.heading4:
        editor.chain().focus().setHeading({ level: 4 }).run()
        break
      case tiptapActions.heading5:
        editor.chain().focus().setHeading({ level: 5 }).run()
        break
      case tiptapActions.heading6:
        editor.chain().focus().setHeading({ level: 6 }).run()
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="shadow-none"
          aria-label="Open edit menu"
        >
          Heading
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        {tiptapTextParaphItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={() => handleClickOnItem(item.key)}
          >
            <div
              className="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
              aria-hidden="true"
            >
              <item.icon size={16} strokeWidth={2} className="opacity-60" />
            </div>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">
                {item.description}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface TiptapToolbarProps extends ComponentProps<"div"> {}

export const TiptapToolbar = ({ className, ...props }: TiptapToolbarProps) => {
  return <div {...props} className={cn("flex flex-row gap-2", className)} />
}

export interface TiptapContentProps
  extends Omit<ComponentProps<typeof EditorContent>, "editor"> {}

export const TiptapContent = ({ className, ...props }: TiptapContentProps) => {
  const { editor } = useContext(TipTapContext)

  return (
    <EditorContent
      {...props}
      className={cn("w-full [&>*]:outline-none", className)}
      editor={editor}
    />
  )
}
export interface TipTapFloatingMenuProps
  extends Omit<ComponentProps<typeof FloatingMenu>, "editor"> {}

export const TipTapFloatingMenu = (props: TipTapFloatingMenuProps) => {
  const { editor } = useContext(TipTapContext)

  return (
    <FloatingMenu {...props} editor={editor}>
      <ScrollArea className="pb-2 max-h-[400px] overflow-auto bg-background border border-border rounded-md">
        {tiptapAllBlocks.map((item, index) => (
          <div
            className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
            key={`${item.key}-${index}`}
          >
            <div
              className="flex size-8 items-center justify-center rounded-lg border border-border bg-background"
              aria-hidden="true"
            >
              <item.icon size={16} strokeWidth={2} className="opacity-60" />
            </div>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </FloatingMenu>
  )
}

export interface TipTapBubbleMenuProps
  extends Omit<ComponentProps<typeof BubbleMenu>, "editor"> {}

export const TipTapBubbleMenu = (props: TipTapBubbleMenuProps) => {
  const { editor } = useContext(TipTapContext)

  return (
    <BubbleMenu {...props} editor={editor}>
      This is the bubble menu
    </BubbleMenu>
  )
}
