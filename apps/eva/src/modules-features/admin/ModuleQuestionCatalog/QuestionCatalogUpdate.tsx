import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MySelect, MyTextEditor, MyTextInput } from "aq-fe-framework/components";
import { IQuestionCatalogInfoViewModel, IQuestionCatalogMCQMultipleViewModel, IQuestionCatalogMCQSingleViewModel } from "./interfaces/QuestionCatalogViewModel";
import { QuestionCatalogEssayRubricInfoViewModel, QuestionCatalogEssaySuggestViewModel } from "./QuestionCatalogEssay/interfaces/QuestionCatalogEssayViewModel";
import QuestionCatalogEssay from "./QuestionCatalogEssay/QuestionCatalogEssay";
import QuestionCatalogMCQMultiple from "./QuestionCatalogMCQMultiple";
import QuestionCatalogMCQSingle from "./QuestionCatalogMCQSingle";
import QuestionCatalogTypeFillIn from "./QuestionCatalogTypeFillIn";
import QuestionCatalogTypeWrite from "./QuestionCatalogTypeWrite";

export default function QuestionCatalogUpdate({ data }: { data: IQuestionCatalogInfoViewModel }) {

  const form = useForm<IQuestionCatalogInfoViewModel>({
    initialValues: {
      ...data
    },
    validate: {
      maCauHoi: (value) => (value ? null : "Mã câu hỏi không được để trống"),
      loaiCauHoi: (value) => (value ? null : "Loại câu hỏi không được để trống"),
      doKho: (value) => (value ? null : "Độ khó không được để trống"),
      mucDoNhanThuc: (value) => (value ? null : "Mức độ nhận thức không được để trống"),
      clo: (value) => (value ? null : "CLO môn học không được để trống"),
      noiDungCauHoi: (value) => (value ? null : "Nội dung câu hỏi không được để trống"),
    }
  })
  // Hàm render component dựa trên loại câu hỏi
  const renderComponentByLoaiCauHoi = () => {
    switch (form.values.loaiCauHoi) {
      case 'Trắc nghiệm (1 đáp án)':
        return <QuestionCatalogMCQSingle data={mockDataMCQSingle} />;
      case 'Trắc nghiệm (Nhiều đáp án)':
        return <QuestionCatalogMCQMultiple data={mockDataMCQMultiple} />;
      case 'Tự luận':
        {
          // return <QuestionCatalogEssay suggest={mockDataEssaySuggest} />; // gợi ý chấm
          return <QuestionCatalogEssay rubric={mockDataEssayRubric} />; // rubric
        }
      case 'Điền khuyết':
        return <QuestionCatalogTypeFillIn />;
      case 'Ghép nối':
        return <div>Component cho Ghép nối</div>;
      case 'Viết':
        return <QuestionCatalogTypeWrite />;

      default:
        return null;
    }
  };
  return (
    <CustomButtonCreateUpdate
      isUpdate
      form={form}
      modalProps={{
        size: "90%"
      }}
      onSubmit={() => { console.log(form.values) }}
    >
      {/* Header Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <MyTextInput label="Mã câu hỏi"  {...form.getInputProps("maCauHoi")} disabled />
        <MySelect
          allowDeselect={false}
          label="Loại câu hỏi"
          data={[
            'Trắc nghiệm (1 đáp án)',
            'Trắc nghiệm (Nhiều đáp án)',
            'Tự luận',
            'Điền khuyết',
            'Ghép nối',
            'Viết',
          ]}
          {...form.getInputProps("loaiCauHoi")}
        />
        <MySelect
          label="Độ khó"
          data={['Dễ', 'Trung bình', 'Khó', 'Rất khó']}
          value={'Dễ'}
          {...form.getInputProps("doKho")}
        />
        <MySelect
          label="Nhận thức"
          data={[
            { value: 'Ghi nhớ', label: 'C1 - Ghi nhớ' },
            { value: 'Hiểu', label: 'C2 - Hiểu' },
            { value: 'Vận dụng', label: 'C3 - Vận dụng' },
            { value: 'Phân tích', label: 'C4 - Phân tích' },
            { value: 'Đánh giá', label: 'C5 - Đánh giá' },
            { value: 'Sáng tạo', label: 'C6 - Sáng tạo' }
          ]}
          {...form.getInputProps("mucDoNhanThuc")}
        />
        <MySelect
          label="CLO môn học"
          data={[
            { value: 'CLO1', label: 'CLO1 - Sinh viên có khả năng hiểu và giải thích' },
            { value: 'CLO2', label: 'CLO2 - Sinh viên có khả năng thiết kế mô hình dữ liệu quan hệ' },
            { value: 'CLO3', label: 'CLO3 - Sinh viên có khả năng viết các truy vấn SQL' },
            { value: 'CLO4', label: 'CLO4 - Sinh viên có khả năng phân tích và đánh giá hiệu suất của CSDL' }
          ]}
          {...form.getInputProps("clo")}
        />
      </div>

      <MyTextEditor
        label="Nội dung câu hỏi"
        contentHeight="lg"
        {...form.getInputProps("noiDungCauHoi")}
      />
      {/* Component hiển thị dựa trên loại câu hỏi */}
      {renderComponentByLoaiCauHoi()}
    </CustomButtonCreateUpdate >

  )
}


const mockDataMCQSingle: IQuestionCatalogMCQSingleViewModel[] = [
  {
    text: "Delete",
    isCorrect: false,
    weight: "0%",
    analysis: "Đây là từ khóa xóa"
  },
  {
    text: "Order by",
    isCorrect: false,
    weight: "0%",
    analysis: "Đây là từ khóa sắp xếp"
  },
  {
    text: "Group by",
    isCorrect: false,
    weight: "0%",
    analysis: "Đây là từ khóa nhóm"
  },
  {
    text: "Select",
    isCorrect: true,
    weight: "100%",
    analysis: "Đây là từ khóa truy vấn"
  }
]

const mockDataMCQMultiple: IQuestionCatalogMCQMultipleViewModel[] = [
  {
    text: "Delete",
    isCorrect: false,
    weight: "0%",
    analysis: "Đây là từ khóa xóa"
  },
  {
    text: "Order by",
    isCorrect: false,
    weight: "0%",
    analysis: "Đây là từ khóa sắp xếp"
  },
  {
    text: "Group by",
    isCorrect: true,
    weight: "50%",
    analysis: "Đây là từ khóa nhóm"
  },
  {
    text: "Select",
    isCorrect: true,
    weight: "50%",
    analysis: "Đây là từ khóa truy vấn"
  }
]

const mockDataEssayRubric: QuestionCatalogEssayRubricInfoViewModel = {
  id: 1,
  code: "TL.CSDL",
  name: "Chấm tự luận cơ sở dữ liệu",
  codeCourse: "CSDLCB",
  nameCourse: "Cơ sở dữ liệu cơ bản",
  note: "",
  codeScale: "1"
}

const mockDataEssaySuggest: QuestionCatalogEssaySuggestViewModel[] = [
  {
    id: 1,
    name: "Trình bày rõ ràng, mạch lạc",
    weight: 0,
  },
  {
    id: 2,
    name: "Hiểu cơ bản về SQL",
    weight: 0,
  },
  {
    id: 3,
    name: "Biết cách viết code truy vấn",
    weight: 50,
  },
  {
    id: 4,
    name: "Biết dùng câu lệnh truy vấn",
    weight: 50,
  },
]