"use client";

import { documentAttributeService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentAttributeService";
import { CustomButtonImport } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { DocumentAttribute } from "@aq-fe/aq-legacy-framework/shared/interfaces/DocumentAttribute";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/aq-legacy-framework/shared/utils/excelUtils";
import { Workbook } from "exceljs";

interface Props {
  documentType: number;
  isLoading?: boolean;
}

export function F_documentCategories_Import({ documentType, isLoading }: Props) {
  const fields: FieldOption<DocumentAttribute>[] = [
    {
      fieldKey: "code",
      fieldName: "Mã loại văn bản",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên loại văn bản",
      isRequired: true,
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu Import Loại văn bản"
      onPrepareWorkbook={async (workbook: Workbook) => {
        const config: IExcelColumnConfig<DocumentAttribute>[] = [
          {
            fieldKey: "code",
            fieldName: "Mã loại văn bản",
            isRequired: true,
          },
          {
            fieldKey: "name",
            fieldName: "Tên loại văn bản",
            isRequired: true,
          },
        ];

        await excelUtils.addSheet<DocumentAttribute>({
          workbook: workbook,
          sheetName: "Danh sách loại văn bản",
          data: [{ documentType: documentType }],
          config: config,
        });
      }}
      onSubmit={async (values: DocumentAttribute[]) => {
        const transformedData = values.map((item) => ({
          ...item,
          code: item.code?.toString(),
          name: item.name?.toString(),
          documentType: documentType,
        }));

        return await documentAttributeService.createOrUpdateList(transformedData);
      }}
      buttonProps={{
        loading: isLoading,
      }}
    />
  );
}
