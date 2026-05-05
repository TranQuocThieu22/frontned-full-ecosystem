import { documentTypeEnumLabel } from "@/shared/constants/enum/DocumentTypeEnum";
import { IExternalAssessment } from "@/shared/interfaces/externalAssessment/IExternalAssessment";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";

interface Props {
  table: MRT_TableInstance<IExternalAssessment>;
  loading: boolean;
}

export default function ExternalAssessmentManagementExport({ loading, table }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: 'Số văn bản',
        fieldName: 'code',
        formatFunction: (value: any, row: IExternalAssessment) => row?.code,
      },
      {
        header: 'Ngày văn bản',
        fieldName: 'documentDate',
        formatFunction: (value: any, row: IExternalAssessment) => dateUtils.toDDMMYYYY(row?.documentDate),
      },
      {
        header: 'Mã CTĐT',
        fieldName: 'eaqTrainingProgram.code',
        formatFunction: (value: any, row: IExternalAssessment) => row?.eaqPhase?.eaqTrainingProgram?.code,
      },
      {
        header: 'Tên CTĐT',
        fieldName: 'eaqTrainingProgram.name',
        formatFunction: (value: any, row: IExternalAssessment) => row?.eaqPhase?.eaqTrainingProgram?.name,
      },
      {
        header: 'Mã giai đoạn đánh giá',
        fieldName: 'eaqPhase.code',
        formatFunction: (value: any, row: IExternalAssessment) => row?.eaqPhase?.code,
      },
      {
        header: 'Tên văn bản',
        fieldName: 'name',
        formatFunction: (value: any, row: IExternalAssessment) => row?.name,
      },
      {
        header: 'Loại văn bản',
        fieldName: 'documentType',
        formatFunction: (value: any, row: IExternalAssessment) => converterUtils.getLabelByValue(documentTypeEnumLabel, row?.documentType),
      },
    ],
  };

  return (
    <AQButtonExportData
      loading={loading}
      objectName="DSHoSoLienQuanDanhGiaNgoai"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
