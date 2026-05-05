"use client";

import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

import { IRule } from "@/shared/interfaces/rule/IRule";
import { service_EAQRule } from "@/shared/APIs/service_EAQRule";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";


export default function RuleImportButton() {

  return (
    <CustomButtonImport
      fields={config}
      fileName="Mẫu import vai trò"
      onSubmit={(finalValues: IRule[]) => {
        return service_EAQRule.createOrUpdateList(finalValues)
      }}
    />
  );
}

const config: FieldOption<IRule>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã vai trò",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên vai trò",
    isRequired: true,
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
    isRequired: false,
  },
];
