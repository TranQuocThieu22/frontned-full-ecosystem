import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import Shared_ContractExecuteStatusBadge from "@/shared/features/Contract/Shared_ContractExecuteStatusBadge";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IProps {
    form: UseFormReturnType<formValuesType<SRMContractDetail>>;
    disclosure: ReturnType<typeof useDisclosure>;
    onSelect: (contract: SRMContract) => void;
}

export default function ChoseContractButton({ form, disclosure, onSelect }: IProps) {
    const academicYearStore = useAcademicYearStore();

    const acceptanceCouncilQuery = useCustomReactQuery({
        queryKey: ['acceptanceCouncilQuery_ChoseContractButton', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return acceptanceCouncilService.getContractAccepted({
                AcademicYearId: academicYearStore?.state?.academicYear?.id ?? 0
            });
        },
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    });

    const columns = useMemo<MRT_ColumnDef<SRMAcceptanceCouncil>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "srmTopic.registerName",
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
            header: "Lĩnh vực",
            accessorKey: "srmTopic.srmArea.name",
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmTopic.srmType.name",
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "srmTopic.duration",
        },
        {
            header: "Tổng kinh phí",
            accessorKey: "totalCost",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.srmTopic?.totalCost, " VNĐ"),
        },
        {
            header: "% Hoàn thành",
            accessorKey: "srmContractReportHistories",
            accessorFn(row) {
                const progress = row.srmContractReportHistories?.[0]?.implementationProgress;

                if (!progress) return "";
                return progress + "%";
            }
        },
        {
            header: "File báo cáo cuối kỳ",
            accessorKey: "attachmentPath",
            accessorFn: (row) => <CustomButtonViewFileAPI filePath={row.srmTopic?.attachmentPath} />
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "executionStatus",
            size: 280,
            accessorFn: (row) => <Shared_ContractExecuteStatusBadge value={row.executionStatus ?? 0} />
        },
    ], []);

    return (
        <CustomButtonModal
            isActionIcon
            disclosure={disclosure}
            actionIconProps={{
                children: <IconSearch size="2xl" />
            }}
            modalProps={{
                title: "Danh sách đề tài",
                size: "95vw"
            }}
        >
            <CustomDataTable
                isLoading={acceptanceCouncilQuery.isLoading}
                isError={acceptanceCouncilQuery.isError}
                enableRowSelection={true}
                enableMultiRowSelection={false}
                enableRowNumbers={true}
                columns={columns}
                data={acceptanceCouncilQuery.data || []}
                initialState={{
                    rowSelection: form.values?.srmContractId
                        ? {
                            [form.values.srmContractId]: true
                        }
                        : {}
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRow = table.getSelectedRowModel().flatRows[0]?.original;
                    return (
                        <CustomButton
                            onClick={() => {
                                if (selectedRow) {
                                    onSelect(
                                        {
                                            ...selectedRow,
                                        }
                                    );
                                    disclosure[1].close();
                                }
                            }}
                            disabled={!selectedRow}
                        >
                            Chọn
                        </CustomButton>
                    );
                }}
            />
        </CustomButtonModal>
    );
}

