import { MRT_TableInstance } from "mantine-react-table";
import { IReport } from "@/shared/interfaces/report/IReport";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    table: MRT_TableInstance<IReport>;
    loading?: boolean;
}

export default function PeriodicImprovementReportExport({ loading, table }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã tiêu chí',
                fieldName: 'criteriaCode',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code || '',
            },
            {
                header: 'Tên tiêu chí',
                fieldName: 'criteriaName',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.name || '',
            },
            {
                header: 'Mã hạn chế',
                fieldName: 'limitationCode',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code || '',
            },

            {
                header: 'Mã công việc',
                fieldName: 'taskCode',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.code || '',
            },
            {
                header: 'Tên công việc',
                fieldName: 'taskName',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.name || '',
            },
            {
                header: 'Đơn vị chủ trì',
                fieldName: 'hostUnit',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.hostUnit?.user?.fullName || '',
            },
            {
                header: 'Đơn vị phối hợp',
                fieldName: 'supportUnit',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.supportUnit || '',
            },
            {
                header: 'Loại hạn chế',
                fieldName: 'note',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.limitationType || '',
            },
            {
                header: 'Nhân sự phụ trách',
                fieldName: 'fullName',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.user?.fullName || '',
            },
            {
                header: 'Lần báo cáo',
                fieldName: 'reportCount',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.reportCount,
            },
            {
                header: 'Ngày báo cáo',
                fieldName: 'reportDate',
                formatFunction: (value: any, row: IReport) => dateUtils.toDDMMYYYY(row.reportDate) || '',
            },
            {
                header: 'Trạng thái báo cáo(1= đã nộp; 2= còn hạn; 3= trễ hạn)',
                fieldName: 'reportStatus',
                formatFunction: (value: any, row: IReport) => row?.reportStatus || '',
            },

            {
                header: 'Kết quả cải tiến',
                fieldName: 'expectedResult',
                formatFunction: (value: any, row: IReport) => row?.eaqTaskDetail?.expectedResult || '',
            },
            {
                header: 'Đã nhắc nhở',
                fieldName: 'isReminded',
                formatFunction: (value: any, row: IReport) => row?.isReminded || '',
            },
        ],
    };


    return (
        <AQButtonExportData
            loading={loading}
            objectName="Ds Theo dõi thực hiện báo cáo kết quả cải tiến chất lượng định kỳ"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
