import { topicService } from "@/shared/APIs/topicService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center } from "@mantine/core";
import { useMemo } from "react";
import ApplicantRegistrationReviewUpdate from "./ApplicantRegistrationReviewUpdate";
import ApplicantRegistrationReviewView from "./ApplicantRegistrationReviewView";
import { ApplicantRegistrationStatusBadge } from "./ApplicantRegistrationStatusBadge";


export default function ApplicantRegistrationReviewTable() {
    const store = useAcademicYearStore();
    const getAllTopicQuery = useCustomReactQuery({
        queryKey: ["getAllTopicQuery_GetAll"],
        axiosFn: () => topicService.getAllByAcademicYear({
            AcademicYearId: store.state.academicYear?.id || -1
        }),
    });

    const column = useMemo<CustomColumnDef<SRMTopic>[]>(() => [
        {
            header: "Mã đăng ký",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "registerName",
            size: columnSizeObject.name
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "duration"
        },
        {
            header: "Từ tháng/năm",
            accessorKey: "fromDate",
            type: "MMyyyy"
        },
        {
            header: "Đến tháng/năm",
            accessorKey: "toDate",
            type: "MMyyyy"
        },
        {
            header: "Tổng kinh phí thực hiện (VNĐ)",
            accessorKey: "totalCost",
            type: "currency",
            size: 200
        },
        {
            header: "Lĩnh vực",
            accessorKey: "area",
            accessorFn: (row) => row.srmArea?.name
        },
        {
            header: "Loại đề tài",
            accessorKey: "type",
            accessorFn: (row) => row.srmType?.name
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "SRMTopicLeader",
            size: 300,
            accessorFn: (row) => row.srmTopicMembers
                ?.flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : []))
                .join(", ") ?? ""
        },
        {
            header: "File thuyết minh",
            accessorKey: "attachmentPath",
            type: "viewFile"
        },
        {
            header: "Trạng thái kiểm tra",
            accessorKey: "preliminaryStatus",
            Cell: ({ row }) => <Center><ApplicantRegistrationStatusBadge status={row.original.preliminaryStatus || -1} /></Center>,
            size: 300
        },
        {
            header: "Nhận xét",
            accessorKey: "preliminaryReview",
            size: 300
        },
        {
            header: "Gửi thông báo",
            accessorKey: "preliminaryIsSentMail",
            type: "squareCheck"
        },
    ], []);

    return (
        <CustomDataTableAPI
            columns={column}
            query={getAllTopicQuery}
            pinningRightColumns={['preliminaryStatus']}
            enableRowSelection
            exportProps={{
                fileName: "Danh sách đăng ký tuyển chọn"
            }}
            renderRowActions={({ row }) => (
                <>
                    <ApplicantRegistrationReviewView data={row.original} loading={getAllTopicQuery.isFetching} />
                    <ApplicantRegistrationReviewUpdate
                        data={row.original}
                        loading={getAllTopicQuery.isFetching}
                    />
                </>
            )}
        />
    )
}
