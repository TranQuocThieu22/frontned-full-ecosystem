import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<ITaskDetailEvidence>;
  loading: boolean;
}

export default function EvidenceExport({ loading, table }: Props) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      { fieldName: "standardCode", header: "Mã tiêu chuẩn" },
      { fieldName: "criterionCode", header: "Mã tiêu chí" },
      { fieldName: "limitationCode", header: "Mã hạn chế" },
      { fieldName: "analysisCode", header: "Mã phân tích" },
      { fieldName: "analysisDescription", header: "Nội dung phân tích" },
      { fieldName: "workCode", header: "Mã công việc" },
      { fieldName: "workName", header: "Tên công việc" },
      { fieldName: "code", header: "Mã minh chứng dự kiến" },
      { fieldName: "name", header: "Tên minh chứng dự kiến" },
    ],
  };

  const values = data.map((item) => {
    return {
      ...item,
      standardCode:
        item.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
      criterionCode: item.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code || "",
      limitationCode: item.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code || "",
      analysisCode: item.eaqTaskDetail?.eaqAnalysis?.code || "",
      analysisDescription: item.eaqTaskDetail?.eaqAnalysis?.description || "",
      workCode: item.eaqTaskDetail?.code || "",
      workName: item.eaqTaskDetail?.name || "",
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách minh chứng dự kiến"
      loading={loading}
      data={values || []}
      exportConfig={exportConfig}
    />
  );
}
