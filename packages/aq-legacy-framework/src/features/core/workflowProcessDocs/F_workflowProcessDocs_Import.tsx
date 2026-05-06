"use client";

import { useModalsStack } from "@mantine/core";

import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton";
import {
  ModalImportId,
  MyModalImport,
} from "@aq-fe/aq-legacy-framework/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation";
import { Document } from "@aq-fe/aq-legacy-framework/shared/interfaces/Document";
import {
  IExcelColumnConfig,
  excelUtils,
} from "@aq-fe/aq-legacy-framework/shared/utils/excelUtils";
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
  WorkflowTypeId: number;
  documentAttributeId: number;
}

export default function F_workflowProcessDocs_Import({
  WorkflowTypeId,
  documentAttributeId,
}: Props) {
  const importMutation = useLegacyReactMutation({
    axiosFn: (body: Document[]) => {
      const values = body.map((item) => ({
        ...item,
        DocumentType: WorkflowTypeId,
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
      sheetName: "Danh mục văn bản quy trình xử lý",
      data: [],
      config: config,
    });
    excelUtils.download({
      name: "Ghi nhận danh mục văn bản quy trình xử lý",
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