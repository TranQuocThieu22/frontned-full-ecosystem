import { MRT_TableInstance } from "mantine-react-table";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

interface Props {
  table: MRT_TableInstance<ILimitation>;
  loading?: boolean;
}

export default function QualityImprovementConstraintExport({ loading, table }: Props) {
  const { data } = useExportData(table);
  const exportConfig = {
    fields: [
      {
        header: 'Mã tiêu chuẩn',
        fieldName: 'standardCode',
        formatFunction: (value: any, row: ILimitation) => row?.eaqCriteria?.eaqStandard?.code || '',
      },
      {
        header: 'Mã tiêu chí',
        fieldName: 'criteriaCode',
        formatFunction: (value: any, row: ILimitation) => row?.eaqCriteria?.code || '',
      },
      {
        header: 'Mã hạn chế',
        fieldName: 'limitationCode',
        formatFunction: (value: any, row: ILimitation) => row?.code || '',
      },
      {
        header: 'Tên hạn chế',
        fieldName: 'limitationName',
        formatFunction: (value: any, row: ILimitation) => row?.name || '',
      },

      {
        header: 'Đơn vị chủ trì',
        fieldName: 'hostUnit',
        formatFunction: (value: any, row: ILimitation) => row?.hostUnit?.name || '',
      },
      {
        header: 'Nhân sự phụ trách',
        fieldName: 'fullName',
        formatFunction: (value: any, row: ILimitation) => row?.user?.fullName || '',
      },
    ],
  };


  return (
    <AQButtonExportData
      loading={loading}
      objectName="Danh sách phân công tổng hợp cải tiến chất lượng theo hạn chế"
      data={data}
      exportConfig={exportConfig}
    />
  );
}
