"use client";

import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";

export default function F_systemUpdateDocs_Import({
  RefinementTypeId,
}: {
  RefinementTypeId: number;
}) {
  const fields: FieldOption<Document>[] = [
    {
      fieldKey: "departmentName",
      fieldName: "Đơn vị yêu cầu",
      isRequired: true,
    },
    {
      fieldKey: "description",
      fieldName: "Nội dung cải tiến",
      isRequired: true,
    },
    {
      fieldKey: "startDate",
      fieldName: "Ngày bắt đầu",
      parseType: "date",
      isRequired: true,
    },
    {
      fieldKey: "endDate",
      fieldName: "Ngày kết thúc",
      parseType: "date",
      isRequired: true,
    },
    {
      fieldKey: "note",
      fieldName: "Ghi chú",
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName={`Thông tin xây dựng, cải tiến, bảo trì hệ thống`}
      onSubmit={async (values: Document[]) => {
        const dataWithType = values.map((item) => ({
          ...item,
          documentType: RefinementTypeId,
        }));
        return documentService.createList(dataWithType);
      }}
    />
  );
}
