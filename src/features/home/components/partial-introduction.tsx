export interface PartialIntroductionProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PartialIntroduction = (props: PartialIntroductionProps) => {
  return (
    <div className="flex flex-col py-8 items-center">
      <h2 className="text-4xl font-extrabold mb-2">
        Extend your capabilities with
      </h2>
      <h2 className="text-4xl font-extrabold">Tiptap Extensions.</h2>
      <p className="text-lg text-muted-foreground mt-4">
        Unlock a wide range of features and customizations for your rich-text
        editor.
      </p>
    </div>
  )
}

export default PartialIntroduction
