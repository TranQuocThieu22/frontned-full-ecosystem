import { permissionService } from "@aq-fe/aq-legacy-framework/shared/APIs/permissionService"
import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService"
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate"
import { useCustomReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/useCustomReactQuery"
import { Permission } from "@aq-fe/aq-legacy-framework/shared/interfaces/Permission"
import { CustomColumnDef, CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { IconShieldPin } from "@tabler/icons-react"
import { MRT_RowSelectionState } from "mantine-react-table"
import { useEffect, useMemo } from "react"

export default function RolesAssignPermission({ roleId }: { roleId: string }) {
    const disc = useDisclosure()
    const form = useForm({
        initialValues: {
            permissionIds: [] as string[]
        }
    })

    const rowSelection: MRT_RowSelectionState = useMemo(() => {
        return Object.fromEntries(form.values.permissionIds.map(id => [id, true]))
    }, [form.values.permissionIds])

    const allPermissionsQuery = useCustomReactQuery<Permission[]>({
        queryKey: ['permissions'],
        serviceFn: () => permissionService.getAll()
    })

    const rolePermissionsQuery = useCustomReactQuery<Permission[]>({
        queryKey: ['permission', roleId],
        serviceFn: () => roleService.getPermissions(roleId),
        enabled: disc[0]
    })

    useEffect(() => {
        if (rolePermissionsQuery.data) {
            form.setValues({
                permissionIds: rolePermissionsQuery.data.filter(p => !!p.id).map(p => p.id!)
            })
        }
    }, [rolePermissionsQuery.data])

    const columns = useMemo<CustomColumnDef<Permission>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã quyền",
            size: 140,
        },
        {
            accessorKey: "description",
            header: "Mô tả",
            size: 220,
        },
        {
            header: "Trạng thái"
        }
    ], []);

    return (
        <CustomButtonCreateUpdate
            form={form}
            disclosure={disc}
            isUpdate
            modalProps={{
                title: "Gán quyền",
                size: "70em"
            }}
            actionIconProps={{
                children: <IconShieldPin />,
                toolTipProps: {
                    label: "Gán quyền"
                }
            }}
            onSubmit={async () => {
                const initialIds = Array.from(new Set(rolePermissionsQuery.data?.filter(p => !!p.id).map(p => p.id!) || []))
                const currentIds = form.values.permissionIds

                const idsToAdd = currentIds.filter(id => !initialIds.includes(id))
                const idsToRemove = initialIds.filter(id => !currentIds.includes(id))

                if (idsToAdd.length > 0 && idsToRemove.length > 0) {
                    await roleService.assignPermissions(roleId, idsToAdd)
                    return roleService.unassignPermissions(roleId, idsToRemove)
                }

                if (idsToAdd.length > 0) return roleService.assignPermissions(roleId, idsToAdd)
                if (idsToRemove.length > 0) return roleService.unassignPermissions(roleId, idsToRemove)

                return { data: { results: true } } as any
            }}
        >
            <CustomDataTable
                enableRowSelection
                columns={columns}
                data={allPermissionsQuery.data || []}
                isLoading={allPermissionsQuery.isLoading || rolePermissionsQuery.isLoading}
                getRowId={(row) => row.id!}
                onRowSelectionChange={(updater) => {
                    const nextSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
                    form.setFieldValue("permissionIds", Object.keys(nextSelection));
                }}
                state={{
                    rowSelection
                }}
                mantineTableContainerProps={{
                    style: { maxHeight: "400px" }
                }}
            />
        </CustomButtonCreateUpdate>
    )
}
