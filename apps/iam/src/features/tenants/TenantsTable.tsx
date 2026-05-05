import { tenantService } from "@aq-fe/aq-core-framework/shared/APIs/tenantService"
import { CustomDataTableAPI } from "@aq-fe/aq-core-framework/shared/components/withAPI/CustomDataTableAPI"
import { Tenant, TenantStatusColor, TenantStatusLabel } from "@aq-fe/aq-core-framework/shared/interfaces/Tenant"
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject"
import { Group } from "@mantine/core"
import { useMemo } from "react"
import TenantsCreateUpdate from "./TenantsCreateUpdate"
import TenantsStatusControl from "./TenantsStatusControl"

export default function TenantsTable() {
    const columns = useMemo<CustomColumnDef<Tenant>[]>(() => [
        {
            header: "Mã tenant",
            accessorKey: "code"
        },
        {
            header: "Tên hiển thị",
            accessorKey: "name",
            size: columnSizeObject.name,
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            Cell: ({ row }) => (
                <Group gap="xs" wrap="nowrap">
                    <CustomEnumBadge
                        value={row.original.status}
                        enumLabel={TenantStatusLabel}
                        enumColor={TenantStatusColor}
                    />
                    <TenantsStatusControl tenant={row.original} />
                </Group>
            ),
        },
    ], [])

    return (
        <CustomFieldset title="Danh sách Tenant">
            <CustomDataTableAPI
                columns={columns}
                customReactQueryProps={{
                    queryKey: ["tenants"],
                    serviceFn: (paging) => tenantService.getAll(paging),
                }}
                enablePagination
                manualPagination={false}
                renderTopToolbarCustomActions={() => (
                    <>
                        <TenantsCreateUpdate />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <>
                        <TenantsCreateUpdate values={row.original} />
                    </>
                )}
            />
        </CustomFieldset>
    )
}

