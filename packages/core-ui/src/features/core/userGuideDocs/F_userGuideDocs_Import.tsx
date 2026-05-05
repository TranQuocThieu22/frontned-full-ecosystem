"use client";

import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";

export default function F_userGuideDocs_Import({ GuidelineTypeId }: { GuidelineTypeId: number }) {
  const fields: FieldOption<Document>[] = [
    {
      fieldKey: "code",
      fieldName: "Mã tài liệu",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên tài liệu",
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
      fileName={`Tài liệu hướng dẫn sử dụng`}
      onSubmit={async (values: Document[]) => {
        const dataWithType = values.map((item) => ({
          ...item,
          documentType: GuidelineTypeId,
        }));
        return documentService.createList(dataWithType);
      }}
    />
  );
}
