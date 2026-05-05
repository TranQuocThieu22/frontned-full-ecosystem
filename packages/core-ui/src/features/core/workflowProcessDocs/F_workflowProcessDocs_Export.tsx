import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
  table: MRT_TableInstance<Document>;
}

export default function F_workflowProcessDocs_Export({
  table,
}: Props) {
  const { data } = useExportData(table);

  const exportConfig: IExportConfig<Document> = {
    fields: [
      {
        header: "Số quy định",
        fieldName: "decisionCode",
      },
      {
        header: "Ngày ban hành",
        fieldName: "promulgateDate",
        formatFunction: (_: any, row: Document) =>
          dateUtils.toDDMMYYYY(new Date(row.promulgateDate!)),
      },
      {
        header: "Tên tài liệu",
        fieldName: "name",
      },
    ],
  };

  return (
    <CustomButtonExportData
      objectName="Văn bản - Quy trình xử lý"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
