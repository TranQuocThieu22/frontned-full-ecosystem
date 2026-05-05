import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

export default function SyntheticExport({ table }: { table: MRT_TableInstance<ITaskDetail> }) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      { fieldName: "standardCode", header: "Mã tiêu chuẩn" },
      { fieldName: "criteriaCode", header: "Mã tiêu chí" },
      { fieldName: "requirementCode", header: "Mã yêu cầu" },
      { fieldName: "requirementName", header: "Tên yêu cầu" },
      { fieldName: "analysisCode", header: "Mã phân tích" },
      { fieldName: "analysisDescription", header: "Nội dung phân tích" },
      { fieldName: "analysisQuestion", header: "Câu hỏi phân tích" },
      { fieldName: "taskCode", header: "Mã công việc" },
      { fieldName: "taskName", header: "Tên công việc" },
      { fieldName: "evidenceCodes", header: "Mã minh chứng dự kiến" },
      { fieldName: "evidenceNames", header: "Tên minh chứng" },
    ],
  };

  const values = data.map((item) => {
    return {
      standardCode: item.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || "",
      criteriaCode: item.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || "",
      requirementCode: item.eaqAnalysis?.eaqRequirement?.code || "",
      requirementName: item.eaqAnalysis?.eaqRequirement?.name || "",
      analysisCode: item.eaqAnalysis?.code || "",
      analysisDescription: item.eaqAnalysis?.description || "",
      analysisQuestion: item.eaqAnalysis?.question || "",
      taskCode: item.code || "",
      taskName: item.name || "",
      evidenceCodes:
        item.eaqTaskDetailEvidences
          ?.map((e) => e.code)
          .filter(Boolean)
          .join("; ") || "",
      evidenceNames:
        item.eaqTaskDetailEvidences
          ?.map((e) => e.name)
          .filter(Boolean)
          .join("; ") || "",
    };
  });

  return (
    <AQButtonExportData
      objectName="Tổng hợp nội dung phân tích"
      data={values || []}
      exportConfig={exportConfig}
    />
  );
}
