"use client"

import { permissionService } from "@aq-fe/aq-core-framework/shared/APIs/permissionService";
import { CustomDataTableAPI } from "@aq-fe/aq-core-framework/shared/components/withAPI/CustomDataTableAPI";
import { Permission } from "@aq-fe/aq-core-framework/shared/interfaces/Permission";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useMemo } from "react";
import PermissionsCreateUpdate from "./PermissionsCreateUpdate";

export default function PermissionsTable() {
    const columns = useMemo<CustomColumnDef<Permission>[]>(() => [
        {
            header: "Mã quyền",
            accessorKey: "code",
        },
        {
            header: "Danh mục",
            accessorKey: "category",
        },
        {
            header: "Mô tả",
            accessorKey: "description",
            Cell: ({ row }) => row.original.description ?? "—",
        },
    ], []);

    return (
        <CustomFieldset title="Danh sách Quyền (Permissions)">
            <CustomDataTableAPI
                columns={columns}
                customReactQueryProps={{
                    queryKey: ["permissions"],
                    serviceFn: () => permissionService.getAll(),
                }}
                enablePagination
                manualPagination={false}
                renderTopToolbarCustomActions={() => (
                    <PermissionsCreateUpdate />
                )}
                renderRowActions={({ row }) => (
                    <CustomCenterFull>
                        <PermissionsCreateUpdate values={row.original} />
                    </CustomCenterFull>
                )}
            />
        </CustomFieldset>
    );
}
