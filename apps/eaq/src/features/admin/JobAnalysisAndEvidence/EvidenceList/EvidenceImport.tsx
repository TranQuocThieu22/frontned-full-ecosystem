"use client";

import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useQueryClient } from "@tanstack/react-query";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { Workbook } from "exceljs";

interface IEvidenceImport {
  eaqTaskDetailCode: string;
  code: string;
  name: string;
}

export default function EvidenceImport() {
  const filterStore = useS_Shared_Filter();
  const queryClient = useQueryClient();

  const criteriaQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    queryKey: ["EAQCriteria_Import", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const limitationsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQLimitation.getLimitationsByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    queryKey: ["EAQAllLimitations_Import", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const analysesQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id || 0,
        analysisType: analysisTypeEnum.Limitation,
      }),
    queryKey: ["EAQAllAnalyses_Import", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const taskDetailsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id || 0,
        analysisType: analysisTypeEnum.Limitation,
      }),
    queryKey: ["EAQTaskDetails_Import", filterStore.state.Phase?.id],
    options: {
      enabled: !!analysesQuery.data && analysesQuery.data.length > 0,
    },
  });

  const fields: FieldOption<IEvidenceImport>[] = [
    {
      fieldKey: "eaqTaskDetailCode",
      fieldName: "Mã công việc",
      isRequired: true,
    },
    {
      fieldKey: "code",
      fieldName: "Mã minh chứng dự kiến",
      isRequired: true,
    },
    {
      fieldKey: "name",
      fieldName: "Tên minh chứng dự kiến",
      isRequired: true,
    },
  ];

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu danh sách minh chứng dự kiến"
      onPrepareWorkbook={async (workbook: Workbook) => {
        // Sheet 2: Danh sách tham khảo (nhiều cột nối tiếp)
        const maxRows = Math.max(
          taskDetailsQuery.data?.length || 0,
          analysesQuery.data?.length || 0,
          limitationsQuery.data?.length || 0,
          criteriaQuery.data?.length || 0
        );

        if (maxRows > 0) {
          const referenceData: any[] = [];

          referenceData.push({
            taskDetailCode: "Mã công việc",
            taskDetailName: "Tên công việc",
            criteriaId: "ID tiêu chí",
            criteriaCode: "Mã tiêu chí",
            criteriaName: "Tên tiêu chí",
            limitationId: "ID hạn chế",
            limitationCode: "Mã hạn chế",
            limitationName: "Tên hạn chế",
            analysisId: "ID phân tích",
            analysisCode: "Mã phân tích",
            analysisName: "Tên phân tích",
            analysisDescription: "Mô tả phân tích",
          });

          for (let i = 0; i < maxRows; i++) {
            const task = taskDetailsQuery.data?.[i];
            const analysis = analysesQuery.data?.[i];
            const limitation = limitationsQuery.data?.[i];
            const criteria = criteriaQuery.data?.[i];

            referenceData.push({
              taskDetailCode: task?.code || "",
              taskDetailName: task?.name || "",
              criteriaId: criteria?.id || "",
              criteriaCode: criteria?.code || "",
              criteriaName: criteria?.name || "",
              limitationId: limitation?.id || "",
              limitationCode: limitation?.code || "",
              limitationName: limitation?.name || "",
              analysisId: analysis?.id || "",
              analysisCode: analysis?.code || "",
              analysisName: analysis?.name || "",
              analysisDescription: analysis?.description || "",
            });
          }

          const referenceConfig: IExcelColumnConfig<any>[] = [
            { fieldKey: "taskDetailCode", fieldName: "Mã công việc", isRequired: false },
            { fieldKey: "taskDetailName", fieldName: "Tên công việc", isRequired: false },
            { fieldKey: "criteriaId", fieldName: "ID tiêu chí", isRequired: false },
            { fieldKey: "criteriaCode", fieldName: "Mã tiêu chí", isRequired: false },
            { fieldKey: "criteriaName", fieldName: "Tên tiêu chí", isRequired: false },
            { fieldKey: "limitationId", fieldName: "ID hạn chế", isRequired: false },
            { fieldKey: "limitationCode", fieldName: "Mã hạn chế", isRequired: false },
            { fieldKey: "limitationName", fieldName: "Tên hạn chế", isRequired: false },
            { fieldKey: "analysisId", fieldName: "ID phân tích", isRequired: false },
            { fieldKey: "analysisCode", fieldName: "Mã phân tích", isRequired: false },
            { fieldKey: "analysisName", fieldName: "Tên phân tích", isRequired: false },
            { fieldKey: "analysisDescription", fieldName: "Mô tả phân tích", isRequired: false },
          ];

          await excelUtils.addSheet<any>({
            workbook: workbook,
            sheetName: "Danh sách công việc",
            data: referenceData,
            config: referenceConfig,
          });
        }
      }}
      onSubmit={async (values: IEvidenceImport[]) => {
        const transformedData = values.map((item) => ({
          code: item.code,
          name: item.name,
          eaqTaskDetailCode: item.eaqTaskDetailCode,
        }));

        const res = await service_EAQAnalysis.importTaskDetailEvidenceAnalyses(transformedData);

        queryClient.invalidateQueries({
          queryKey: ["EAQTaskDetailEvidenceAnalyses", filterStore.state.Phase?.id],
        });

        return res;
      }}
    />
  );
}
