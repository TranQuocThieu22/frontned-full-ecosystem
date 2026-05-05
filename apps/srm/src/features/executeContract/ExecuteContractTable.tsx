import { contractService } from "@/shared/APIs/contractService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomNumberFormatter } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomNumberFormatter";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import ExecuteContractCreateOrUpdate from "./ExecuteContractCreateOrUpdate";
import ExecuteContractDelete from "./ExecuteContractDelete";
import ExecuteContractDeleteList from "./ExecuteContractDeleteList";
import ExecuteContractExport from "./ExecuteContractExport";
import ExecuteContractImport from "./ExecuteContractImport";



export default function ExecuteContractTable() {
    const store = useAcademicYearStore();

    const executeContractQuery = useCustomReactQuery({
        queryKey: ["executeContractQuery_GetAll", store.state.academicYear?.id],
        axiosFn: () => contractService.GetAllByAcademicYear({ AcademicYearId: store.state.academicYear?.id || -1 }),
        options: {
            enabled: !!store.state.academicYear?.id
        }
    });

    const column = useMemo<CustomColumnDef<SRMContract>[]>(() => [
        {
            header: "Mã đăng ký",
            accessorKey: "topicCode",
            accessorFn: (row) => row.srmTopic?.code,
            size: 150
        }, // 
        {
            header: "Mã đề tài",
            accessorKey: "code",
            accessorFn: (row) => row.code,
            size: 150
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            accessorFn: (row) => row.name,
            size: 250
        },
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "SRMTopicLeader",
            accessorFn: (row) => row.srmTopic?.srmTopicMembers?.find(item => item.srmTitle?.isLeader == true)?.user?.fullName,
        },
        {
            header: "Đơn vị chủ trì",
            accessorKey: "topicHostOrganization",
            accessorFn: (row) => row.srmTopic?.hostOrganization
        },
        {
            header: "Đơn vị quản lý",
            accessorKey: "topicManagingOrganization",
            accessorFn: (row) => row.srmTopic?.managingOrganization
        },
        { header: "Số hợp đồng", accessorKey: "contractNumber" }, //
        {
            header: "Ngày ký",
            accessorKey: "signingDate", //
            accessorFn: (row) => {
                return dateUtils.toDDMMYYYY(row.signingDate);
            }
        },
        { header: "Thời gian thực hiện", accessorKey: "duration" }, //
        {
            header: "Từ tháng/năm",
            accessorKey: "fromDate", //
            accessorFn: (row) => {
                return dateUtils.toMMYYYY(row.fromDate);
            }
        },
        {
            header: "Đến tháng/năm",
            accessorKey: "toDate", //
            accessorFn: (row) => {
                return dateUtils.toMMYYYY(row.toDate);
            }
        },
        {
            header: "Tổng kinh phí dự toán",
            accessorKey: "totalCost",
            accessorFn: (row) => {
                if (!row.totalCost || row.totalCost === 0) return "";
                return <CustomNumberFormatter value={row.totalCost} />
            },
            size: 200
        }, //
        {
            header: "Loại đề tài",
            accessorKey: "srmTypeName",
            accessorFn: (row) => row.srmType?.name
        }, //
        {
            header: "File hợp đồng",
            accessorKey: "attachmentPath",
            type: "viewFile"
        },

    ], []);

    return (
        <CustomFieldset title="Danh sách hợp đồng">
            <CustomDataTable
                isError={executeContractQuery.isError}
                isLoading={executeContractQuery.isLoading}
                columns={column}
                data={executeContractQuery.data || []}
                enableRowSelection
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedData = table.getSelectedRowModel().flatRows.flatMap((item) => item.original) || [];
                    return (
                        <>
                            <ExecuteContractCreateOrUpdate
                                loading={executeContractQuery.isFetching} />
                            <ExecuteContractImport
                                loading={executeContractQuery.isFetching}
                            />
                            <ExecuteContractExport
                                loading={executeContractQuery.isFetching}
                                data={
                                    selectedData.length > 0 ?
                                        table.getSelectedRowModel().flatRows.flatMap((item) => item.original) :
                                        executeContractQuery.data ||
                                        []
                                } />
                            <ExecuteContractDeleteList
                                loading={executeContractQuery.isFetching}
                                values={table.getSelectedRowModel().rows.map((row) => row.original)}
                            />
                        </>

                    )
                }}
                renderRowActions={({ row }) => (
                    <Group gap={9} justify="center">
                        <ExecuteContractCreateOrUpdate
                            loading={executeContractQuery.isFetching}
                            data={row.original} />
                        <ExecuteContractDelete
                            row={row}
                            loading={executeContractQuery.isFetching}
                        />
                    </Group>
                )}
            />
        </CustomFieldset>
    )
}
