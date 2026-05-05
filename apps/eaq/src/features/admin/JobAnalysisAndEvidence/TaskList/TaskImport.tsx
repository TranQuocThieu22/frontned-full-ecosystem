"use client";

import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Workbook } from "exceljs";

interface ITaskDetailImport {
  eaqAnalysisCode: string;
  code: string;
  name: string;
  duration?: string;
  expectedResult?: string;
}

export default function TaskImport() {
  const filterStore = useS_Shared_Filter();
  const queryClient = useQueryClient();

  const criteriaQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    queryKey: ["EAQCriteria_TaskImport", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const limitationsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQLimitation.getLimitationsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    queryKey: ["EAQAllLimitations_TaskImport", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const analysesQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
        analysisType: analysisTypeEnum.Limitation,
      }),
    queryKey: ["EAQAnalyses_TaskImport", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const analysisIds = useMemo(() => {
    return analysesQuery.data?.map((analysis: any) => analysis.id) || [];
  }, [analysesQuery.data]);

  const fields: FieldOption<ITaskDetailImport>[] = [
    {
      fieldKey: "eaqAnalysisCode",
      fieldName: "Mã phân tích",
      isRequired: true,
    },
    {
      fieldKey: "code",
      fieldName: "Mã công việc",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên công việc",
      isRequired: true,
    },
    {
      fieldKey: "duration",
      fieldName: "Thời gian thực hiện",
      isRequired: false,
    },
    {
      fieldKey: "expectedResult",
      fieldName: "Kết quả dự kiến",
      isRequired: false,
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu danh sách công việc"
      onPrepareWorkbook={async (workbook: Workbook) => {
        // Sheet 2: Danh sách tham khảo (nhiều cột nối tiếp)
        const maxRows = Math.max(
          analysesQuery.data?.length || 0,
          criteriaQuery.data?.length || 0,
          limitationsQuery.data?.length || 0
        );

        if (maxRows > 0) {
          const referenceData: any[] = [];

          referenceData.push({
            analysisCode: "Mã phân tích",
            analysisName: "Tên phân tích",
            analysisDescription: "Mô tả phân tích",
            criteriaId: "ID tiêu chí",
            criteriaCode: "Mã tiêu chí",
            criteriaName: "Tên tiêu chí",
            limitationId: "ID hạn chế",
            limitationCode: "Mã hạn chế",
            limitationName: "Tên hạn chế",
          });

          for (let i = 0; i < maxRows; i++) {
            const analysis = analysesQuery.data?.[i];
            const criteria = criteriaQuery.data?.[i];
            const limitation = limitationsQuery.data?.[i];

            referenceData.push({
              analysisCode: analysis?.code || "",
              analysisName: analysis?.name || "",
              analysisDescription: analysis?.description || "",
              criteriaId: criteria?.id || "",
              criteriaCode: criteria?.code || "",
              criteriaName: criteria?.name || "",
              limitationId: limitation?.id || "",
              limitationCode: limitation?.code || "",
              limitationName: limitation?.name || "",
            });
          }

          const referenceConfig: IExcelColumnConfig<any>[] = [
            { fieldKey: "analysisCode", fieldName: "Mã phân tích", isRequired: false },
            { fieldKey: "analysisName", fieldName: "Tên phân tích", isRequired: false },
            { fieldKey: "analysisDescription", fieldName: "Mô tả phân tích", isRequired: false },
            { fieldKey: "criteriaId", fieldName: "ID tiêu chí", isRequired: false },
            { fieldKey: "criteriaCode", fieldName: "Mã tiêu chí", isRequired: false },
            { fieldKey: "criteriaName", fieldName: "Tên tiêu chí", isRequired: false },
            { fieldKey: "limitationId", fieldName: "ID hạn chế", isRequired: false },
            { fieldKey: "limitationCode", fieldName: "Mã hạn chế", isRequired: false },
            { fieldKey: "limitationName", fieldName: "Tên hạn chế", isRequired: false },
          ];

          await excelUtils.addSheet<any>({
            workbook: workbook,
            sheetName: "Danh sách phân tích",
            data: referenceData,
            config: referenceConfig,
          });
        }
      }}
      onSubmit={async (values: ITaskDetailImport[]) => {
        const transformedData = values.map((item) => ({
          code: item.code,
          name: item.name,
          duration: item.duration || "",
          expectedResult: item.expectedResult || "",
          eaqAnalysisCode: item.eaqAnalysisCode,
        }));

        const res = await service_EAQAnalysis.importTaskDetailAnalyses(transformedData);

        queryClient.invalidateQueries({
          queryKey: ["EAQTaskDetails", analysisIds],
        });

        return res;
      }}
    />
  );
}
