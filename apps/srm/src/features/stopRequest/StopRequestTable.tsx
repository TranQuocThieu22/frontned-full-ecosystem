'use client'
import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { EnumColorContractExecutionStatus, EnumIconContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumColorContractSuppendType, EnumIconContractSuppendType, EnumLabelContractSuppendType } from "@/shared/consts/enum/EnumContractSuppendType";
import { EnumProcessingStatus } from "@/shared/consts/enum/EnumProcessingStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StopRequestCreateOrUpdate from "./StopRequestCreateOrUpdate";
import StopRequestDeleteButton from "./StopRequestDeleteButton";
import StopRequestDeleteListButton from "./StopRequestDeleteListButton";
import StopRequestExportButton from "./StopRequestExportButton";
import StopRequestImportButton from "./StopRequestImportButton";
import StopRequestView from "./StopRequestView";

export default function StopRequestTable() {
    const academicYearStore = useAcademicYearStore();
    const authenticateStore = useAuthenticateStore()
    const contractDetailQuery = useCustomReactQuery({
        queryKey: ['contractDetailQuery', academicYearStore.state.academicYear?.id],
        axiosFn: () => contractSuspendService.GetAllByAcademicYear({
            academicYearId: academicYearStore.state.academicYear?.id ?? 0,
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id,
            placeholderData: (prevData, prevQuery) => prevData
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMContractSuspend>[]>(() => [
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
            accessorKey: "srmContract.duration",
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
            header: "Lý do hủy",
            accessorKey: "reason",
            size: columnSizeObject.description,
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "srmContract.executionStatus",
            size: 200,
            Cell: ({ row }) => <CustomEnumBadge
                value={row?.original?.srmContract?.executionStatus}
                enumLabel={EnumLabelContractExecutionStatus}
                enumColor={EnumColorContractExecutionStatus}
                enumIcon={EnumIconContractExecutionStatus}
            />
        },
        {
            header: "Loại yêu cầu dừng thực hiện",
            accessorKey: "type",
            size: 200,
            Cell: ({ row }) => <CustomEnumBadge
                value={row?.original?.type}
                enumLabel={EnumLabelContractSuppendType}
                enumColor={EnumColorContractSuppendType}
                enumIcon={EnumIconContractSuppendType}
            />
        },
        {
            header: "File tờ trình xin tạm dừng/ đình chỉ",
            accessorKey: "attachmentPath",
            accessorFn: (row) => <CustomButtonViewFileAPI filePath={row.attachmentPath} />
        },
    ], []);
    const isLeader = (row: SRMContractSuspend) => {
        const sessionUserId = authenticateStore.state.userId;
        const leaderUser = row.srmContract?.srmTopic?.srmTopicMembers?.filter(item => item.srmTitle?.isLeader == true).map(item => item.user)
        if (leaderUser?.some(item => item?.id == sessionUserId)) {
            return true
        }
        return false
    };
    const isPending = (row: SRMContractSuspend) => {
        if (row.processingStatus === EnumProcessingStatus.pending) {
            return true
        }
        return false
    };

    return (
        <CustomFieldset
            title="Danh sách yêu cầu hủy thực hiện đề tài"
        >
            <CustomDataTable
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={false}
                isLoading={contractDetailQuery.isLoading}
                isError={contractDetailQuery.isError}
                data={contractDetailQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <CustomCenterFull>
                            <StopRequestCreateOrUpdate />
                            <StopRequestImportButton />
                            <StopRequestExportButton table={table} />
                            <StopRequestDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)} table={table} />
                        </CustomCenterFull>
                    );
                }}
                renderRowActions={({ row }) => {
                    if (isLeader(row.original) && isPending(row.original)) return (
                        <CustomCenterFull>
                            <StopRequestView values={row.original} />
                            <StopRequestCreateOrUpdate initValues={row.original} />
                            <StopRequestDeleteButton id={row.original.id!} code={row.original?.srmContract?.code!} />
                        </CustomCenterFull>
                    )
                    return (
                        <CustomCenterFull>
                            <StopRequestView values={row.original} />
                            <CustomActionIcon actionType="update" disabled />
                            <CustomActionIcon actionType="delete" disabled />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    );
}