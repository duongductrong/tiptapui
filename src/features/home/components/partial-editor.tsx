import {
  TipTapBubbleMenu,
  TiptapContent,
  TiptapEditor,
  TipTapFloatingMenu,
  TiptapBlocks,
  TiptapToolbar,
  TiptapButton,
  TiptapLabel,
} from "@/components/tiptap/tiptap"

export interface PartialEditorProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PartialEditor = (props: PartialEditorProps) => {
  return (
    <TiptapEditor
      floatingMenu={<TipTapFloatingMenu> </TipTapFloatingMenu>}
      bubbleMenu={<TipTapBubbleMenu>This is the bubble menu</TipTapBubbleMenu>}
      content="Hello World!"
    >
      <TiptapToolbar className="justify-center">
        <TiptapBlocks label=":icon :label" /> |
        <TiptapButton action="bold">
          <TiptapLabel label=":icon" />
        </TiptapButton>
        <TiptapButton action="italic">
          <TiptapLabel label=":icon" />
        </TiptapButton>
        <TiptapButton action="underline">
          <TiptapLabel label=":icon" />
        </TiptapButton>
        <TiptapButton action="strike">
          <TiptapLabel label=":icon" />
        </TiptapButton>
      </TiptapToolbar>
      <TiptapContent className="prose max-w-full" />
    </TiptapEditor>
  )
}

export default PartialEditor
