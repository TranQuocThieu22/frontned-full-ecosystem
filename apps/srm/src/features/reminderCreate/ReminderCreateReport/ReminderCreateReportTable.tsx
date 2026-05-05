import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ReminderCreateReportCreateUpdate from "./ReminderCreateReportCreateUpdate";
import ReminderCreateReportDelete from "./ReminderCreateReportDelete";
import ReminderCreateReportDeleteList from "./ReminderCreateReportDeleteList";
import ReminderCreateReportExportButton from "./ReminderCreateReportExportButton";

interface IReminderCreateReportTableProps {
    contract: SRMContract
    contractReportHistory?: SRMContractReportHistory[],
    loading?: boolean
}

export default function ReminderCreateReportTable({ contract, contractReportHistory, loading }: IReminderCreateReportTableProps) {

    const columns = useMemo<MRT_ColumnDef<SRMContractReportHistory>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
            accessorFn: (row) => row.srmContract?.code
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            size: 250,
            accessorFn: (row) => row.srmContract?.name
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "srmTopicMembers",
            accessorFn(row) {
                return row.srmContract?.srmTopic?.srmTopicMembers?.find(item => item?.srmTitle?.isLeader === true)?.user?.fullName
            }
        },
        {
            header: "Lần báo cáo",
            accessorKey: "order",
        },
        {
            header: "Ngày báo cáo",
            accessorKey: "reportDate",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row?.reportDate)
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        },
    ], [])

    const disclosure = useDisclosure();

    return (
        <CustomButtonModal
            actionIconProps={{
                actionType: "update",
                loading: loading
            }}
            isActionIcon
            disclosure={disclosure}
            modalProps={{
                size: "80%"
            }}
        >
            <CustomFieldset
                title="Danh sách ngày báo cáo"
            >
                <CustomDataTable
                    columns={columns}
                    enableRowSelection={true}
                    isLoading={loading}
                    data={contractReportHistory?.sort((a, b) => (a.order || 0) - (b.order || 0)) ?? []}
                    renderTopToolbarCustomActions={({ table }) => (
                        <CustomCenterFull>
                            <ReminderCreateReportCreateUpdate
                                srmContractId={contract?.id!}
                                contractReportHistories={contractReportHistory ?? []}
                            />
                            <ReminderCreateReportExportButton contract={contract} table={table} />
                            <ReminderCreateReportDeleteList data={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)} />
                        </CustomCenterFull>
                    )}
                    renderRowActions={({ row }) => {
                        return (
                            <CustomCenterFull>
                                <ReminderCreateReportCreateUpdate
                                    srmContractId={contract?.id!}
                                    initValues={row.original}
                                    contractReportHistories={contractReportHistory ?? []}
                                />
                                <ReminderCreateReportDelete
                                    contractReportHistories={row.original}
                                    loading={loading}
                                />
                            </CustomCenterFull>
                        )
                    }}
                />
            </CustomFieldset>
        </CustomButtonModal>
    );
}
