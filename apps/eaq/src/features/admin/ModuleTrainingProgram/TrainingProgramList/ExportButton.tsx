import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  data: ITrainingProgram[];
  isLoading: boolean;
}

export default function ExportButton({ data, isLoading }: Props) {

  const exportConfig = {
    fields: [
      { header: "Mã CTĐT", fieldName: "code" },
      { header: "Tên CTĐT", fieldName: "name", size: 300 },
      {
        header: "Đơn vị quản lý",
        fieldName: "unitName", size: 300
      },
      { header: "Trình độ đào tạo", fieldName: "trainingLevel" },
      { header: "Loại đào tạo", fieldName: "educationMode" },
      {
        header: "Thời gian đào tạo chuẩn",
        fieldName: "duration",
      },
      { header: "Năm bắt đầu tuyển sinh", fieldName: "admissionStartYear" },
      { header: "Năm tốt nghiệp khóa đầu", fieldName: "firstGraduationYear" },
      { header: "Ghi chú", fieldName: "note" },
    ],
  };

  const dataMap = data.map((item: ITrainingProgram) => {
    return {
      ...item,
      code: item?.code,
      name: item?.name,
      unitName: item?.department?.name,
      trainingLevel: item?.trainingLevel,
      duration: item?.duration,
      admissionStartYear: item?.admissionStartYear,
      firstGraduationYear: item?.firstGraduationYear,
      note: item?.note
    };
  });

  return (
    <AQButtonExportData
      loading={isLoading}
      objectName="DSChuongTrinhDaoTao"
      data={dataMap}
      exportConfig={exportConfig}
    />
  );
}
