"use client";

import { service_department } from "@/api/services/service_department";
import { ENUM_DEPARTMENT_TYPE } from "@/constants/enum/global";
import { useModalsStack } from "@mantine/core";

import ExcelJS from "exceljs";
import IWorkingUnitDepartmentViewModel from "./interfaces/IWorkingUnitDepartmentViewModel";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

const config: IExcelColumnConfig<IWorkingUnitDepartmentViewModel>[] = [
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
  {
    fieldKey: "type",
    fieldName: "Loại đơn vị",
    isRequired: true,
  },
];

const config_type: IExcelColumnConfig<{ type: string; value: string }>[] = [
  {
    fieldKey: "type",
    fieldName: "Loại đơn vị",
    isRequired: true,
  },
  {
    fieldKey: "value",
    fieldName: "Tên loại đơn vị",
    isRequired: true,
  },
];

export default function WorkingUnitDepartmentImtportButton() {
  const importMutation = useCustomReactMutation({
    axiosFn: (body: IWorkingUnitDepartmentViewModel[]) =>
      service_department.createOrUpdateList(
        body.map((item) => ({
          ...item,
          isWorkingUnit: true,
        }))
      ),
    mutationType: "import",
  });
  const stack = useModalsStack<ModalImportId>([]);
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<IWorkingUnitDepartmentViewModel>({
      workbook: workbook,
      sheetName: "Danh mục đơn vị công nhận điểm",
      data: [],
      config: config,
    });

    await excelUtils.addSheet<{ type: string; value: string }>({
      workbook: workbook,
      sheetName: "Danh mục loại đơn vị",
      data: Object.keys(ENUM_DEPARTMENT_TYPE)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
          value: key,
          type: ENUM_DEPARTMENT_TYPE[key as keyof typeof ENUM_DEPARTMENT_TYPE].toString(),
        })),
      config: config_type,
    });
    excelUtils.download({ name: "Danh mục đơn vị công nhận điểm", workbook });
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
        onExecute={(finalValues: IWorkingUnitDepartmentViewModel[]) => {
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
