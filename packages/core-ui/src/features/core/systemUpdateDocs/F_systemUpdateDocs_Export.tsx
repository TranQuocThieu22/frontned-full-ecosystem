import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { MRT_TableInstance } from "mantine-react-table";

export default function F_systemUpdateDocs_Export({
  table,
}: {
  table: MRT_TableInstance<Document>;
}) {
  const { data } = useExportData<Document>(table);

  const exportConfig = {
    fields: [
      { fieldName: "departmentName", header: "Đơn vị yêu cầu" },
      { fieldName: "description", header: "Nội dung cải tiến" },
      { fieldName: "startDate", header: "Ngày bắt đầu", type: "date" },
      { fieldName: "endDate", header: "Ngày kết thúc", type: "date" },
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
