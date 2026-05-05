import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_ContractExecuteStatusBadge from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import Shared_ReportHistoryReviewStatusBadge from "@/shared/features/ReportHistory/Shared_ReportHistoryReviewStatusBadge";
import Shared_ReportHistorySubmittedTypeBadge from "@/shared/features/ReportHistory/Shared_ReportHistorySubmittedTypeBadge";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useMemo } from "react";
import ProgressCheckUpdateStatus from "../progressCheck/ProgressCheckUpdateStatus";
import ProgressReportUpdate from "./ProgressReportUpdate";

export default function ProgressReportTable({ isProgressCheck }: { isProgressCheck: boolean }) {
    const academicYearStore = useAcademicYearStore()
    const permissionStore = usePermissionStore()
    const authenticateStore = useAuthenticateStore()
    const columns = useMemo<CustomColumnDef<SRMContractReportHistory>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "srmContract.code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "srmContract.name",
            size: columnSizeObject.name
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "leaderName",
            accessorFn: (row) => row.srmContract?.srmTopic?.srmTopicMembers?.find(item => item.srmTitle?.isLeader)?.user?.fullName
        },
        {
            header: "Đơn vị chủ trì",
            accessorKey: "srmContract.srmTopic.hostOrganization",
        },
        {
            header: "Thời gian thực hiện (Tháng)",
            accessorKey: "srmContract.duration",
        },
        {
            header: "Từ tháng/ năm",
            accessorKey: "srmContract.fromDate",
            type: "ddMMyyyy"
        },
        {
            header: "Đến tháng/ năm",
            accessorKey: "srmContract.toDate",
            type: "ddMMyyyy"
        },
        {
            header: "Tổng kinh phí (VNĐ)",
            accessorKey: "srmContract.totalCost",
            type: "currency"
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmContract.srmType.name",
        },
        {
            header: "Trạng thái báo cáo",
            accessorKey: "submittedType",
            accessorFn: (row) => <Shared_ReportHistorySubmittedTypeBadge value={row.submittedType} />
        },
        {
            header: "Ngày báo cáo",
            accessorKey: "reportDate",
            type: 'ddMMyyyy'
        },
        {
            header: "Tiến độ thực hiện (%)",
            accessorKey: "implementationProgress"
        },
        {
            header: "Trạng thái kiểm tra",
            accessorKey: "reviewStatus",
            accessorFn: (row) => <Shared_ReportHistoryReviewStatusBadge value={row.reviewStatus} />

        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "executionStatus",
            accessorFn: (row) => <Shared_ContractExecuteStatusBadge value={row.srmContract?.executionStatus!} />
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        },
        {
            header: "Nhận xét",
            accessorKey: "review",
        },
        {
            header: "Đã gửi mail",
            accessorKey: "isSendMail",
            type: "squareCheck"
        }

    ], [])
    const query = useCustomReactQuery({
        queryKey: ['historyReports', academicYearStore.state.academicYear?.id],
        axiosFn: () => contractService.getContractReportHistoryYear({ AcademicYearId: academicYearStore.state.academicYear?.id! })
    })
    const isOwner = (row: SRMContractReportHistory) => {
        if (permissionStore.state.isSuperAdmin) return true
        const sessionUserId = authenticateStore.state.userId;
        const leaderUser = row.srmContract?.srmTopic?.srmTopicMembers?.filter(item => item.srmTitle?.isLeader == true).map(item => item.user)
        if (leaderUser?.some(item => item?.id == sessionUserId)) {
            return true
        }
        return false
    };

    return (
        <CustomDataTableAPI
            {...(isProgressCheck ? ({}) : { hiddenColumns: ['reviewStatus', 'review', 'implementationProgress', 'isSendMail', 'note'] })}
            pinningRightColumns={['reviewStatus']}
            enableRowSelection
            columns={columns}
            query={query}
            exportProps={{
                fileName: "Danh sách đăng ký tuyển chọn"
            }}
            renderRowActions={({ row }) => (
                <CustomCenterFull>
                    <CustomFlexRow >
                        {!isProgressCheck && <ProgressReportUpdate readOnly historyReport={row.original} />}
                        {isOwner(row.original) && <ProgressReportUpdate readOnly={isProgressCheck} historyReport={row.original} />}
                        {isProgressCheck && <ProgressCheckUpdateStatus values={row.original} />}
                    </CustomFlexRow>
                </CustomCenterFull>
            )}
        />
    )
}

