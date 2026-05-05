import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<IAnalysis>;
  loading: boolean;
}

export default function AnalysisExport({ loading, table }: Props) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      { fieldName: "standardCode", header: "Mã tiêu chuẩn" },
      { fieldName: "standardName", header: "Tên tiêu chuẩn" },
      { fieldName: "criterionCode", header: "Mã tiêu chí" },
      { fieldName: "criterionName", header: "Tên tiêu chí" },
      { fieldName: "limitationCode", header: "Mã hạn chế" },
      { fieldName: "limitationName", header: "Tên hạn chế" },
      { fieldName: "code", header: "Mã phân tích" },
      { fieldName: "description", header: "Nội dung phân tích" },
      { fieldName: "question", header: "Câu hỏi phân tích" },
    ],
  };

  const values = data.map((item) => {
    return {
      ...item,
      standardCode: item.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
      standardName: item.eaqLimitation?.eaqCriteria?.eaqStandard?.name || "",
      criterionCode: item.eaqLimitation?.eaqCriteria?.code || "",
      criterionName: item.eaqLimitation?.eaqCriteria?.name || "",
      limitationCode: item.eaqLimitation?.code || "",
      limitationName: item.eaqLimitation?.name || "",
    };
  });

  return (
    <AQButtonExportData
      objectName="Danh sách phân tích"
      data={values || []}
      loading={loading}
      exportConfig={exportConfig}
    />
  );
}
