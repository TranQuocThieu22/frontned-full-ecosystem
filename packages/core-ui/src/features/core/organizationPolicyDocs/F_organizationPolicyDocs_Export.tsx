import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";
import { I as IDocument } from "./F_organizationPolicyDocs_Read";

interface Props {
  table: MRT_TableInstance<IDocument>;
}

export default function F_organizationPolicyDocs_Export({ table }: Props) {
  const { data } = useExportData(table);

  const exportConfig: IExportConfig<IDocument> = {
    fields: [
      {
        header: "Số quy định",
        fieldName: "decisionCode",
      },
      {
        header: "Ngày ban hành",
        fieldName: "promulgateDate",
        formatFunction: (_: any, row: IDocument) =>
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
      objectName="Văn bản - Quy định tổ chức"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
