import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";

interface Props {
    table: any
    disabled?: boolean
    requiedmentCode?: string
}

export default function DateReportingCycleExport({ table, disabled, requiedmentCode }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "requirementCode",
                header: "Mã yêu cầu",
                formatFunction: () => requiedmentCode
            },
            {
                fieldName: "task.code",
                header: "Mã công việc",
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.code
            },
            {
                fieldName: "task.name",
                header: "Tên công việc",
                size: 400,
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.name
            },
            {
                fieldName: "accountCode",
                header: "Mã tài khoản",
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.user?.code
            },
            {
                fieldName: "affiliatedPerson",
                header: "Nhân sự phụ trách",
                formatFunction: (value: any, row: any) => row.eaqTaskDetail?.user?.fullName
            },
            {
                fieldName: "order",
                header: "Lần báo cáo",
            },
            {
                fieldName: "reportDate",
                header: "Ngày báo cáo",
                formatFunction: (value: any) => dateUtils.toDDMMYYYY(value)
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
