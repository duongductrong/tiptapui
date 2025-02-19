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
      content={`<h2>Hi there,</h2><p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre><code class="language-css">body {
  display: none;
}</code></pre><p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p><blockquote><p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p></blockquote>`}
    >
      <TiptapToolbar className="justify-center">
        <TiptapButton action="undo">
          <TiptapLabel label=":icon" />
        </TiptapButton>
        <TiptapButton action="redo">
          <TiptapLabel label=":icon" />
        </TiptapButton>
        |
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
