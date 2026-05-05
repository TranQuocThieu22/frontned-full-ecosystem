import { IAssessmentCouncilDecision } from "@/shared/interfaces/assessmentCouncilDecision/IAssessmentCouncilDecision";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
  table: MRT_TableInstance<IAssessmentCouncilDecision>;
}

export default function AssessmentCouncilDecisionExport({ table }: Props) {
  const { data } = useExportData(table);

  const exportConfig = {
    fields: [
      {
        fieldName: 'code',
        header: 'Số Quyết định'
      },
      {
        fieldName: 'decisionDate',
        header: 'Ngày Quyết định',
        formatFunction: (value: any) => dateUtils.toDDMMYYYY(value)
      },
      {
        fieldName: 'name',
        header: 'Tên Quyết định',
      },
      {
        fieldName: 'eaqTrainingProgram',
        header: 'Chương trình Đào tạo áp dụng',
        formatFunction: (value: any, row: any) => row.eaqPhase?.eaqStandardSetTrainingProgram?.eaqTrainingProgram?.name,
      },
      {
        fieldName: 'eaqPhase',
        header: 'Mã giai đoạn',
        formatFunction: (value: any) => value?.code
      },
      {
        fieldName: 'signerName',
        header: 'Người ký'
      },
    ],
  };

  return (
    <AQButtonExportData
      objectName="Danh sách Quyết định thành lập hội đồng tự đánh giá"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
