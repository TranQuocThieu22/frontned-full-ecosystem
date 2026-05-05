"use client";

import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

export default function EvidenceManagementImportButton({
  listEvidence = [],
}: {
  listEvidence?: IEvidence[];
}) {
  const fields: FieldOption<IEvidence>[] = [
    {
      fieldKey: "code",
      fieldName: "Mã minh chứng",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên minh chứng",
      isRequired: true,
    },
    {
      fieldKey: "referenceEvidenceId",
      fieldName: "Id minh chứng trực thuộc",
      isRequired: false,
      parseType: "number",
    },
    {
      fieldKey: "note",
      fieldName: "Ghi chú",
      isRequired: false,
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Danh sách minh chứng"
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
            fieldName: "Mã minh chứng",
            isRequired: true,
          },
        ];

        await excelUtils.addSheet<{ id: number; name: string }>({
          workbook: workbook,
          sheetName: "Danh sách minh chứng",
          data: listEvidence?.map((item) => ({
            id: item.id ?? 0,
            name: item.code ?? "",
          })),
          config: referenceConfig,
        });
      }}
      onSubmit={async (values: IEvidence[]) => {
        const transformedData = values.map((item) => ({
          ...item,
          code: item.code?.toString(),
          name: item.name?.toString(),
          note: item.note?.toString(),
          referenceEvidenceId: item.referenceEvidenceId
            ? Number(item.referenceEvidenceId)
            : undefined,
        }));

        return await service_EAQEvidence.createOrUpdateList(transformedData);
      }}
    />
  );
}
