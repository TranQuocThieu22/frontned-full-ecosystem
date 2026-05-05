import { StudentEvent } from "@/interfaces/StudentEvent";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";
interface Props {
  table: MRT_TableInstance<StudentEvent>;
  loading: boolean;
}

export default function StudentExportButton({ table, loading }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        fieldName: 'studentCode',
        header: 'Mã sinh viên',
        formatFunction: (value: any, row: StudentEvent) => row?.studentCode,
      },
      {
        fieldName: 'studentName',
        header: 'Họ và tên',
        formatFunction: (value: any, row: StudentEvent) => row?.studentName,
      },
      {
        fieldName: 'className',
        header: 'Mã lớp',
        formatFunction: (value: any, row: StudentEvent) => row?.className,
      },
      {
        fieldName: 'facultyName',
        header: 'Mã khoa',
        formatFunction: (value: any, row: StudentEvent) => row?.facultyName,
      },
      {
        fieldName: 'point',
        header: 'Điểm',
        formatFunction: (value: any, row: StudentEvent) => row?.point,
      },
    ],
  };

  return (
    <AQButtonExportData
      loading={loading}
      objectName="dsDiemRenLuyenQuyDoiSinhVien"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
