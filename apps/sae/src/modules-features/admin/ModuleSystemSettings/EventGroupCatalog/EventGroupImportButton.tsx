"use client";

import { service_eventGroup } from "@/api/services/service_eventGroup";
import { EventGroup } from "@/interfaces/eventGroup";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";

import ExcelJS from "exceljs";

const config: IExcelColumnConfig<EventGroup>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã hoạt động",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên hoạt động",
    isRequired: true,
  },
];

export default function EventGroupImportButton() {
  const importMutation = useCustomReactMutation({
    axiosFn: (body: EventGroup[]) =>
      service_eventGroup.createOrUpdateList(
        body.map((item) => ({
          ...item,
          isDefault: false,
          eventNumber: 0,
        }))
      ),
    mutationType: "import",
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<EventGroup>({
      workbook: workbook,
      sheetName: "Danh mục nhóm hoạt động",
      data: [],
      config: config,
    });
    excelUtils.download({ name: "Ghi nhận nhóm hoạt động", workbook });
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
        onExecute={(finalValues: EventGroup[]) => {
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
