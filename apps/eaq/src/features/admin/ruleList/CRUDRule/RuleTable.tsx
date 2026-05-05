"use client";
import { service_EAQRule } from "@/shared/APIs/service_EAQRule";
import { IRule } from "@/shared/interfaces/rule/IRule";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RuleCreateUpdateButton from "./RuleCreateUpdateButton";
import RuleImportButton from "./RuleImportButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";

export default function RuleTable() {
    const councilRolesQuery = useCustomReactQuery({
        queryKey: ['establish_council_roles'],
        axiosFn: () => service_EAQRule.getAll(),
    })

    const columns = useMemo<MRT_ColumnDef<IRule>[]>(() => [
        { header: "Mã vai trò", accessorKey: "code" },
        { header: "Tên vai trò", accessorKey: "name" },
        { header: "Ghi chú", accessorKey: "note", size: 600 },
    ], []);



    return (
        <CustomFieldset title="Danh mục vai trò">
            <CustomDataTableAPI
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                query={councilRolesQuery}
                exportProps={{
                    fileName: 'Export Danh mục vai trò trong hội đồng'
                }}
                deleteFn={service_EAQRule.delete}
                deleteListFn={service_EAQRule.deleteListIds}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <RuleCreateUpdateButton clearSelection={table.resetRowSelection} />
                            <RuleImportButton />
                        </>
                    );
                }}
                renderRowActions={({ row, table }) =>
                    <RuleCreateUpdateButton
                        values={row.original}
                        clearSelection={table.resetRowSelection}
                    />
                }
            />
        </CustomFieldset>
    );
}
