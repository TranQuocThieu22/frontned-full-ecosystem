"use client";

import { service_department } from "@/api/services/service_department";
import { Department } from "@/interfaces/department";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";

import ExcelJS from "exceljs";

const config: IExcelColumnConfig<Department>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã đơn vị",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên đơn vị",
    isRequired: true,
  },
];

export default function OrganizingUnitImportButton() {
  const importMutation = useCustomReactMutation({
    axiosFn: (body: Department[]) =>
      service_department.createOrUpdateList(
        body.map((item) => ({
          ...item,
          isWorkingUnit: false,
        }))
      ),
    mutationType: "import",
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<Department>({
      workbook: workbook,
      sheetName: "Danh sách đơn vị tổ chức",
      data: [],
      config: config,
    });
    excelUtils.download({ name: "Ghi nhận đơn vị tổ chức", workbook });
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
        onExecute={(finalValues: Department[]) => {
          importMutation.mutate(finalValues, {
            onSuccess: () => {
              stack.closeAll();
            },
          });
        }}
      />
      <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
    </>
  );
}
