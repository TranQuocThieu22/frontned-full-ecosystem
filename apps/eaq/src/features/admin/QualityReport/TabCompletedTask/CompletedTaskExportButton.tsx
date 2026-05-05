import { IReport } from "@/shared/interfaces/report/IReport";
import { MRT_TableInstance } from "mantine-react-table";
import {
    TaskDetailReportStatusEnumLabel,
    TaskDetailReportStatusEnum
} from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { QualityReportTrackingStatusEnumLabel } from "@/shared/constants/enum/QualityReportTrackingStatusEnum";
import { mapAndJoinStrings } from "../QualityReportFunctions";
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
                header: "Mã tiêu chuẩn",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code;
                }
            },
            {
                header: "Mã tiêu chí",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.code",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code;
                }
            },
            {
                header: "Mã yêu cầu",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.code",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.code;
                },
            },
            {
                header: "Tên yêu cầu",
                fieldName: "eaqTaskDetail.eaqAnalysis.eaqRequirement.name",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.name;
                }
            },
            {
                header: "Mã công việc",
                fieldName: "eaqTaskDetail.code",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.code;
                }
            },
            {
                header: "Nội dung công việc",
                fieldName: "eaqTaskDetail.note",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.note;
                }
            },
            {
                header: "Mã minh chứng dự kiến",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.code",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.code)
            },
            {
                header: "Tên minh chứng dự kiến",
                fieldName: "eaqTaskDetail.eaqTaskDetailEvidences.name",
                formatFunction: (value: any, row: IReport) => mapAndJoinStrings(row.eaqTaskDetail?.eaqTaskDetailEvidences, (item) => item.name)
            },
            {
                header: "Tên Đơn vị chủ trì",
                fieldName: "eaqTaskDetail.hostUnit.name",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.hostUnit?.name;
                }
            },
            {
                header: "Nhân sự phụ trách",
                fieldName: "eaqTaskDetail.user.fullName",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.user?.fullName;
                }
            },
            {
                header: "Tên đơn vị phối hợp",
                fieldName: "eaqTaskDetail.supportUnit",
                formatFunction: (value: any, object: IReport) => {
                    return object.eaqTaskDetail?.supportUnit;
                }
            },
            {
                header: "Lần báo cáo",
                fieldName: "order",
                formatFunction: (value: any, object: IReport) => {
                    return object.order;
                }
            },
            {
                header: "Ngày báo cáo",
                fieldName: "reportDate",
                formatFunction: (value: any, object: IReport) => {
                    return object.reportDate ? dateUtils.toDDMMYYYY(object.reportDate) : ""
                }
            },
            {
                header: "Trạng thái báo cáo",
                fieldName: "reportStatus",
                formatFunction: (value: any, object: IReport) => {
                    return TaskDetailReportStatusEnumLabel[object.reportStatus as keyof typeof QualityReportTrackingStatusEnumLabel];
                }
            },
            {
                header: "Đã nộp",
                fieldName: "submitted",
                formatFunction: (value: any, object: IReport) => {
                    return object.reportStatus == TaskDetailReportStatusEnum.IsSubmitted ? "True" : "False";
                }
            },
            {
                header: "Công việc đã thực hiện",
                fieldName: "result",
                formatFunction: (value: any, object: IReport) => {
                    return object.result;
                }
            }
        ],
    };

    return (
        <AQButtonExportData
            objectName={"Danh sách công việc cần thực hiện"}
            data={data}
            exportConfig={completedTaskExportConfig}
        />
    )
};
