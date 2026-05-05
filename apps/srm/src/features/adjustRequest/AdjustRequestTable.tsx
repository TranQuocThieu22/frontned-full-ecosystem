'use client'
import { contractDetailService } from "@/shared/APIs/contractDetailService";
import { EnumProcessingStatus } from "@/shared/consts/enum/EnumProcessingStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { ContractExecuteStatusBadgeProps } from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useMemo } from "react";
import AdjustRequestCreateOrUpdateButton from "./AdjustRequestCreateOrUpdateButton";
import AdjustRequestImportButton from "./AdjustRequestImportButton";

export default function AdjustRequestTable() {
    const academicYearStore = useAcademicYearStore();
    const authenticateStore = useAuthenticateStore();
    const permissionStore = usePermissionStore()

    const contractDetailQuery = useCustomReactQuery({
        queryKey: ['contractDetailQuery', academicYearStore.state.academicYear?.id],
        axiosFn: () => contractDetailService.GetAllByAcademicYear({
            academicYearId: academicYearStore.state.academicYear?.id ?? 0,
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
        }
    })

    const columns = useMemo<CustomColumnDef<SRMContractDetail>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "srmContract.code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "srmContract.name",
            size: columnSizeObject.name,
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "srmContract.srmTopic.srmTopicMembers",
            accessorFn: (row) => row.srmContract?.srmTopic?.srmTopicMembers?.
                filter(item => item.srmTitle?.isLeader == true).map(item => item.user?.fullName),
            type: "list"
        },
        {
            header: "Số hợp đồng",
            accessorKey: "srmContract.contractNumber",
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "duration",
        },
        {
            header: "Từ tháng/ năm",
            accessorKey: "srmContract.fromDate",
            type: "MMyyyy",
        },
        {
            header: "Đến tháng/ năm",
            accessorKey: "srmContract.toDate",
            type: "MMyyyy",
        },
        {
            header: "Nội dung điều chỉnh",
            accessorKey: "amendmentContent",
            size: columnSizeObject.description,
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "srmContract.executionStatus",
            type: "statusBadge",
            statusBadgeProps: ContractExecuteStatusBadgeProps
        },
        {
            header: "File phiếu điều chỉnh",
            accessorKey: "attachmentPath",
            type: "viewFile"
        },
    ], []);

    const isLeader = (row: SRMContractDetail) => {
        if (permissionStore.state.isSuperAdmin) return true
        const sessionUserId = authenticateStore.state.userId;
        const leaderUser = row.srmContract?.srmTopic?.srmTopicMembers?.filter(item => item.srmTitle?.isLeader == true).map(item => item.user)
        if (leaderUser?.some(item => item?.id == sessionUserId)) {
            return true
        }
        return false
    };

    const isPending = (row: SRMContractDetail) => {
        if (row.processingStatus === EnumProcessingStatus.pending) {
            return true
        }
        return false
    };

    const isOwner = (row: SRMContractDetail) => {
        if (permissionStore.state.isSuperAdmin) return true
        const sessionUserId = authenticateStore.state.userId;
        const leaderUser = row?.createdBy;
        if (leaderUser == sessionUserId) {
            return true
        }
        return false
    }

    return (
        <CustomFieldset
            title="Danh sách đề tài yêu cầu điều chỉnh">
            <CustomDataTableAPI
                query={contractDetailQuery}
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={true}
                pinningRightColumns={['srmContract.executionStatus']}
                exportProps={{
                    fileName: "Danh sách đề tài yêu cầu điều chỉnh",
                }}
                deleteFn={contractDetailService.delete}
                deleteListFn={contractDetailService.deleteListIds}
                disableDelete={(row) => !(isLeader(row) && isPending(row) && isOwner(row))}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <AdjustRequestCreateOrUpdateButton />
                            <AdjustRequestImportButton />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    const canEdit = isLeader(row.original) && isPending(row.original) && isOwner(row.original)
                    return (
                        <>
                            <AdjustRequestCreateOrUpdateButton initValues={row.original!} actionType="viewDetail" />
                            {canEdit ? (
                                <AdjustRequestCreateOrUpdateButton initValues={row.original!} actionType="update" />
                            ) : (
                                <CustomActionIcon actionType="update" disabled />
                            )}
                        </>
                    )
                }}
            />
        </CustomFieldset>
    );
}

