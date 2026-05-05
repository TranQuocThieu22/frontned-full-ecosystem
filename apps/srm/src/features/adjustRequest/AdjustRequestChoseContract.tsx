import { contractDetailService } from "@/shared/APIs/contractDetailService";
import { EnumColorEnumSubmittedType, EnumIconEnumSubmittedType, EnumLabelEnumSubmittedType } from "@/shared/consts/enum/EnumSubmittedType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_ContractExecuteStatusBadge from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table";
import { useMemo, useState } from "react";

interface IProps {
    form: UseFormReturnType<SRMContractDetail>;
    disclosure: ReturnType<typeof useDisclosure>;
    onSelect: (contract: SRMContract) => void;
}

export default function AdjustRequestChoseContract({ form, disclosure, onSelect }: IProps) {
    const academicYearStore = useAcademicYearStore();
    const authenticateStore = useAuthenticateStore();
    const permissionStore = usePermissionStore()

    const contractAmendmentQuery = useCustomReactQuery({
        queryKey: ['contractAmendmentQuery', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return contractDetailService.GetContractAmendment({
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
            header: "Thời gian thực hiện",
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
            header: "Tổng kinh phí",
            accessorKey: "totalCost",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost, " VNĐ"),
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmType.name",
        },
        {
            header: "Ngày báo cáo",
            accessorKey: "srmContractReportHistories.reportDate",
            accessorFn: (row) => row?.srmContractReportHistories ? dateUtils.toMMYYYY(row.srmContractReportHistories[0]?.reportDate) : "",
        },
        {
            header: "Trạng thái báo cáo",
            accessorKey: "submittedType",
            Cell: ({ row }) => {
                const firstHistory = row.original?.srmContractReportHistories?.[0];
                return firstHistory ? <CustomEnumBadge
                    value={firstHistory?.submittedType}
                    enumLabel={EnumLabelEnumSubmittedType}
                    enumColor={EnumColorEnumSubmittedType}
                    enumIcon={EnumIconEnumSubmittedType} /> : null;
            },
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "executionStatus",
            accessorFn: (row) => <Shared_ContractExecuteStatusBadge value={row.executionStatus ?? 0} />,
        },
    ], []);
    const selectAble = (row: MRT_Row<SRMContract>) => {
        if (permissionStore.state.isSuperAdmin == true) return true
        const isLeader = row.original?.srmTopic?.srmTopicMembers?.some(
            member => member.srmTitle?.isLeader === true &&
                member.userId == authenticateStore.state.userId
        );
        if (isLeader) return true
        return false
    }

    return (
        <CustomButtonModal
            isActionIcon
            modalProps={{
                size: "95vw",
                title: "Danh sách đề tài"
            }}
            actionIconProps={{
                children: <IconSearch size="2xl" />
            }}
            disclosure={disclosure}
        >
            <CustomDataTable
                isLoading={contractAmendmentQuery.isLoading}
                isError={contractAmendmentQuery.isError}
                enableRowSelection={false}
                enableRowNumbers={true}
                columns={columns}
                data={contractAmendmentQuery.data || []}
                renderRowActions={({ row }) => {


                    return (
                        <Group>
                            <CustomButton
                                onClick={() => {
                                    setSelectedContractId(row.original.id ?? null);
                                    onSelect(row.original);
                                    disclosure[1].close();
                                }}
                                disabled={!selectAble(row)}
                            >
                                Chọn
                            </CustomButton>
                        </Group>
                    );
                }}
            />
        </CustomButtonModal>
    );
}

