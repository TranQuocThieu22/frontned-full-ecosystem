'use client';

import { service_branch } from "@/api/services/service_branch";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Group } from "@mantine/core";
// import { baseColumns } from "aq-fe-framework/columns";
import { MyDataTable } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_branchCatalog_CreateUpdate from "./F_branchCatalog_CreateUpdate";
import F_branchCatalog_Delete from "./F_branchCatalog_Delete";
import F_branchCatalog_DeleteList from "./F_branchCatalog_DeleteList";
import { IBranch } from "@/interfaces/branch";
export const branchColumns: MRT_ColumnDef<IBranch>[] = [
    {
        header: "Mã chi nhánh",
        accessorKey: "code",
    },
    {
        header: "Tên chi nhánh",
        accessorKey: "name",
    },
    {
        header: "Địa chỉ",
        accessorKey: "location",
    },
    // ...baseColumns
];

export default function F_branchCatalog_Read() {
    const getAllBranchQuery = useMyReactQuery({
        queryKey: ["getAllBranchQuery"],
        axiosFn: () => service_branch.getAll()
    });
    const columns = useMemo(() => branchColumns, []);
    return (
        <MyDataTable
            isLoading={getAllBranchQuery.isLoading}
            isError={getAllBranchQuery.isError}
            columns={columns}
            data={getAllBranchQuery.data || []}
            exportAble
            renderTopToolbarCustomActions={({ table }) =>
                <Group>
                    <F_branchCatalog_CreateUpdate />
                    <F_branchCatalog_DeleteList
                        values={
                            table.getSelectedRowModel()
                                .flatRows
                                .flatMap(item => item.original)
                        }
                    />
                    <MyButton crudType="import" />
                </Group>
            }
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F_branchCatalog_CreateUpdate values={row.original} />
                    <F_branchCatalog_Delete values={row.original} />
                </MyCenterFull>
            )}
        />
    );
}
