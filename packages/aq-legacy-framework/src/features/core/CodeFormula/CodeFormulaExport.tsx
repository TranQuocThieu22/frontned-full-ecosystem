import { CustomButtonExportData } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { CodeFormula } from "@aq-fe/aq-legacy-framework/shared/interfaces/CodeFormula";
import { IExportConfig } from "@aq-fe/aq-legacy-framework/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
  table: MRT_TableInstance<CodeFormula>;
  loading?: boolean;
  businessTypeEnum?: Record<number, string>;
  objectTypeEnum?: Record<number, string>;
  repeatCycleEnum?: Record<number, string>;
}

export default function CodeFormulaExport({
  loading,
  table,
  businessTypeEnum,
  objectTypeEnum,
  repeatCycleEnum
}: Props) {
  const { data } = useExportData(table);

  const exportConfig: IExportConfig<CodeFormula> = {
    fields: [
      {
        fieldName: "code",
        header: "Mã bộ đếm",
      },
      {
        fieldName: "name",
        header: "Tên bộ đếm",
      },
      {
        fieldName: "operationType",
        header: "Loại nghiệp vụ",
        formatFunction: (_: any, row: CodeFormula) =>
          businessTypeEnum?.[row.operationType || 0] || row.operationType || '',
      },
      {
        fieldName: "objectType",
        header: "Loại đối tượng",
        formatFunction: (_: any, row: CodeFormula) =>
          objectTypeEnum?.[row.objectType || 0] || row.objectType || '',
      },
      {
        fieldName: "repeatCycle",
        header: "Chu kỳ lặp",
        formatFunction: (_: any, row: CodeFormula) =>
          repeatCycleEnum?.[row.frequency || 0] || row.frequency || '',
      },
    ],
  };

  return (
    <CustomButtonExportData
      loading={loading}
      objectName="Danh mục bộ đếm"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
