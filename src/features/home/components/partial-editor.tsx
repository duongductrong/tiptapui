import {
  TipTapBubbleMenu,
  TiptapContent,
  TiptapEditor,
  TipTapFloatingMenu,
  TiptapTextParagraph,
  TiptapToolbar,
} from "@/components/ui/tiptap"

export interface PartialEditorProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PartialEditor = (props: PartialEditorProps) => {
  return (
    <TiptapEditor
      floatingMenu={
        <TipTapFloatingMenu>This is the floating menu</TipTapFloatingMenu>
      }
      bubbleMenu={<TipTapBubbleMenu>This is the bubble menu</TipTapBubbleMenu>}
      content="Hello World!"
    >
      <TiptapToolbar className="justify-center">
        <TiptapTextParagraph />
      </TiptapToolbar>
      <TiptapContent className="prose max-w-full" />
    </TiptapEditor>
  )
}

export default PartialEditor
