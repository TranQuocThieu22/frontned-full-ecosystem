import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<ITaskDetailEvidence>;
  loading: boolean;
}

export default function EvidenceExportButton({ table, loading }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: "Mã tiêu chuẩn",
        fieldName: "eaqStandardCode",
        formatFunction: (value: any, row: ITaskDetailEvidence) =>
          row?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        header: "Mã tiêu chí",
        fieldName: "eaqCriteriaCode",
        formatFunction: (value: any, row: ITaskDetailEvidence) =>
          row?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || "",
      },
      {
        header: "Mã yêu cầu",
        fieldName: "eaqRequirementCode",
        formatFunction: (value: any, row: ITaskDetailEvidence) =>
          row?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.code || "",
      },
      {
        header: "Tên yêu cầu",
        fieldName: "eaqRequirementName",
        formatFunction: (value: any, row: ITaskDetailEvidence) =>
          row?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.name || "",
      },
      {
        header: "Mã công việc",
        fieldName: "eaqTaskDetailCode",
        formatFunction: (value: any, row: ITaskDetailEvidence) => row?.eaqTaskDetail?.code || "",
      },
      {
        header: "Tên công việc",
        fieldName: "eaqTaskDetailName",
        formatFunction: (value: any, row: ITaskDetailEvidence) => row?.eaqTaskDetail?.name || "",
      },
      {
        header: "Mã minh chứng dự kiến",
        fieldName: "code",
        formatFunction: (value: any, row: ITaskDetailEvidence) => row?.code || "",
      },
      {
        header: "Tên minh chứng dự kiến",
        fieldName: "name",
        formatFunction: (value: any, row: ITaskDetailEvidence) => row?.name || "",
      },
    ],
  };

  return (
    <>
      <AQButtonExportData
        objectName="Danh sách minh chứng dự kiến"
        data={data}
        loading={loading}
        exportConfig={exportConfig}
      />
    </>
  );
}
