'use client';

import { branchService } from "@/shared/APIs/branchService";
import { Branch } from "@/shared/interfaces/branch";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center, Group } from "@mantine/core";
import { useMemo } from "react";
import BranchCatalogCreateUpdate from "./BranchCatalogCreateUpdate";
import BranchCatalogDelete from "./BranchCatalogDelete";
import BranchCatalogDeleteList from "./BranchCatalogDeleteList";

export default function BranchCatalogTable() {
    const getAllBranchQuery = useCustomReactQuery({
        queryKey: ["getAllBranchQuery"],
        axiosFn: () => branchService.getAll()
    });
    const columns = useMemo<CustomColumnDef<Branch>[]>(() => [
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
    ], []);

    if (getAllBranchQuery.isLoading) return "Đang tải dữ liệu..."
    if (getAllBranchQuery.isError) return "Có lỗi xảy ra!"
    return (
        <CustomDataTable
            columns={columns}
            data={getAllBranchQuery.data || []}
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <BranchCatalogCreateUpdate />
                    <BranchCatalogDeleteList
                        values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)}
                    />
                    <CustomButton actionType="import" />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <Center>
                    <BranchCatalogCreateUpdate values={row.original} />
                    <BranchCatalogDelete values={row.original} />
                </Center>
            )}
        />
    );
}
