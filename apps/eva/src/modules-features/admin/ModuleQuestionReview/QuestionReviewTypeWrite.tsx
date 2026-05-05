import { MyFieldset, MyTextEditor } from "aq-fe-framework/components"

export default function QuestionReviewTypeWrite() {
  return (
    <MyFieldset title="Đáp án">
      <MyTextEditor
        label="Đáp án"
        contentHeight="lg"
        value="Select"
      />
      <MyTextEditor
        label="Phân tích đáp án"
        contentHeight="lg"
        value="Đây là từ khóa chọn"
      />
    </MyFieldset>

  )
}