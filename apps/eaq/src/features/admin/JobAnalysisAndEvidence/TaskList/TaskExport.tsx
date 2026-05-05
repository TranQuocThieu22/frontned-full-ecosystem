import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<ITaskDetailAnalysis>;
  loading: boolean;
}

export default function TaskExport({ loading, table }: Props) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      { fieldName: "standardCode", header: "Mã tiêu chuẩn" },
      { fieldName: "criterionCode", header: "Mã tiêu chí" },
      { fieldName: "limitationCode", header: "Mã hạn chế" },
      { fieldName: "analysisCode", header: "Mã phân tích" },
      { fieldName: "analysisDescription", header: "Nội dung phân tích" },
      { fieldName: "code", header: "Mã công việc" },
      { fieldName: "name", header: "Tên công việc" },
      { fieldName: "duration", header: "Thời gian thực hiện" },
      { fieldName: "expectedResult", header: "Kết quả dự kiến" },
    ],
  };

  const values = data.map((item) => {
    return {
      ...item,
      standardCode: item.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
      criterionCode: item.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code || "",
      limitationCode: item.eaqAnalysis?.eaqLimitation?.code || "",
      analysisCode: item.eaqAnalysis?.code || "",
      analysisDescription: item.eaqAnalysis?.description || "",
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách công việc cần thực hiện"
      loading={loading}
      data={values || []}
      exportConfig={exportConfig}
    />
  );
}
