"use client"


import { tenantService } from "@aq-fe/aq-legacy-framework/shared/APIs/tenantService"
import { userService } from "@aq-fe/aq-legacy-framework/shared/APIs/userService"
import { CustomDataTableAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI"
import { useCustomReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/useCustomReactQuery"
import { User, UserStatusColor, UserStatusLabel } from "@aq-fe/aq-legacy-framework/shared/interfaces/User"
import { useAuthenticateStore } from "@aq-fe/aq-legacy-framework/shared/stores/useAuthenticateStore"
import {
    CustomColumnDef
} from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable"
import { CustomEnumBadge } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { columnSizeObject } from "@aq-fe/aq-legacy-framework/shared/const/object/columnSizeObject"
import { Group, Stack } from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import UsersAssignRoleForUser from "./UsersAssignRoleForUser"
import UsersCreateUpdate from "./UsersCreateUpdate"
import UsersStatusControl from "./UsersStatusControl"

export default function UsersTable({ isIAM = false }: { isIAM?: boolean }) {
    const authTenantId = useAuthenticateStore((s) => s.state.tenantId)
    const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null)

    const tenantQuery = useCustomReactQuery({
        queryKey: ["tenants"],
        serviceFn: () => tenantService.getAll(),
        enabled: isIAM
    })

    const effectiveTenantId = isIAM ? selectedTenantId : authTenantId
    const columns = useMemo<CustomColumnDef<User>[]>(() => [
        {
            header: "Mã người dùng",
            accessorKey: "code"
        },
        {
            header: "Họ tên",
            accessorKey: "name"
        },
        {
            header: "Email",
            accessorKey: "email",
            size: columnSizeObject.name
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            size: 160,
            Cell: ({ row }) => (
                row.original.status ?
                    <Group gap="xs" wrap="nowrap">
                        <CustomEnumBadge
                            value={row.original.status}
                            enumLabel={UserStatusLabel}
                            enumColor={UserStatusColor}
                        />
                        <UsersStatusControl user={row.original} />
                    </Group> :
                    "-"
            ),
        }
    ], [])
    useEffect(() => {
        if (isIAM && tenantQuery.data && !selectedTenantId) {
            setSelectedTenantId(tenantQuery.data[0]?.id?.toString() || null)
        }
    }, [isIAM, tenantQuery.data])
    return (
        <Stack>
            {isIAM && (
                <CustomSelect
                    label="Tenant"
                    data={tenantQuery.data?.map((item) => ({
                        value: item.id?.toString()!,
                        label: `${item.code} - ${item.name}`,
                    }))}
                    value={selectedTenantId}
                    onChange={(value) => setSelectedTenantId(value)}
                    isLoading={tenantQuery.isLoading}
                />
            )}
            <CustomFieldset title="Danh sách User">
                <CustomDataTableAPI
                    columns={columns}
                    customReactQueryProps={{
                        queryKey: ["users", effectiveTenantId],
                        serviceFn: (pagingParams) => userService.getAll({ pagingParams, tenantId: effectiveTenantId! }),
                        enabled: !!effectiveTenantId
                    }}
                    enablePagination
                    renderTopToolbarCustomActions={() => (
                        <Group align="end">
                            <UsersCreateUpdate isIAM={isIAM} tenantId={effectiveTenantId!} />
                        </Group>
                    )}
                    deleteFn={(id) => userService.delete({ id: id, tenantId: effectiveTenantId! })}
                    renderRowActions={({ row }) => (
                        <>
                            <UsersCreateUpdate values={row.original} isIAM={isIAM} tenantId={effectiveTenantId!} />
                            <UsersAssignRoleForUser values={row.original} tenantId={effectiveTenantId!} />
                        </>
                    )}
                />
            </CustomFieldset>
        </Stack>
    )
}