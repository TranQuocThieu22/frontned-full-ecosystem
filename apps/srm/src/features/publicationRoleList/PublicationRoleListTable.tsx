'use client'

import { titleService } from "@/shared/APIs/titleService";
import { EnumTitleType } from "@/shared/consts/enum/EnumTitleType";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import PublicationRoleListCreateUpdateModal from "./PublicationRoleListCreateUpdateModal";
import PublicationRoleListImportButton from "./PublicationRoleListImportButton";

export default function PublicationRoleListTable() {
    const query = useCustomReactQuery({
        queryKey: ['PublicationRoleList'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Publication),
    });
    const columns = useMemo<CustomColumnDef<SRMTitle>[]>(() => [
        {
            header: "Mã vai trò",
            accessorKey: "code",
        },
        {
            header: "Tên vai trò",
            accessorKey: "name",
        },
        {
            header: "Không sử dụng",
            accessorKey: "isDeactivate",
            type: "squareCheck"
        },
        {
            header: "Là tác giả chính",
            accessorKey: "isLeader",
            type: "squareCheck"
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            size: columnSizeObject.description
        },
    ], [query.data]);

    return (
        <CustomFieldset title="Danh mục vai trò thực hiện công bố" >
            <CustomDataTableAPI
                query={query}
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                deleteFn={titleService.delete}
                deleteListFn={titleService.deleteListIds}
                exportProps={{
                    fileName: "Danh mục vai trò thực hiện công bố"
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <PublicationRoleListCreateUpdateModal />
                            <PublicationRoleListImportButton />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            <PublicationRoleListCreateUpdateModal
                                values={row.original}
                            />
                        </>
                    )
                }}
            />
        </CustomFieldset>
    )
}