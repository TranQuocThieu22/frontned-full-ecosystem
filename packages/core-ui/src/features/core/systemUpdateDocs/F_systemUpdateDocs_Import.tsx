"use client";

import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";

import { notifications } from "@mantine/notifications";

export default function F_systemUpdateDocs_Import({
  RefinementTypeId,
}: {
  RefinementTypeId: number;
}) {
  const fields: FieldOption<Document>[] = [
    {
      fieldKey: "meetingDate",
      fieldName: "Ngày họp",
      parseType: "date",
      isRequired: true,
    },
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
      fieldKey: "conclusion",
      fieldName: "Kết luận",
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
      onSubmit={(values: Document[]) => {
        // Kiểm tra logic nghiệp vụ: Ngày kết thúc > Ngày bắt đầu
        const errors: string[] = [];
        values.forEach((item, index) => {
          if (item.startDate && item.endDate && new Date(item.endDate) <= new Date(item.startDate)) {
            errors.push(`[endDate].[${index + 1}]: Ngày kết thúc phải lớn hơn ngày bắt đầu`);
          }
        });

        if (errors.length > 0) {
          notifications.show({
            title: "Dữ liệu không hợp lệ",
            message: (
              <ul style={{ paddingLeft: 16 }}>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            ),
            color: "red",
          });
          return false;
        }

        const dataWithType = values.map((item) => ({
          ...item,
          documentType: RefinementTypeId,
        }));
        return documentService.createList(dataWithType);
      }}
    />
  );
}
