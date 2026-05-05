"use client";

import { service_COEGrade } from "@/api/services/service_COEGrade";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

interface GradeIRMImportProps {
  loading?: boolean
  disabled?: boolean
}

export default function IRMApplyByGradeImportButton({ loading, disabled }: GradeIRMImportProps) {

  return (
    <CustomButtonImport
      fields={fields}
      buttonProps={{
        loading: loading,
        disabled: disabled
      }}
      fileName="Mẫu import thang đo IRM theo Khoá"
      onSubmit={(values) => {
        return service_COEGrade.importIRM(
          values.map((value: any) => ({
            gradeCode: value.code,
            irmCode: value.coeirmCode
          })))
      }}
    />
  );
}

const fields: FieldOption<any>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã khóa",
    isRequired: true,
  },
  {
    fieldKey: "coeirmCode",
    fieldName: "Mã thang do IRM",
    isRequired: true,
  },
];

