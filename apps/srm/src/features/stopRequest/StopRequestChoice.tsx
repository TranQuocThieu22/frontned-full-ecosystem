import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { EnumColorContractExecutionStatus, EnumIconContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumColorEnumSubmittedType, EnumLabelEnumSubmittedType } from "@/shared/consts/enum/EnumSubmittedType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { DisplayEnumBadge } from "./DisplayEnumBadge";
import StopRequestChoiceExportButton from "./StopRequestChoiceExportButton";

interface IProps {
    form: UseFormReturnType<SRMContractDetail>;
    disclosure: ReturnType<typeof useDisclosure>;
    onSelect: (contract: SRMContract) => void;
}

export default function StopRequestChoice({ form, disclosure, onSelect }: IProps) {
    const academicYearStore = useAcademicYearStore();
    const permissionStore = usePermissionStore()
    const authenticateStore = useAuthenticateStore()
    const contractSuspenAmendmentQuery = useCustomReactQuery({
        queryKey: ['contractSuspenAmendmentQuery', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return contractSuspendService.GetContractAmendment({
                academicYearId: academicYearStore?.state?.academicYear?.id ?? 0
            });
        },
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    });

    const [selectedContractId, setSelectedContractId] = useState<number | null>(null);

    const columns = useMemo<MRT_ColumnDef<SRMContract>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            size: columnSizeObject.name,
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "custom_leaderName",
            accessorFn: (row) =>
                row?.srmTopic?.srmTopicMembers
                    ?.filter((item) => item.srmTitle?.isLeader === true)
                    .map((item) => item.user?.fullName)
                    .join(", "),
        },
        {
            header: "Đơn vị chủ trì",
            accessorKey: "srmTopic.hostOrganization",
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "duration",
        },
        {
            header: "Từ tháng/năm",
            accessorKey: "fromDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row?.fromDate),
        },
        {
            header: "Đến tháng/năm",
            accessorKey: "toDate",
            accessorFn: (row) => dateUtils.toMMYYYY(row?.toDate),
        },
        {
            header: "Tổng kinh phí (VNĐ)",
            accessorKey: "totalCost",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost),
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmType.name",
        },
        {
            header: "Trạng thái báo cáo",
            accessorKey: "submittedType",
            Cell: ({ row }) => {
                const firstHistory = row.original?.srmContractReportHistories?.[0];
                return firstHistory ? <DisplayEnumBadge
                    enumStatus={firstHistory?.submittedType}
                    enumLabel={EnumLabelEnumSubmittedType}
                    enumColor={EnumColorEnumSubmittedType} /> : <></>;
            }
        },
        {
            header: "Ngày báo cáo",
            accessorKey: "srmContractReportHistories.reportDate",
            accessorFn: (row) => row?.srmContractReportHistories ? dateUtils.toDDMMYYYY(row.srmContractReportHistories[0]?.reportDate) : "",
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "executionStatus",
            Cell: ({ row }) => <DisplayEnumBadge
                enumStatus={row?.original?.executionStatus ?? 1}
                enumLabel={EnumLabelContractExecutionStatus}
                enumColor={EnumColorContractExecutionStatus}
                enumIcon={EnumIconContractExecutionStatus} />
        },
    ], []);

    return (
        <CustomButtonModal
            isActionIcon
            modalProps={{
                size: "80%",
                title: "Danh sách đề tài"
            }}
            actionIconProps={{
                children: <IconSearch size="2xl" />
            }}
            disclosure={disclosure}
        >
            <CustomDataTable
                isLoading={contractSuspenAmendmentQuery.isLoading}
                isError={contractSuspenAmendmentQuery.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                columns={columns}
                data={contractSuspenAmendmentQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <StopRequestChoiceExportButton data={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)} />
                    );
                }}
                renderRowActions={({ row }) => {
                    const isSelected = selectedContractId === (row.original.id ?? undefined);
                    const isLeader = row.original?.srmTopic?.srmTopicMembers?.some(
                        member => member.srmTitle?.isLeader === true &&
                            member.userId == authenticateStore.state.userId
                    );
                    const isSuperAdmin = permissionStore.state.isSuperAdmin
                    return (
                        <Group>
                            {!isSelected && (
                                <CustomButton
                                    onClick={() => {
                                        setSelectedContractId(row.original.id ?? null);
                                        onSelect(row.original);
                                        disclosure[1].close();
                                    }}
                                    disabled={isSuperAdmin ? false : !isLeader}
                                >
                                    Chọn
                                </CustomButton>
                            )}
                        </Group>
                    );
                }}
            />
        </CustomButtonModal>
    );
}

