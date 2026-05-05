import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    table: MRT_TableInstance<ITaskDetailAnalysis>;
    loading: boolean;
}

export default function AssuranceReportingCycleExport({ loading, table }: Props) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "standard.code",
                header: "Mã tiêu chuẩn",
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code
            },
            {
                fieldName: "criteria.code",
                header: "Mã tiêu chí",
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code
            },
            {
                fieldName: "requirement.code",
                header: "Mã yêu cầu",
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.eaqAnalysis?.eaqRequirement?.code
            },
            {
                fieldName: "requirement.name",
                header: "Tên yêu cầu",
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.eaqAnalysis?.eaqRequirement?.name
            },
            {
                fieldName: "code",
                header: "Mã công việc",
            },
            {
                fieldName: "name",
                header: "Tên công việc",
            },
            {
                fieldName: "hostingUnit",
                header: "Tên đơn vị chủ trì",
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.hostUnit ? `${row.hostUnit?.code} - ${row.hostUnit?.name}` : ""
            },
            {
                fieldName: "affiliatedPerson",
                header: "Nhân sự phụ trách",
                formatFunction: (value: any, row: ITaskDetailAnalysis) => row.user?.fullName
            },
            {
                fieldName: "reportCount",
                header: "Số lần báo cáo",
            },
            {
                fieldName: "supportUnit",
                header: "Tên đơn vị phối hợp",
            },
            {
                fieldName: "note",
                header: "Ghi chú",
            },
        ],
    };

    return (
        <AQButtonExportData
            loading={loading}
            objectName="DSCongViec"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
