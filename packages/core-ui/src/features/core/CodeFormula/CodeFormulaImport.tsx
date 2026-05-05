import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { CodeFormula } from "@aq-fe/core-ui/shared/interfaces/CodeFormula";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

interface Props {
  isLoading: boolean;
  businessTypeEnum?: Record<number, string>;
  objectTypeEnum?: Record<number, string>;
  repeatCycleEnum?: Record<number, string>;
}

export default function CodeFormulaImport({
  isLoading,
  businessTypeEnum,
  objectTypeEnum,
  repeatCycleEnum,
}: Props) {
  const fields: FieldOption<CodeFormula>[] = [
    {
      fieldKey: "code",
      fieldName: "Mã bộ đếm",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên bộ đếm",
      isRequired: true,
    },
    {
      fieldKey: "operationType",
      fieldName: "Loại nghiệp vụ",
      isRequired: false,
      parseType: "number",
    },
    {
      fieldKey: "objectType",
      fieldName: "Loại đối tượng",
      isRequired: false,
      parseType: "number",
    },
    {
      fieldKey: "frequency",
      fieldName: "Chu kỳ lặp",
      isRequired: false,
      parseType: "number",
    },
    {
      fieldKey: "prefix",
      fieldName: "Tiền tố",
      isRequired: false,
    },
    {
      fieldKey: "suffix",
      fieldName: "Hậu tố",
      isRequired: false,
    },
    {
      fieldKey: "length",
      fieldName: "Chiều dài",
      isRequired: false,
      parseType: "number",
    },
    {
      fieldKey: "isNumberZeroUsed",
      fieldName: "Có dùng số 0",
      isRequired: false,
      parseType: "boolean",
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import bộ đếm"
      onPrepareWorkbook={async (workbook: Workbook) => {
        const referenceConfig: IExcelColumnConfig<{
          id: number;
          name: string;
        }>[] = [
          {
            fieldKey: "id",
            fieldName: "Giá trị",
            isRequired: true,
          },
          {
            fieldKey: "name",
            fieldName: "Tên",
            isRequired: true,
          },
        ];

        if (businessTypeEnum) {
          await excelUtils.addSheet<{ id: number; name: string }>({
            workbook: workbook,
            sheetName: "Danh sách loại nghiệp vụ",
            data: Object.entries(businessTypeEnum)
              .filter((entry): entry is [string, string] => !isNaN(Number(entry[0])))
              .map(([key, value]) => ({
                id: Number(key),
                name: value,
              })),
            config: referenceConfig,
          });
        }

        if (objectTypeEnum) {
          await excelUtils.addSheet<{ id: number; name: string }>({
            workbook: workbook,
            sheetName: "Danh sách loại đối tượng",
            data: Object.entries(objectTypeEnum)
              .filter((entry): entry is [string, string] => !isNaN(Number(entry[0])))
              .map(([key, value]) => ({
                id: Number(key),
                name: value,
              })),
            config: referenceConfig,
          });
        }

        if (repeatCycleEnum) {
          await excelUtils.addSheet<{ id: number; name: string }>({
            workbook: workbook,
            sheetName: "Danh sách chu kỳ lặp",
            data: Object.entries(repeatCycleEnum)
              .filter((entry): entry is [string, string] => !isNaN(Number(entry[0])))
              .map(([key, value]) => ({
                id: Number(key),
                name: value,
              })),
            config: referenceConfig,
          });
        }
      }}
      onSubmit={async (values: CodeFormula[]) => {
        const transformedData = values.map((item) => ({
          ...item,
          code: item.code?.toString(),
          name: item.name?.toString(),
          operationType: Number(item.operationType),
          objectType: Number(item.objectType),
          frequency: Number(item.frequency),
          prefix: item.prefix?.toString(),
          suffix: item.suffix?.toString(),
          length: Number(item.length) || 0,
          isNumberZeroUsed: item.isNumberZeroUsed ? true : false,
        }));

        return await codeFormulaService.createOrUpdateList(transformedData);
      }}
      buttonProps={{
        loading: isLoading,
      }}
    />
  );
}
