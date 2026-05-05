'use client'

import { documentAttributeService } from "@/APIs/documentAttributeService";
import { MyCenterFull } from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useMyReactQuery } from "@/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { F_documentCategories_Create } from "./F_documentCategories_Create";
import { F_documentCategories_Delete } from "./F_documentCategories_Delete";
import { F_documentCategories_Update } from "./F_documentCategories_Update";

interface I {
    id?: number, name?: string, code?: string
}
export function F_documentCategories_Read({ documentType }: { documentType: number }
) {
    // const documentAttributeQuery = useQuery<I[]>({
    //     queryKey: ['F_core18256_Read', documentType],
    //     queryFn: async () => {
    //         const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType } })
    //         return result.data?.data || []
    //     },
    // })
    const documentAttributeQuery = useMyReactQuery({
        queryKey: ["F_core18256_Read" + documentType],
        axiosFn: () => documentAttributeService.GetByType(documentType)
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
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
        <MyDataTable
            isLoading={documentAttributeQuery.isLoading}
            isError={documentAttributeQuery.isError}
            columns={columns}
            enableRowNumbers={true}
            data={documentAttributeQuery.data || []}
            renderTopToolbarCustomActions={() => <F_documentCategories_Create documentType={documentType} />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_documentCategories_Update values={row.original} />
                        <F_documentCategories_Delete id={row.original.id!} context={row.original.code} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

