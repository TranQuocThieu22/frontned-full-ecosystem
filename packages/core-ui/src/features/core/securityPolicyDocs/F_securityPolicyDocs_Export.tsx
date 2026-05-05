import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { MRT_TableInstance } from "mantine-react-table";

export default function F_securityPolicyDocs_Export({
  table,
}: {
  table: MRT_TableInstance<Document>;
}) {
  const { data } = useExportData<Document>(table);

  const exportConfig = {
    fields: [
      { fieldName: "decisionCode", header: "Số quy định" },
      { fieldName: "promulgateDate", header: "Ngày ban hành", type: "date" },
      { fieldName: "name", header: "Tên tài liệu" },
    ],
  };

  return (
    <CustomButtonExportData
      objectName="Tài liệu chính sách an toàn"
      data={data || []}
      exportConfig={exportConfig}
    />
  );
}
