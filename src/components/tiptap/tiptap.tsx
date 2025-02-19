/* eslint-disable @typescript-eslint/no-explicit-any */

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
  cloneElement,
  ComponentProps,
  createContext,
  Fragment,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
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
  ChevronDown,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Minus,
  Redo,
  Strikethrough,
  TextQuote,
  Type,
  Underline,
  Undo,
} from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"

const extensions = [StarterKit]

const tiptapActions = {
  undo: "undo",
  redo: "redo",
  bold: "bold",
  italic: "italic",
  underline: "underline",
  strike: "strike",
  code: "code",
  divider: "divider",
  heading1: "heading1",
  heading2: "heading2",
  heading3: "heading3",
  heading4: "heading4",
  heading5: "heading5",
  heading6: "heading6",
  text: "paragraph",
  blockquote: "blockquote",
  bulletList: "bulletList",
  orderedList: "orderedList",
  codeBlock: "codeBlock",
} as const

type TiptapAction = (typeof tiptapActions)[keyof typeof tiptapActions]

type TiptapBlock = {
  key: TiptapAction
  icon: React.ElementType
  label: string
  description: string
}

const tiptapBlocksMap = new Map<TiptapAction, TiptapBlock>([
  [
    tiptapActions.undo,
    {
      key: tiptapActions.undo,
      icon: Undo,
      label: "Undo",
      description: "Undo the last action",
    },
  ],
  [
    tiptapActions.redo,
    {
      key: tiptapActions.redo,
      icon: Redo,
      label: "Redo",
      description: "Redo the last action",
    },
  ],
  [
    tiptapActions.text,
    {
      key: tiptapActions.text,
      icon: Type,
      label: "Text",
      description: "Start writing with plain text",
    },
  ],
  [
    tiptapActions.heading1,
    {
      key: tiptapActions.heading1,
      icon: Heading1,
      label: "Heading 1",
      description: "Use this for main titles",
    },
  ],
  [
    tiptapActions.heading2,
    {
      key: tiptapActions.heading2,
      icon: Heading2,
      label: "Heading 2",
      description: "Ideal for subsections",
    },
  ],
  [
    tiptapActions.heading3,
    {
      key: tiptapActions.heading3,
      icon: Heading3,
      label: "Heading 3",
      description: "Use for smaller subsections",
    },
  ],
  [
    tiptapActions.heading4,
    {
      key: tiptapActions.heading4,
      icon: Heading4,
      label: "Heading 4",
      description: "Suitable for detailed sections",
    },
  ],
  [
    tiptapActions.heading5,
    {
      key: tiptapActions.heading5,
      icon: Heading5,
      label: "Heading 5",
      description: "For minor details",
    },
  ],
  [
    tiptapActions.heading6,
    {
      key: tiptapActions.heading6,
      icon: Heading6,
      label: "Heading 6",
      description: "Use for the smallest details",
    },
  ],
  [
    tiptapActions.blockquote,
    {
      key: tiptapActions.blockquote,
      icon: TextQuote,
      label: "Quote",
      description: "Capture a quote",
    },
  ],
  [
    tiptapActions.bold,
    {
      key: tiptapActions.bold,
      icon: Bold,
      label: "Bold",
      description: "Make text bold",
    },
  ],
  [
    tiptapActions.italic,
    {
      key: tiptapActions.italic,
      icon: Italic,
      label: "Italic",
      description: "Italicize text",
    },
  ],
  [
    tiptapActions.underline,
    {
      key: tiptapActions.underline,
      icon: Underline,
      label: "Underline",
      description: "Underline text",
    },
  ],
  [
    tiptapActions.strike,
    {
      key: tiptapActions.strike,
      icon: Strikethrough,
      label: "Strikethrough",
      description: "Strike through text",
    },
  ],
  [
    tiptapActions.code,
    {
      key: tiptapActions.code,
      icon: Code,
      label: "Code",
      description: "Format text as code",
    },
  ],
  [
    tiptapActions.codeBlock,
    {
      key: tiptapActions.codeBlock,
      icon: Code2,
      label: "Code Block",
      description: "Format text as code block",
    },
  ],
  [
    tiptapActions.divider,
    {
      key: tiptapActions.divider,
      icon: Minus,
      label: "Divider",
      description: "Visually divide blocks",
    },
  ],
  [
    tiptapActions.bulletList,
    {
      key: tiptapActions.bulletList,
      icon: List,
      label: "Bullet List",
      description: "Create a bullet list",
    },
  ],
  [
    tiptapActions.orderedList,
    {
      key: tiptapActions.orderedList,
      icon: ListOrdered,
      label: "Ordered List",
      description: "Create an ordered list",
    },
  ],
])

const tiptapAllBlocks = Array.from(tiptapBlocksMap.values())

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
    [editor?.state]
  )

  return (
    <TipTapContext.Provider value={sharedValues}>
      {children}

      {floatingMenu}
      {bubbleMenu}
    </TipTapContext.Provider>
  )
}

export interface TiptapLabelProps extends ComponentProps<"div"> {
  action?: TiptapAction
  label: ":icon :label" | ":label" | ":label :icon" | ":icon"
}

export const TiptapLabel = ({
  className,
  action,
  label: labelPattern = ":label",
  ...props
}: TiptapLabelProps) => {
  const keyLabels = useTiptapEditorCurrentKeyAction()

  const tiptapBlocks = useMemo(
    () => keyLabels.map((key) => tiptapBlocksMap.get(key)!),
    [keyLabels]
  )

  const getLabelNode = (block: TiptapBlock) => {
    if (labelPattern === ":icon :label") {
      return (
        <Fragment key={block.key}>
          {block?.icon ? <block.icon /> : null} {block?.label}
        </Fragment>
      )
    }

    if (labelPattern === ":icon") {
      return (
        <Fragment key={block.key}>
          {block?.icon ? <block.icon /> : null}
        </Fragment>
      )
    }

    if (labelPattern === ":label :icon") {
      return (
        <Fragment key={block.key}>
          {block?.label} {block?.icon ? <block.icon /> : null}
        </Fragment>
      )
    }

    return block?.label
  }

  const label = useMemo(() => {
    if (action) {
      const block = tiptapBlocksMap.get(action)

      if (!block) return null

      return getLabelNode(block)
    }

    return tiptapBlocks.map(getLabelNode)
  }, [action, tiptapBlocks])

  return (
    <span
      {...props}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {label}
    </span>
  )
}

export interface TiptapButtonProps extends ComponentProps<typeof Button> {
  action: TiptapAction
}

export const TiptapButton = ({
  action,
  children,
  className,
  ...props
}: TiptapButtonProps) => {
  const { editor } = useTiptapEditor()

  const isActive = useTiptapEditorIsActive(action)

  const handleOnClick = () => {
    onTiptapEventChangeBlock(editor, action)
  }

  const block = useMemo(() => tiptapBlocksMap.get(action), [action])

  if (!editor) return null

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="icon"
      {...props}
      className={cn("size-8 min-w-8", className)}
      onClick={handleOnClick}
      aria-label={block?.label}
      // disabled={!editor?.can().chain().focus().undo().run()}
    >
      {cloneElement(children as ReactElement, { action } as any)}
    </Button>
  )
}

export interface TiptapBlocksProps extends ComponentProps<typeof DropdownMenu> {
  label: TiptapLabelProps["label"]
}

export const TiptapBlocks = (props: TiptapBlocksProps) => {
  const { editor } = useTiptapEditor()

  const handleChangeBlock = (key: TiptapAction) => {
    onTiptapEventChangeBlock(editor, key)
  }

  if (!editor) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="shadow-none"
          aria-label="Open blocks menu"
        >
          <TiptapLabel label={props.label} />

          <ChevronDown className="size-3 text-muted-foreground ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <ScrollArea className="max-h-[300px] overflow-auto">
          {tiptapAllBlocks.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={() => handleChangeBlock(item.key)}
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
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface TiptapToolbarProps extends ComponentProps<"div"> {}

export const TiptapToolbar = ({ className, ...props }: TiptapToolbarProps) => {
  return (
    <div
      {...props}
      className={cn("flex flex-row items-center gap-2", className)}
    />
  )
}

export interface TiptapContentProps
  extends Omit<ComponentProps<typeof EditorContent>, "editor"> {}

export const TiptapContent = ({ className, ...props }: TiptapContentProps) => {
  const { editor } = useContext(TipTapContext)

  if (!editor) return null

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
      {/* <ScrollArea className="pb-2 max-h-[400px] overflow-auto bg-background border border-border rounded-md">
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
      </ScrollArea> */}
    </FloatingMenu>
  )
}

export interface TipTapBubbleMenuProps
  extends Omit<ComponentProps<typeof BubbleMenu>, "editor"> {}

export const TipTapBubbleMenu = (props: TipTapBubbleMenuProps) => {
  const { editor } = useContext(TipTapContext)

  if (!editor) return null

  return (
    <BubbleMenu {...props} editor={editor}>
      This is the bubble menu
    </BubbleMenu>
  )
}

export function useTiptapEditorCurrentKeyAction() {
  const { editor } = useTiptapEditor()
  const [key, setKey] = useState<TiptapAction[]>([tiptapActions.text])

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        setKey(getCurrentTiptapAction(editor))
      })
    }
  }, [editor])

  return key
}

export function useTiptapEditorIsActive(key: TiptapAction) {
  const [isActive, setIsActive] = useState(false)
  const { editor } = useTiptapEditor()

  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        setIsActive(editor.isActive(key))
      })
    }
  }, [editor, key])

  return isActive
}

export function onTiptapEventChangeBlock(editor: Editor, key: TiptapAction) {
  switch (key) {
    case tiptapActions.undo:
      editor.chain().focus().undo().run()
      break
    case tiptapActions.redo:
      editor.chain().focus().redo().run()
      break
    case tiptapActions.text:
      editor.chain().focus().setParagraph().run()
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
    case tiptapActions.codeBlock:
      editor.chain().focus().toggleCodeBlock().run()
      break
    case tiptapActions.divider:
      editor.chain().focus().setHorizontalRule().run()
      break
    case tiptapActions.bold:
      editor.chain().focus().toggleBold().run()
      break
    case tiptapActions.italic:
      editor.chain().focus().toggleItalic().run()
      break
    case tiptapActions.strike:
      editor.chain().focus().toggleStrike().run()
      break
    case tiptapActions.code:
      editor.chain().focus().toggleCode().run()
      break
    case tiptapActions.blockquote:
      editor.chain().focus().setBlockquote().run()
      break
    case tiptapActions.divider:
      editor.chain().focus().setHorizontalRule().run()
      break
    case tiptapActions.bulletList:
      editor.chain().focus().toggleBulletList().run()
      break
    case tiptapActions.orderedList:
      editor.chain().focus().toggleOrderedList().run()
      break
  }
}

export function getCurrentTiptapAction(editor: Editor): TiptapAction[] {
  const keys: Set<TiptapAction> = new Set([tiptapActions.text])

  keys.clear()

  if (editor.isActive("heading")) {
    const headingLevel = editor.getAttributes("heading").level
    const headingMap = `heading${headingLevel}`
    keys.add((tiptapActions as any)[headingMap])
  }

  tiptapAllBlocks.forEach((block) => {
    if (editor.isActive(block.key)) {
      keys.add(block.key)
    }
  })

  return Array.from(keys)
}
