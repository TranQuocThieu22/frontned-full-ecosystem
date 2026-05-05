"use client";

import { IImportEAQPhases, service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  excelUtils,
  IExcelColumnConfig,
} from "@aq-fe/core-ui/shared/utils/excelUtils";
import { phaseStatusOptions } from "./PhaseTable";

export default function PhaseImportButton() {
  // chương trình đào tạo
  const trainingProgramQuery = useCustomReactQuery({
    queryKey: ["trainingProgramRead"],
    axiosFn: async () =>
      service_EAQTrainingProgram.GetAllAccreditationTrainingPrograms({}),
  });

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Giai đoạn kiểm định"
      onSubmit={(value) => {
        const formattedValue = value.map((item) => {
          return {
            ...item,
          };
        });
        return service_EAQPhase.importEAQPhases(formattedValue);
      }}
      onPrepareWorkbook={async (workbook) => {
        excelUtils.addSheet<ITrainingProgram>({
          workbook: workbook,
          sheetName: "Danh sách CTDT kiểm định",
          data:
            trainingProgramQuery.data?.map((item) => ({
              ...item,
              standardSetCode: item.eaqStandardSet?.code || "",
              standardSetName: item.eaqStandardSet?.name || "",
            })) || [],
          config: trainingProgramConfig,
        });

        excelUtils.addSheet<I_PhaseStatusConfig>({
          workbook: workbook,
          sheetName: "Danh sách trạng thái giai đoạn",
          data: phaseStatusOptions.map((opt) => ({
            value: Number(opt.value),
            label: opt.label,
          })),
          config: phaseStatusConfig,
        });
      }}
    />
  );
}

const fields: FieldOption<IImportEAQPhases>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã giai đoạn kiểm định",
    isRequired: true,
    isUnique: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên giai đoạn kiểm định",
    isRequired: true,
  },
  {
    fieldKey: "EAQStandardSetTrainingProgramCode",
    fieldName: "Mã chương trình đào tạo (Xem danh sách giá trị)",
    isRequired: true,
  },
  {
    fieldKey: "eaqStandardSetCode",
    fieldName: "Mã bộ tiêu chuẩn (Xem danh sách giá trị)",
    isRequired: true,
  },
  {
    fieldKey: "phaseStatus",
    fieldName: "Trạng thái giai đoạn (Xem danh sách giá trị)",
    isRequired: true,
    parseType: "number",
  },
  {
    fieldKey: "startDate",
    fieldName: "Ngày bắt đầu (dd/MM/yyyy)",
    isRequired: true,
    parseType: "date",
  },
  {
    fieldKey: "endDate",
    fieldName: "Ngày kết thúc (dd/MM/yyyy)",
    isRequired: true,
    parseType: "date",
  },
  {
    fieldKey: "isCurrent",
    fieldName: "Hiện hành",
    isRequired: false,
    parseType: "boolean",
  },
  {
    fieldKey: "note",
    fieldName: "Ghi chú",
    isRequired: false,
  },
];

const trainingProgramConfig: IExcelColumnConfig<ITrainingProgram>[] = [
  {
    fieldKey: "id",
    fieldName: "Id chương trình đào tạo",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã chương trình đào tạo",
  },
  {
    fieldKey: "name",
    fieldName: "Tên chương trình đào tạo",
  },
  {
    fieldKey: "standardSetCode",
    fieldName: "Mã bộ tiêu chuẩn",
  },
  {
    fieldKey: "standardSetName",
    fieldName: "Tên bộ tiêu chuẩn",
  },
];

interface I_PhaseStatusConfig {
  value: number;
  label: string;
}

const phaseStatusConfig: IExcelColumnConfig<I_PhaseStatusConfig>[] = [
  {
    fieldKey: "value",
    fieldName: "Giá trị trạng thái giai đoạn",
  },
  {
    fieldKey: "label",
    fieldName: "Tên trạng thái giai đoạn",
  },
];
