import { service_EAQStandardSet } from "@/shared/APIs/service_EAQStandardSet";
import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import {
  excelUtils,
  IExcelColumnConfig,
} from "@aq-fe/core-ui/shared/utils/excelUtils";
import { AccreditationTypeLabel } from "./StandardSetManagementTable";

interface AccreditationType {
  id: number;
  name: string;
}

const RequirementConfig: IExcelColumnConfig<AccreditationType>[] = [
  {
    fieldKey: "id",
    fieldName: "Giá trị",
  },
  {
    fieldKey: "name",
    fieldName: "Tên loại kiểm định",
  },
];

export default function StandardSetImportButton({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const Accreditation = Object.entries(AccreditationTypeLabel)
    .filter((entry): entry is [string, string] => !isNaN(Number(entry[0])))
    .map(([key, value]) => ({
      id: Number(key),
      name: value,
    }));

  if (isLoading) return null;

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Bộ tiêu chuẩn"
      onSubmit={(value) => {
        const formattedValue = value.map((item) => ({
          ...item,
        }));
        return service_EAQStandardSet.createOrUpdateList(formattedValue)
      }}
      onPrepareWorkbook={async (workbook) => {
        excelUtils.addSheet<AccreditationType>({
          workbook: workbook,
          sheetName: "Danh sách loại kiểm định",
          data: Accreditation || [],
          config: RequirementConfig,
        });
      }}
    />
  );
}

const fields: FieldOption<IStandardSet>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã bộ tiêu chuẩn",
    isRequired: true,
    isUnique: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên bộ tiêu chuẩn",
    isRequired: true,
  },
  {
    fieldKey: "description",
    fieldName: "Mô tả bộ tiêu chuẩn",
  },
  {
    fieldKey: "version",
    fieldName: "Phiên bản",
    isRequired: true,
  },
  {
    fieldKey: "issuedDate",
    fieldName: "Ngày ban hành",
    isRequired: true,
    parseType: "date",
  },
  {
    fieldKey: "accreditationType",
    fieldName: "Loại kiểm định",
    parseType: "number",
  },
];
