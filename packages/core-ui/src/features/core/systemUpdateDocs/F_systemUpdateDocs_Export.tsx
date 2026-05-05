import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

export default function F_systemUpdateDocs_Export({
  table,
}: {
  table: MRT_TableInstance<Document>;
}) {
  const { data } = useExportData<Document>(table);

  const exportConfig = {
    fields: [
      {
        fieldName: "meetingDate",
        header: "Ngày họp",
        formatFunction: (value: any) => (value ? dateUtils.toDDMMYYYY(new Date(value)) : ""),
      },
      { fieldName: "departmentName", header: "Đơn vị yêu cầu" },
      { fieldName: "description", header: "Nội dung cải tiến" },
      { fieldName: "conclusion", header: "Kết luận" },
      {
        fieldName: "startDate",
        header: "Ngày bắt đầu",
        formatFunction: (value: any) => (value ? dateUtils.toDDMMYYYY(new Date(value)) : ""),
      },
      {
        fieldName: "endDate",
        header: "Ngày kết thúc",
        formatFunction: (value: any) => (value ? dateUtils.toDDMMYYYY(new Date(value)) : ""),
      },
      { fieldName: "note", header: "Ghi chú" },
    ],
  };

  return (
    <CustomButtonExportData
      objectName="Thông tin xây dựng, cải tiến, bảo trì hệ thống"
      data={data || []}
      exportConfig={exportConfig}
    />
  );
}
