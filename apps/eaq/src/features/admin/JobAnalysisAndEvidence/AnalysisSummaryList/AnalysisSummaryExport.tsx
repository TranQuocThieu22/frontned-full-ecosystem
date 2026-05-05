import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<ITaskDetail>;
  loading: boolean;
}
export default function AnalysisSummaryExport({ loading, table }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: 'Mã tiêu chuẩn',
        fieldName: 'eaqAnalysis.eaqLimitation.eaqCriteria.eaqStandard.code',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code,
      },
      {
        header: 'Mã tiêu chí',
        fieldName: 'eaqAnalysis.eaqLimitation.eaqCriteria.code',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code,
      },
      {
        header: 'Tên tiêu chí',
        fieldName: 'eaqAnalysis.eaqLimitation.eaqCriteria.name',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.name,
      },
      {
        header: 'Mã hạn chế',
        fieldName: 'eaqAnalysis.eaqLimitation.code',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.eaqLimitation?.code,
      },
      {
        header: 'Tên hạn chế',
        fieldName: 'eaqAnalysis.eaqLimitation.name',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.eaqLimitation?.name,
      },
      {
        header: 'Mã phân tích',
        fieldName: 'eaqAnalysis.code',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.code,
      },
      {
        header: 'Nội dung phân tích',
        fieldName: 'eaqAnalysis.description',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.description,
      },
      {
        header: 'Câu hỏi phân tích',
        fieldName: 'eaqAnalysis.question',
        formatFunction: (value: any, row: ITaskDetail) => row.eaqAnalysis?.question,
      },
      {
        header: 'Mã công việc',
        fieldName: 'code',
        formatFunction: (value: any, row: ITaskDetail) => row.code,
      },
      {
        header: 'Tên công việc',
        fieldName: 'name',
        formatFunction: (value: any, row: ITaskDetail) => row.name,
      },
      {
        header: 'Minh chứng dự kiến',
        fieldName: 'eaqTaskDetailEvidences',
        formatFunction: (value: any, row: ITaskDetail) => {
          const questions = row.eaqTaskDetailEvidences || [];
          //   {eaqExpectedEvidenceCode: 'mc1', eaqExpectedEvidenceName: 'Minh chung 1'},
          //   {eaqExpectedEvidenceCode: 'mc2', eaqExpectedEvidenceName: 'Minh chung 2'},
          // ]
          return questions.map((q) => q.code + " - " + q.name).join('; \n')
        },
      },
    ],
  };

  return (
    <AQButtonExportData
      loading={loading}
      objectName="Danh sách tổng hợp phân tích"
      data={data}
      exportConfig={exportConfig}
    />
  );
}

