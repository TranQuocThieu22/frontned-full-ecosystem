import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useMemo } from "react";
import { F_documentCategories_Create } from "./F_documentCategories_Create";
import { F_documentCategories_Delete } from "./F_documentCategories_Delete";
import { F_documentCategories_DeleteList } from "./F_documentCategories_DeleteList";
import { F_documentCategories_Export } from "./F_documentCategories_Export";
import { F_documentCategories_Import } from "./F_documentCategories_Import";
import { F_documentCategories_Update } from "./F_documentCategories_Update";

interface I {
    id?: number; name?: string; code?: string
}
export function F_documentCategories_Read({ documentType }: { documentType: number }
) {
    const documentAttributeQuery = useCustomReactQuery({
        queryKey: ["F_core18256_Read" + documentType],
        axiosFn: () => documentAttributeService.getByType(documentType)
    })

    const columns = useMemo<CustomColumnDef<I>[]>(
        () => [
            {
                header: "Mã loại văn bản",
                accessorKey: "code"
            },
            {
                header: "Tên Loại Văn Bản",
                accessorKey: "name"
            }
        ],
        []
    );

    return (
        <CustomDataTable
            isLoading={documentAttributeQuery.isLoading}
            isError={documentAttributeQuery.isError}
            columns={columns}
            enableRowNumbers={true}
            enableRowSelection={true}
            data={documentAttributeQuery.data || []}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <F_documentCategories_Create documentType={documentType} />
                    <F_documentCategories_Import
                        documentType={documentType}
                        isLoading={documentAttributeQuery.isLoading}
                    />
                    <F_documentCategories_Export
                        table={table}
                        loading={documentAttributeQuery.isLoading}
                    />
                    <F_documentCategories_DeleteList
                        values={table.getSelectedRowModel().flatRows.map(row => row.original)}
                        resetRowSelection={() => table.resetRowSelection()}
                        isLoading={documentAttributeQuery.isLoading}
                    />
                </Group>
            )}
            renderRowActions={({ row }) => {
                return (
                    <CustomCenterFull>
                        <F_documentCategories_Update values={row.original} />
                        <F_documentCategories_Delete value={row.original} context={row.original.code} />
                    </CustomCenterFull>
                )
            }}
        />
    )
}

