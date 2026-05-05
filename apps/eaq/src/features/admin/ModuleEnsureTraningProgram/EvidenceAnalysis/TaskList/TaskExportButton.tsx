import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<ITaskDetailAnalysis>;
  loading: boolean;
}

export default function TaskExportButton({ table, loading }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: "Mã tiêu chuẩn",
        fieldName: "eaqStandardCode",
        formatFunction: (value: any, row: ITaskDetailAnalysis) =>
          row?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        header: "Mã tiêu chí",
        fieldName: "eaqCriteriaCode",
        formatFunction: (value: any, row: ITaskDetailAnalysis) =>
          row?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || "",
      },
      {
        header: "Mã yêu cầu",
        fieldName: "eaqRequirementCode",
        formatFunction: (value: any, row: ITaskDetailAnalysis) =>
          row?.eaqAnalysis?.eaqRequirement?.code || "",
      },
      {
        header: "Tên yêu cầu",
        fieldName: "eaqRequirementName",
        formatFunction: (value: any, row: ITaskDetailAnalysis) =>
          row?.eaqAnalysis?.eaqRequirement?.name || "",
      },
      {
        header: "Mã công việc",
        fieldName: "code",
        formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.code || "",
      },
      {
        header: "Tên công việc",
        fieldName: "name",
        formatFunction: (value: any, row: ITaskDetailAnalysis) => row?.name || "",
      },
    ],
  };

  return (
    <>
      <AQButtonExportData
        loading={loading}
        objectName="Danh sách công việc cần thực hiện"
        data={data}
        exportConfig={exportConfig}
      />
    </>
  );
}
