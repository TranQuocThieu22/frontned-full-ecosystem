import { MyFieldset, MyTextEditor } from "aq-fe-framework/components"

export default function QuestionCatalogTypeWrite() {
  return (
    <MyFieldset title="Đáp án">
      <MyTextEditor
        label="Đáp án"
        contentHeight="lg"
      />
      <MyTextEditor
        label="Phân tích đáp án"
        contentHeight="lg"
      />
    </MyFieldset>

  )
}