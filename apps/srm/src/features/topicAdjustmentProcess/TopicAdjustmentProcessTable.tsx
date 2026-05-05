import { contractDetailService } from "@/shared/APIs/contractDetailService";
import { EnumColorContractExecutionStatus, EnumIconContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumColorProcessingStatus, EnumIconProcessingStatus, EnumLabelProcessingStatus } from "@/shared/consts/enum/EnumProcessingStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Center } from "@mantine/core";
import { useMemo } from "react";
import { DisplayEnumBadge } from "../submitMissionReport/DisplayEnumBadge";
import TopicAdjustmentProcessUpdate from "./TopicAdjustmentProcessUpdate";
import TopicAdjustmentProcessView from "./TopicAdjustmentProcessView";

export default function TopicAdjustmentProcessTable() {
    const store = useAcademicYearStore();
    const topicAdjustmentProcessQuery = useCustomReactQuery({
        queryKey: ["topicAdjustmentProcessQuery_GetAll"],
        axiosFn: () => contractDetailService.GetAllByAcademicYear({
            academicYearId: store.state.academicYear?.id ?? -1,
        }),
    });

    const column = useMemo<CustomColumnDef<SRMContractDetail>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
            accessorFn: row => row.srmContract?.code,
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            accessorFn: row => row.srmContract?.name,
            size: columnSizeObject.name
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "SRMTopicLeader",
            accessorFn: row => row.srmContract?.srmTopic
                ?.srmTopicMembers?.flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : [])).join(", ") ?? "",
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "duration"
        },
        {
            header: "Từ tháng/năm",
            accessorKey: "srmContract.fromDate",
            type: "MMyyyy"
        },
        {
            header: "Đến tháng/năm",
            accessorKey: "srmContract.toDate",
            type: "MMyyyy"
        },
        {
            header: "Nội dung điều chỉnh",
            accessorKey: "amendmentContent",
            size: columnSizeObject.description
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "executionStatus",
            size: 200,
            accessorFn: (row) => converterUtils.getLabelByValue(EnumLabelContractExecutionStatus, row.srmContract?.executionStatus),
            Cell: ({ row }) => <Center>
                <DisplayEnumBadge
                    enumStatus={row.original.srmContract?.executionStatus}
                    enumLabel={EnumLabelContractExecutionStatus}
                    enumIcon={EnumIconContractExecutionStatus}
                    enumColor={EnumColorContractExecutionStatus} />
            </Center>
        },
        {
            header: "File phiếu điều chỉnh",
            accessorKey: "attachmentPath",
            type: "viewFile"
        },
        {
            header: "Trạng thái xử lý",
            accessorKey: "processingStatus",
            size: 200,
            accessorFn: (row) => converterUtils.getLabelByValue(EnumLabelProcessingStatus, row.processingStatus),
            Cell: ({ row }) => <Center>
                <DisplayEnumBadge
                    enumStatus={row.original.processingStatus}
                    enumLabel={EnumLabelProcessingStatus}
                    enumIcon={EnumIconProcessingStatus}
                    enumColor={EnumColorProcessingStatus} />
            </Center>
        },
        {
            header: "Tóm tắt xử lý",
            accessorKey: "processingSummary",
            size: columnSizeObject.description
        },
        {
            header: "File xử lý yêu cầu điều chỉnh",
            accessorKey: "processingAttachmentPath",
            type: "viewFile"
        },
    ], []);



    return (
        <CustomDataTableAPI
            pinningRightColumns={['processingStatus']}
            columns={column}
            query={topicAdjustmentProcessQuery}
            enableRowSelection
            exportProps={{
                fileName: "Danh sách yêu cầu điều chỉnh"
            }}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <TopicAdjustmentProcessView data={row.original} loading={topicAdjustmentProcessQuery.isFetching} />
                    <TopicAdjustmentProcessUpdate data={row.original} loading={topicAdjustmentProcessQuery.isFetching} />
                </CustomCenterFull>
            )}
        />
    )
}
