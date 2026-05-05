"use client";

import { service_address } from "@/api/services/service_address";
import { AddressViewModel } from "@/interfaces/addressViewModel";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";

import ExcelJS from "exceljs";

const config: IExcelColumnConfig<AddressViewModel>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã địa điểm",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên địa điểm",
    isRequired: true,
  },

  {
    fieldKey: "capacity",
    fieldName: "Sức chứa",
    isRequired: true,
  },
];

export default function AddressInsideSchoolImportButton() {
  const importMutation = useCustomReactMutation({
    axiosFn: (body: AddressViewModel[]) =>
      service_address.createOrUpdateList(
        body.map((item) => ({
          ...item,
          isInsiteSchool: true,
        }))
      ),
    mutationType: "import",
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<AddressViewModel>({
      workbook: workbook,
      sheetName: "Danh mục địa điểm tổ chức trong trường",
      data: [],
      config: config,
    });
    excelUtils.download({ name: "Ghi nhận địa điểm tổ chức trong trường", workbook });
  };

  return (
    <>
      <MyModalImport
        fieldDefinition={config.map((item) => ({
          key: item.fieldKey as any,
          label: item.fieldName,
        }))}
        stack={stack}
        onExportStructure={handleExport}
        onExecute={(finalValues: AddressViewModel[]) => {
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
