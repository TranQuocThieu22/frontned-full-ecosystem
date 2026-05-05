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
import CouncilRoleListCreateUpdateModal from "./CouncilRoleListCreateUpdateModal";
import CouncilRoleListImportButton from "./CouncilRoleListImportButton";

export default function CouncilRoleListTable() {
    const query = useCustomReactQuery({
        queryKey: ['councilRoleList'],
        axiosFn: () => titleService.GetAllByType(EnumTitleType.Council),
    });
    const columns = useMemo<CustomColumnDef<SRMTitle>[]>(() => [
        {
            header: "Mã vai trò",
            accessorKey: "code",
            size: 100
        },
        {
            header: "Tên vai trò",
            accessorKey: "name",
            size: columnSizeObject.name
        },
        {
            header: "Không sử dụng",
            accessorKey: "isDeactivate",
            type: "squareCheck"
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            size: columnSizeObject.description
        },
    ], [query.data]);

    return (
        <CustomFieldset title="Danh mục vai trò tham gia các hội đồng" >
            <CustomDataTableAPI
                query={query}
                enableRowSelection
                columns={columns}
                deleteFn={titleService.delete}
                deleteListFn={titleService.deleteListIds}
                exportProps={{
                    fileName: "Danh sách vai trò tham gia hội đồng"
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <CouncilRoleListCreateUpdateModal />
                            <CouncilRoleListImportButton />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            <CouncilRoleListCreateUpdateModal
                                values={row.original}
                            />
                        </>
                    )
                }}
            />
        </CustomFieldset>
    )
}
