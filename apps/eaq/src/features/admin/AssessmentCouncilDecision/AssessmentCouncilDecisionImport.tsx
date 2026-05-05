"use client";

import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { service_EAQAssessmentCouncilDecision } from "@/shared/APIs/service_EAQAssessmentCouncilDecision";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export default function AssessmentCouncilDecisionImport() {
  const filterStore = useS_Shared_Filter();
  const queryClient = useQueryClient();
  const dataStandardSet: IStandardSet[] | undefined = queryClient.getQueryData(["standardSetQuery"]);

  const phaseData = useMemo(() => {
    return dataStandardSet?.find(s => s.id === filterStore.state.StandardSet?.id)?.trainingPrograms?.flatMap(program =>
      program.phases?.map(phase => ({
        programCode: program.code,
        programName: program.name,
        phaseCode: phase.code,
        phaseId: phase.id,
        phaseName: phase.name,
        startDate: dateUtils.toDDMMYYYY(phase.startDate || ""),
        endDate: dateUtils.toDDMMYYYY(phase.endDate || ""),
        isCurrent: phase.isCurrent ? "✔" : ""
      })) || []
    ) || []

  }, [dataStandardSet, filterStore.state.StandardSet?.id])

  return (
    <CustomButtonImport
      fields={fields}
      fileName={"Mẫu import quyết định thành lập hội đồng tự đánh giá"}
      onSubmit={(values) => {
        const data = values.map(item => {
          const phase = phaseData?.find(i => i.phaseCode === item.phaseCode && i.programCode === item.programCode);
          return {
            ...item,
            phaseCode: undefined,
            programCode: undefined,
            eaqPhaseId: phase?.phaseId,
          }
        })

        return service_EAQAssessmentCouncilDecision.createList(data);
      }}
      onPrepareWorkbook={(workbook) => {
        excelUtils.addSheet<any>({
          workbook: workbook,
          sheetName: "CTĐT và giai đoạn kiểm định",
          data: phaseData,
          config: phaseConfig,
        });
      }}
    />
  );
}

const fields: FieldOption<any>[] = [
  {
    fieldKey: "code",
    fieldName: "Số quyết định",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên quyết định",
    isRequired: true,
  },
  {
    fieldKey: "decisionDate",
    fieldName: "Ngày quyết định",
    parseType: "date",
    isRequired: true,
  },
  {
    fieldKey: "signerName",
    fieldName: "Người ký",
    isRequired: true,
  },
  {
    fieldKey: "programCode",
    fieldName: "Mã chương trình đào tạo",
    isRequired: true,
  },
  {
    fieldKey: "phaseCode",
    fieldName: "Mã giai đoạn kiểm định",
    isRequired: true,
  }
];

const phaseConfig: IExcelColumnConfig<any>[] = [
  {
    fieldKey: "programCode",
    fieldName: "Mã chương trình đào tạo",
  },
  {
    fieldKey: "phaseCode",
    fieldName: "Mã giai đoạn kiểm định",
  },
  {
    fieldKey: "phaseName",
    fieldName: "Tên giai đoạn kiểm định",
  },
  {
    fieldKey: "programName",
    fieldName: "Tên chương trình đào tạo",
  },
  {
    fieldKey: "startDate",
    fieldName: "Ngày bắt đầu",
  },
  {
    fieldKey: "endDate",
    fieldName: "Ngày kết thúc",
  },
  {
    fieldKey: "isCurrent",
    fieldName: "Hiện hành",
  },
];
