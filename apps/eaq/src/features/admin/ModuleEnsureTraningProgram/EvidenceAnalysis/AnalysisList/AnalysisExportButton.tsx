import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<IAnalysis>;
  loading: boolean;
}

export default function AnalysisExportButton({ table, loading }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: "Mã tiêu chuẩn",
        fieldName: "eaqStandardCode",
        formatFunction: (value: any, row: IAnalysis) =>
          row?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        header: "Mã tiêu chí",
        fieldName: "eaqCriteriaCode",
        formatFunction: (value: any, row: IAnalysis) => row?.eaqRequirement?.eaqCriteria?.code || "",
      },
      {
        header: "Mã yêu cầu",
        fieldName: "eaqRequirementCode",
        formatFunction: (value: any, row: IAnalysis) => row?.eaqRequirement?.code || "",
      },
      {
        header: "Tên yêu cầu",
        fieldName: "eaqRequirementName",
        formatFunction: (value: any, row: IAnalysis) => row?.eaqRequirement?.name || "",
      },
      {
        header: "Mã phân tích",
        fieldName: "code",
        formatFunction: (value: any, row: IAnalysis) => row?.code || "",
      },
      {
        header: "Nội dung phân tích",
        fieldName: "description",
        formatFunction: (value: any, row: IAnalysis) => row?.description || "",
      },
      {
        header: "Câu hỏi phân tích",
        fieldName: "question",
        formatFunction: (value: any, row: IAnalysis) => row?.question || "",
      },
    ],
  };

  return (
    <>
      <AQButtonExportData
        loading={loading}
        objectName="Danh sách nội dung phân tích yêu cầu tiêu chí"
        data={data}
        exportConfig={exportConfig}
      />
    </>
  );
}
