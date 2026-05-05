import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<ILimitation>;
    loading?: boolean;
}

export default function AssignmentSummaryReportingExport({ loading, table }: Props) {
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
                header: 'Tên tiêu chí',
                fieldName: 'criteriaName',
                formatFunction: (value: any, row: ILimitation) => row?.eaqCriteria?.name || '',
            },
            {
                header: 'Mã yêu cầu',
                fieldName: 'limitationCode',
                formatFunction: (value: any, row: ILimitation) => row?.code || '',
            },
            {
                header: 'Tên yêu cầu',
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
            objectName="Danh sách phân công tổng hợp giải trình cuối chu kỳ"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
