import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MySelect, MyTextEditor, MyTextInput } from "aq-fe-framework/components";
import { IQuestionCatalogInfoViewModel } from "./interfaces/QuestionCatalogViewModel";
import QuestionCatalogEssay from "./QuestionCatalogEssay/QuestionCatalogEssay";
import QuestionCatalogMCQMultiple from "./QuestionCatalogMCQMultiple";
import QuestionCatalogMCQSingle from "./QuestionCatalogMCQSingle";
import QuestionCatalogTypeFillIn from "./QuestionCatalogTypeFillIn";
import QuestionCatalogTypeWrite from "./QuestionCatalogTypeWrite";


export default function QuestionCatalogCreate() {

  const form = useForm<IQuestionCatalogInfoViewModel>({
    initialValues: {
      maCauHoi: "",
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
      case '1': // Trắc nghiệm (1 đáp án)
        return <QuestionCatalogMCQSingle />;
      case '2': // Trắc nghiệm (nhiều đáp án)
        return <QuestionCatalogMCQMultiple />;
      case '3': // Tự luận
        return <QuestionCatalogEssay />;
      case '4': // Điền khuyết
        return <QuestionCatalogTypeFillIn />;
      case '5': // Ghép nối
        return <div>Component cho Ghép nối</div>;
      case '6': // Viết
        return <QuestionCatalogTypeWrite />;

      default:
        return null;
    }
  };
  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        title: "Tạo câu hỏi",
        size: "90%"
      }}
      onSubmit={() => { console.log(form.values) }}
    >
      {/* Header Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <MyTextInput label="Mã câu hỏi"  {...form.getInputProps("maCauHoi")} />
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
          {...form.getInputProps("loaiCauHoi")}
        />
        <MySelect
          label="Độ khó"
          data={['Dễ', 'Trung bình', 'Khó']}
          value={'Dễ'}
          {...form.getInputProps("doKho")}
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
