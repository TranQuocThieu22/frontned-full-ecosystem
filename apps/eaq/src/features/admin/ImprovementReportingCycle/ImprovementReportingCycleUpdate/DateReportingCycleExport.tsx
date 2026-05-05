import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    table: any
    disabled?: boolean
}

export default function DateReportingCycleExport({ table, disabled }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "weaknessCode",
                header: "Mã hạn chế",
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code
            },
            {
                fieldName: "jobCode",
                header: "Mã công việc",
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.eaqAnalysis?.code
            },
            {
                fieldName: "jobName",
                header: "Tên công việc",
                size: 500,
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.eaqAnalysis?.name
            },
            {
                fieldName: "userCode",
                header: "Mã người dùng",
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.user?.code
            },
            {
                fieldName: "assignedPerson",
                header: "Nhân sự phụ trách",
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.user?.fullName
            },
            {
                fieldName: "order",
                header: "Lần báo cáo"
            },
            {
                fieldName: "reportDate",
                header: "Ngày báo cáo",
                formatFunction: (value: any, row: any) => dateUtils.toDDMMYYYY(row.reportDate)
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName="Danh sách ngày báo cáo"
            data={data}
            disabled={disabled}
            exportConfig={exportConfig}
        />
    );
}
