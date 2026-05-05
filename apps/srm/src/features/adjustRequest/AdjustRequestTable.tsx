'use client'
import { contractDetailService } from "@/shared/APIs/contractDetailService";
import { EnumProcessingStatus } from "@/shared/consts/enum/EnumProcessingStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_ContractExecuteStatusBadge from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AdjustRequestCreateOrUpdateButton from "./AdjustRequestCreateOrUpdateButton";
import AdjustRequestDeleteButton from "./AdjustRequestDeleteButton";
import AdjustRequestDeleteListButton from "./AdjustRequestDeleteListButton";
import AdjustRequestExportButton from "./AdjustRequestExportButton";
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

    const columns = useMemo<MRT_ColumnDef<SRMContractDetail>[]>(() => [
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
            accessorKey: "custom_leaderName",
            accessorFn: (row) => row.srmContract?.srmTopic?.srmTopicMembers?.
                filter(item => item.srmTitle?.isLeader == true).map(item => item.user?.fullName).join(", ")
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
            accessorFn: (row) => dateUtils.toMMYYYY(row.srmContract?.fromDate)
        },
        {
            header: "Đến tháng/ năm",
            accessorKey: "srmContract.toDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row.srmContract?.toDate)
        },
        {
            header: "Nội dung điều chỉnh",
            accessorKey: "amendmentContent",
            size: columnSizeObject.description,
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "srmContract.executionStatus",
            accessorFn: (row) => <Shared_ContractExecuteStatusBadge value={row.srmContract?.executionStatus ?? 0} />
        },
        {
            header: "File phiếu điều chỉnh",
            accessorKey: "attachmentPath",
            accessorFn: (row) => <CustomButtonViewFileAPI filePath={row.attachmentPath} />
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

    const canDeleteList = (selectedRows: SRMContractDetail[]) => {
        return selectedRows.length === 0 || selectedRows.some(row =>
            row.processingStatus != EnumProcessingStatus.pending || !isLeader(row) || !isOwner(row)
        )
    }

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
            <CustomDataTable
                isLoading={contractDetailQuery.isLoading}
                isError={contractDetailQuery.isError}
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={true}
                data={contractDetailQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)
                    const disableDeleteList = canDeleteList(selectedRows)
                    return <>
                        <AdjustRequestCreateOrUpdateButton />
                        <AdjustRequestImportButton />
                        <AdjustRequestExportButton table={table} />
                        <AdjustRequestDeleteListButton
                            table={table}
                            disabled={disableDeleteList}
                        />
                    </>
                }}
                renderRowActions={({ row }) => {
                    if (isLeader(row.original) && isPending(row.original) && isOwner(row.original))
                        return (
                            <CustomCenterFull>
                                <AdjustRequestCreateOrUpdateButton initValues={row.original!} actionType="viewDetail" />
                                <AdjustRequestCreateOrUpdateButton initValues={row.original!} actionType="update" />
                                <AdjustRequestDeleteButton id={row.original.id!} code={row.original?.srmContract?.code!} />
                            </CustomCenterFull>
                        )
                    return (
                        <CustomCenterFull>
                            <AdjustRequestCreateOrUpdateButton initValues={row.original!} actionType="viewDetail" />
                            <CustomActionIcon actionType="update" disabled />
                            <CustomActionIcon actionType="delete" disabled />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    );
}

