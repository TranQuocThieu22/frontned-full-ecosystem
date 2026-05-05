import { StudentActivityPlan } from "@/interfaces/shared-interfaces/StudentActivityPlan";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
  data: StudentActivityPlan[];
}

export default function SemesterStudentListExport({ data: studentActivityPlanData }: Props) {
  const exportConfig = {
    fields: [
      {
        fieldName: "code",
        header: "Mã sinh viên",
      },
      {
        fieldName: "fullName",
        header: "Họ tên",
      },
      {
        fieldName: "gender",
        header: "Giới tính",
      },
      {
        fieldName: "dateOfBirth",
        header: "Ngày sinh",
      },
      {
        fieldName: "isEnabled",
        header: "Trạng thái",
      },
      {
        fieldName: "className",
        header: "Tên lớp",
      },
      {
        fieldName: "subLecturerCode",
        header: "Mã cố vấn học tập",
      },
      {
        fieldName: "lecturerCode",
        header: "Mã giáo viên chủ nhiệm",
      },
      {
        fieldName: "majorCode",
        header: "Mã khối",
      },
      {
        fieldName: "majorsCode",
        header: "Mã ngành",
      },
      {
        fieldName: "majorsCode",
        header: "Mã ngành",
      },
      {
        fieldName: "majorsName",
        header: "Tên ngành",
      },
      {
        fieldName: "facultyCode",
        header: "Mã khoa",
      },
    ],
  };

  const data = studentActivityPlanData.map((item) => ({
    ...item,
    dateOfBirth: item.user?.dateOfBirth
      ? dateUtils.toDDMMYYYY(new Date(item.user?.dateOfBirth ?? ""))
      : "",
    isEnabled: item.isEnabled ? "Đang học" : "Đã nghỉ",
    code: item.user?.code,
    fullName: item.user?.fullName,
    gender: item.user?.gender,
    className: item.user?.className,
    majorsCode: item.user?.majorsCode,
    majorsName: item.user?.majorsName,
    facultyCode: item.user?.facultyCode,
  }));

  return (
    <AQButtonExportData
      objectName="Danh sách sinh viên học kỳ"
      data={data! || []}
      exportConfig={exportConfig}
    />
  );
}
