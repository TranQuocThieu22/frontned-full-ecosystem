import { Group, Radio } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyFieldset, MyFlexColumn, MyFlexRow, MySelect, MyTextArea, MyTextEditor, MyTextInput } from "aq-fe-framework/components";
import { useState } from "react";
import QuestionReviewTypeFillIn from "./QuestionReviewTypeFillIn";
import QuestionReviewTypeWrite from "./QuestionReviewTypeWrite";

import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import EssayQuestion from "./EssayQuestion";
import MCQMultipleQuestion from "./MCQMultipleQuestion";
import MCQSingleQuestion from "./MCQSingleQuestion";
import { IQuestionReviewInfoViewModel } from "./interfaces/QuestionReviewViewModel";

const questionTypeValueMapping: Record<string, string> = {
  "Trắc nghiệm (1 đáp án)": "1",
  "Trắc nghiệm (Nhiều đáp án)": "2",
  "Tự luận": "3",
  "Điền khuyết": "4",
  "Ghép nối": "5",
  "Viết": "6",
};
export default function QuestionReviewModal({ data }: { data: IQuestionReviewInfoViewModel }) {
  const [loaiCauHoi, setLoaiCauHoi] = useState<string | undefined>(questionTypeValueMapping[data.loaiCauHoi ?? ""] ?? undefined);
  const disc = useDisclosure()

  // Hàm render component dựa trên loại câu hỏi
  const renderComponentByLoaiCauHoi = () => {
    switch (loaiCauHoi) {
      case '1': // Trắc nghiệm (1 đáp án)
        return <MCQSingleQuestion />;
      case '2': // Trắc nghiệm (nhiều đáp án)
        return <MCQMultipleQuestion />;
      case '3': // Tự luận
        return <EssayQuestion />;
      case '4': // Điền khuyết
        return <QuestionReviewTypeFillIn />;
      case '5': // Ghép nối
        return <div>Component cho Ghép nối</div>;
      case '6': // Viết
        return <QuestionReviewTypeWrite />;

    }
  };
  return (
    <MyButtonModal
      disclosure={disc}
      label="Duyệt"
      title="Chi tiết câu hỏi"
      onSubmit={(value) => { console.log(value) }}
      variant="transparent"
      modalSize={"xxl"} // Increased size to fit content
    >
      {/* Header Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <MyTextInput label="Mã câu hỏi" value={"CH0001"} readOnly disabled />
        <MySelect
          allowDeselect={false}
          label="Loại câu hỏi"
          data={[
            { value: '1', label: 'Trắc nghiệm (1 đáp án)' },
            { value: '2', label: 'Trắc nghiệm (nhiều đáp án)' },
            { value: '3', label: 'Tự luận' },
            { value: '4', label: 'Điền khuyết' },
            { value: '5', label: 'Ghép nối' },
            { value: '6', label: 'Viết' },
          ]}
          value={loaiCauHoi}
          onChange={(value) => setLoaiCauHoi(value ?? undefined)}
        />
        <MySelect
          label="Độ khó"
          data={['Dễ', 'Trung bình', 'Khó']}
          value={'Dễ'}

        />
        <MySelect
          label="Nhận thức"
          data={[
            { value: 'C1', label: 'C1 - Ghi nhớ' },
            { value: 'C2', label: 'C2 - Hiểu' },
            { value: 'C3', label: 'C3 - Vận dụng' },
            { value: 'C4', label: 'C4 - Phân tích' },
            { value: 'C5', label: 'C5 - Đánh giá' },
            { value: 'C6', label: 'C6 - Sáng tạo' }
          ]}
          value={'C1'}
        />
        <MySelect
          label="CLO môn học"
          data={[
            { value: 'CLO1', label: 'CLO1 - Sinh viên có khả năng hiểu và giải thích' },
            { value: 'CLO2', label: 'CLO2 - Sinh viên có khả năng thiết kế mô hình dữ liệu quan hệ' },
            { value: 'CLO3', label: 'CLO3 - Sinh viên có khả năng viết các truy vấn SQL' },
            { value: 'CLO4', label: 'CLO4 - Sinh viên có khả năng phân tích và đánh giá hiệu suất của CSDL' }
          ]}
          value={'CLO1'}
          placeholder="Chọn CLO"
        />
      </div>

      <MyTextEditor
        label="Nội dung câu hỏi"
        contentHeight="lg"
        value="SQL là viết tắt của thuật ngữ nào?"
      />

      {/* Component hiển thị dựa trên loại câu hỏi */}
      {renderComponentByLoaiCauHoi()}


      <MyFieldset title="Duyệt câu hỏi">
        <MyFlexColumn>
          <Radio.Group
            label="Trạng thái"
          >
            <Group mt="xs">
              <Radio value="Chưa duyệt" label="Chưa duyệt" />
              <Radio value="Duyệt" label="Duyệt" />
              <Radio value="Không Duyệt" label="Không Duyệt" />
            </Group>
          </Radio.Group>
          <MyTextArea
            label="Nội dung"
            placeholder="Nhập nội dung duyệt"
            minRows={3}
          />
          <MyFlexRow justify={"space-between"} >
            <CustomCheckbox label="Gửi mail thông báo"></CustomCheckbox>
            <MyButton crudType="default">Lưu</MyButton>
          </MyFlexRow>
        </MyFlexColumn>
      </MyFieldset>
    </MyButtonModal >

  )
}
