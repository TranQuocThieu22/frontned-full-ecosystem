import { ICertification } from "@/shared/interfaces/certification/ICertification";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
  table: MRT_TableInstance<ICertification>;
  loading: boolean;
}

export default function AccreditationCertificateExport({ loading, table }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: 'Số giấy chứng nhận',
        fieldName: 'code',
        formatFunction: (value: any, row: ICertification) => row?.code,
      },
      {
        header: 'Ngày cấp GCN',
        fieldName: 'issuedDate',
        formatFunction: (value: any, row: ICertification) => dateUtils.toDDMMYYYY(row?.issuedDate),
      },
      {
        header: 'Đơn vị cấp GCN',
        fieldName: 'issuedUnit',
        formatFunction: (value: any, row: ICertification) => row?.issuedUnit,
      },
      {
        header: 'Mã CTĐT',
        fieldName: 'eaqPhase.eaqTrainingProgram.code',
        formatFunction: (value: any, row: ICertification) => row?.eaqPhase?.eaqTrainingProgram?.code,
      },
      {
        header: 'Mã bộ tiêu chuẩn',
        fieldName: 'eaqPhase.eaqTrainingProgram.eaqStandardSet.code',
        formatFunction: (value: any, row: ICertification) => row?.eaqPhase?.eaqTrainingProgram?.eaqStandardSet?.code,
      },
      {
        header: 'Mã giai đoạn kiểm định',
        fieldName: 'eaqPhase.code',
        formatFunction: (value: any, row: ICertification) => row?.eaqPhase?.code,
      },
      {
        header: 'Tên đơn vị quản lý',
        fieldName: 'eaqPhase.eaqTrainingProgram.department.name',
        formatFunction: (value: any, row: ICertification) => row?.eaqPhase?.eaqTrainingProgram?.department?.name,
      },
      {
        header: 'Thời gian thực hiện báo cáo tự đánh giá',
        fieldName: 'selfAssessmentTime',
        formatFunction: (value: any, row: ICertification) => row?.selfAssessmentTime,
      },
      {
        header: 'Thời gian thực hiện đánh giá ngoài',
        fieldName: 'externalAssessmentTime',
        formatFunction: (value: any, row: ICertification) => row?.externalAssessmentTime,
      },
    ],
  };

  return (
    <AQButtonExportData
      loading={loading}
      objectName="DSGiayChungNhan"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
