import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { MRT_TableInstance } from "mantine-react-table";

export default function F_userGuideDocs_Export({ table }: { table: MRT_TableInstance<Document> }) {
  const { data } = useExportData<Document>(table);

  const exportConfig = {
    fields: [
      { fieldName: "code", header: "Mã tài liệu" },
      { fieldName: "name", header: "Tên tài liệu" },
      { fieldName: "note", header: "Ghi chú" },
    ],
  };

  return (
    <CustomButtonExportData
      objectName="Tài liệu hướng dẫn sử dụng"
      data={data || []}
      exportConfig={exportConfig}
    />
  );
}
