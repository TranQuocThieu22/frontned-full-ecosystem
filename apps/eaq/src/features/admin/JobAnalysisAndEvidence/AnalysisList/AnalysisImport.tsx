"use client";

import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useQueryClient } from "@tanstack/react-query";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { Workbook } from "exceljs";

interface IAnalysisImport {
  code: string;
  name: string;
  description?: string;
  question?: string;
  eaqLimitationCode: string;
  analysisType: number;
}

export default function AnalysisImport() {
  const filterStore = useS_Shared_Filter();
  const queryClient = useQueryClient();

  const criteriaQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    queryKey: ["EAQCriteria_AnalysisImport", filterStore.state.Phase?.id],
    options: {
      enabled: filterStore.state.Phase?.id != undefined,
    },
  });

  const limitationsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQLimitation.getLimitationsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    queryKey: ["EAQAllLimitations_AnalysisImport", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const fields: FieldOption<IAnalysisImport>[] = [
    {
      fieldKey: "eaqLimitationCode",
      fieldName: "Mã hạn chế",
      isRequired: true,
    },
    {
      fieldKey: "code",
      fieldName: "Mã phân tích",
      isRequired: true,
    },
    {
      fieldKey: "description",
      fieldName: "Nội dung phân tích",
      isRequired: true,
    },
    {
      fieldKey: "question",
      fieldName: "Câu hỏi phân tích",
      isRequired: false,
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu danh sách phân tích"
      onPrepareWorkbook={async (workbook: Workbook) => {
        const maxRows = Math.max(
          limitationsQuery.data?.length || 0,
          criteriaQuery.data?.length || 0
        );

        if (maxRows > 0) {
          const referenceData: any[] = [];

          referenceData.push({
            limitationCode: "Mã hạn chế",
            limitationName: "Tên hạn chế",
            criteriaId: "ID tiêu chí",
            criteriaCode: "Mã tiêu chí",
            criteriaName: "Tên tiêu chí",
          });

          for (let i = 0; i < maxRows; i++) {
            const limitation = limitationsQuery.data?.[i];
            const criteria = criteriaQuery.data?.[i];

            referenceData.push({
              limitationId: limitation?.id || "",
              limitationCode: limitation?.code || "",
              limitationName: limitation?.name || "",
              criteriaId: criteria?.id || "",
              criteriaCode: criteria?.code || "",
              criteriaName: criteria?.name || "",
            });
          }

          const referenceConfig: IExcelColumnConfig<any>[] = [
            { fieldKey: "limitationCode", fieldName: "Mã hạn chế", isRequired: false },
            { fieldKey: "limitationName", fieldName: "Tên hạn chế", isRequired: false },
            { fieldKey: "criteriaId", fieldName: "ID tiêu chí", isRequired: false },
            { fieldKey: "criteriaCode", fieldName: "Mã tiêu chí", isRequired: false },
            { fieldKey: "criteriaName", fieldName: "Tên tiêu chí", isRequired: false },
          ];

          await excelUtils.addSheet<any>({
            workbook: workbook,
            sheetName: "Danh sách hạn chế",
            data: referenceData,
            config: referenceConfig,
          });
        }
      }}
      onSubmit={async (values: IAnalysisImport[]) => {
        const transformedData = values.map((item) => ({
          code: item.code,
          name: item.description || "",
          description: item.description || "",
          question: item.question || "",
          eaqLimitationCode: item.eaqLimitationCode,
          analysisType: analysisTypeEnum.Limitation,
          eaqPhaseId: filterStore.state.Phase?.id,
        }));
        const res = await service_EAQAnalysis.importTaskDetailAnalysis(transformedData);
        queryClient.invalidateQueries({
          queryKey: ["EAQAnalyses", filterStore.state.Phase?.id],
        });
        return res as any;
      }}
    />
  );
}
