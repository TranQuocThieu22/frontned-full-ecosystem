"use client";

import { useModalsStack } from "@mantine/core";

import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import {
  ModalImportId,
  MyModalImport,
} from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import {
  IExcelColumnConfig,
  excelUtils,
} from "@aq-fe/core-ui/shared/utils/excelUtils";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<Document>[] = [
  { fieldKey: "decisionCode", fieldName: "Số quy định", isRequired: true },
  {
    fieldKey: "promulgateDate",
    fieldName: "Ngày ban hành (Ngày/ tháng/ năm)",
    isRequired: true,
  },
  { fieldKey: "name", fieldName: "Tên tài liệu", isRequired: true },
  { fieldKey: "orderBy", fieldName: "Thứ tự hiển thị trên danh sách" },
];

interface Props {
  RegulationsTypeId: number;
  documentAttributeId: number;
}

export default function F_organizationPolicyDocs_Import({
  RegulationsTypeId,
  documentAttributeId,
}: Props) {
  const importMutation = useCustomReactMutation({
    axiosFn: (body: Document[]) => {
      const values = body.map((item) => ({
        ...item,
        DocumentType: RegulationsTypeId,
        documentAttributeId: documentAttributeId,
      }));
      return documentService.createOrUpdateList(values);
    },
    mutationType: "import",
  });

  const stack = useModalsStack<ModalImportId>([]);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<Document>({
      workbook,
      sheetName: "Danh mục văn bản quy định tổ chức",
      data: [],
      config: config,
    });
    excelUtils.download({
      name: "Ghi nhận danh mục văn bản quy định tổ chức",
      workbook,
    });
  };

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey,
          label: item.fieldName,
        }))}
        stack={stack}
        onExportStructure={handleExport}
        onExecute={(finalValues: Document[]) => {
          const transformedValues: Document[] = finalValues.map((item) => ({
            ...item,
            decisionCode: String(item.decisionCode || "").trim(),
            name: String(item.name || "").trim(),
            promulgateDate: item.promulgateDate,
            orderBy: item.orderBy ?? 0,
          }));

          importMutation.mutate(transformedValues, {
            onSuccess: () => {
              stack.closeAll();
            },
            onError: () => console.log(transformedValues),
          });
        }}
      />
      <CustomButton
        actionType="import"
        onClick={() => stack.open("FileImportConfig")}
      />
    </>
  );
}
