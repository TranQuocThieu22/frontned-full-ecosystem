"use client";

import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";

export default function F_securityPolicyDocs_Import({
  SecurityTypeId,
}: {
  SecurityTypeId: number;
}) {
  const fields: FieldOption<Document>[] = [
    {
      fieldKey: "decisionCode",
      fieldName: "Số quy định",
      isRequired: true,
    },
    {
      fieldKey: "promulgateDate",
      fieldName: "Ngày ban hành",
      parseType: "date",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên tài liệu",
      isRequired: true,
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName={`Nhập_dữ_liệu_tài_liệu_chính_sách_bảo_mật`}
      onSubmit={async (values: Document[]) => {
        const dataWithType = values.map((item) => ({
          ...item,
          documentType: SecurityTypeId,
        }));
        return documentService.createList(dataWithType);
      }}
    />
  );
}
