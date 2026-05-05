import { IReport } from "@/shared/interfaces/report/IReport";
import {
    TaskDetailReportStatusEnumLabel,
    TaskDetailReportStatusEnum
} from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { MRT_TableInstance } from "mantine-react-table";
import { mapAndJoinStrings } from "../PeriodicQualityImprovementReportFunctions";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";


interface Props {
    table: MRT_TableInstance<IReport>;
}

export default function CompletedTaskExportButton({ table }: Props) {
    const { data } = useExportData(table);

    const completedTaskExportConfig = {
        fields: [
            {
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.code",
                header: "Mã tiêu chí",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code
            },
            {
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.name",
                header: "Tên tiêu chí",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.name
            },
            {
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqLimitation.code",
                header: "Mã hạn chế",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code
            },
            {
                fieldName: "eaqTaskDetail.code", header: "Mã công việc",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.code

            },
            {
                fieldName: "eaqTaskDetail.name", header: "Tên công việc",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.name
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.code",
                header: "Mã minh chứng dự kiến",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.code)
            },
            {
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.name",
                header: "Tên minh chứng dự kiến",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.name)
            },
            {
                fieldName: "eaqTaskDetail.duration",
                header: "Thời hạn",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.duration
            },
            {
                fieldName: "eaqTaskDetail.expectedResult",
                header: "Kết quả dự kiến",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.expectedResult
            },
            {
                fieldName: "eaqTaskDetail.user.fullName", header: "Nhân sự phụ trách",
                formatFunction: (value: any, row: IReport) => row.eaqTaskDetail?.user?.fullName
            },
            {
                fieldName: "order",
                header: "Lần báo cáo",
                formatFunction: (value: any, row: IReport) => row.order
            },
            {
                fieldName: "reportDate",
                header: "Ngày hết hạn",
                formatFunction: (value: any, row: IReport) => dateUtils.toDDMMYYYY(row.reportDate)
            },
            {
                fieldName: "reportStatus", header: "Trạng thái báo cáo",
                formatFunction: (value: any, row: IReport) => TaskDetailReportStatusEnumLabel[row.reportStatus as TaskDetailReportStatusEnum]
            },
            {
                fieldName: "summitted", header: "Đã nộp",
                formatFunction: (value: any, row: IReport) => row.reportStatus == TaskDetailReportStatusEnum.IsSubmitted ? "Có" : "Không"
            },
            { fieldName: "result", header: "Kết quả cải tiến" },

            {
                fieldName: "eaqTaskDetail.eaqEvidence.code",
                header: "Mã minh chứng",
                formatFunction: (value: any, row: IReport) => {
                    if (!row.eaqTaskDetail?.eaqTaskDetailEvidences) {
                        return row.eaqTaskDetail?.eaqEvidence?.code
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.code)
                }
            },
            {
                fieldName: "eaqTaskDetail.eaqEvidence.name",
                header: "Tên minh chứng",
                formatFunction: (value: any, row: IReport) => {
                    if (!row.eaqTaskDetail?.eaqTaskDetailEvidences) {
                        return row.eaqTaskDetail?.eaqEvidence?.name
                    }

                    return mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.eaqEvidence?.name)
                }
            },
        ],
    };

    return (
        <AQButtonExportData
            objectName={"Danh sách minh chứng"}
            data={data}
            exportConfig={completedTaskExportConfig}
        />
    )
};
