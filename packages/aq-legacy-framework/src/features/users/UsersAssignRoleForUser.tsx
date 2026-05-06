import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService";
import { userService } from "@aq-fe/aq-legacy-framework/shared/APIs/userService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/useCustomReactQuery";
import { Role, RoleStatusColor, RoleStatusEnum, RoleStatusLabel } from "@aq-fe/aq-legacy-framework/shared/interfaces/Role";
import { User } from "@aq-fe/aq-legacy-framework/shared/interfaces/User";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconUserBolt } from "@tabler/icons-react";
import { MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo } from "react";

export default function UsersAssignRoleForUser({ values, tenantId }: { values?: User, tenantId?: string }) {
  const disc = useDisclosure()
  const form = useForm({
    initialValues: {
      roleIds: [] as string[]
    }
  })

  // State selection cho MantineReactTable
  const rowSelection: MRT_RowSelectionState = useMemo(() => {
    return Object.fromEntries(form.values.roleIds.map(id => [id, true]))
  }, [form.values.roleIds])

  const roleQuery = useCustomReactQuery({
    queryKey: ["roles"],
    serviceFn: () => roleService.getAll({
      IsGlobal: true,
    }),
  })

  const userRolesQuery = useCustomReactQuery({
    queryKey: ["user-roles", values?.id, tenantId],
    serviceFn: () => userService.getRoles(values?.id!, tenantId),
    enabled: disc[0]
  })

  useEffect(() => {
    if (userRolesQuery.data) {
      form.setValues({
        roleIds: userRolesQuery.data.filter(r => !!r.id).map(r => r.id!)
      })
    }
  }, [userRolesQuery.data])

  const columns = useMemo<CustomColumnDef<Role>[]>(() => [
    {
      header: "Mã vai trò",
      accessorKey: "code",
    },
    {
      header: "Tên vai trò",
      accessorKey: "name",
    },
    {
      header: "Trạng thái",
      accessorKey: "status",
      size: 160,
      Cell: ({ row }) => (
        <CustomEnumBadge
          value={row.original.status ?? RoleStatusEnum.active}
          enumLabel={RoleStatusLabel}
          enumColor={RoleStatusColor}
        />
      ),
    },
  ], [])
  return (
    <CustomButtonCreateUpdate
      form={form}
      disclosure={disc}
      modalProps={{
        title: "Gán vai trò cho người dùng",
        size: "50rem"
      }}
      actionIconProps={{
        toolTipProps: {
          label: "Gán vai trò"
        },
        children: <IconUserBolt />
      }}
      isUpdate
      onSubmit={async () => {
        const initialRoleIds = Array.from(new Set(userRolesQuery.data?.filter(r => !!r.id).map(r => r.id!) || []))
        const currentRoleIds = form.values.roleIds

        const rolesToAdd = currentRoleIds.filter(id => !initialRoleIds.includes(id))
        const rolesToRemove = initialRoleIds.filter(id => !currentRoleIds.includes(id))

        if (rolesToAdd.length > 0 && rolesToRemove.length > 0) {
          await userService.assignRoles(values?.id!, rolesToAdd, tenantId)
          return userService.unassignRoles(values?.id!, rolesToRemove, tenantId)
        }

        if (rolesToAdd.length > 0) return userService.assignRoles(values?.id!, rolesToAdd, tenantId)
        if (rolesToRemove.length > 0) return userService.unassignRoles(values?.id!, rolesToRemove, tenantId)

        return { data: { results: true } } as any
      }}
    >
      <CustomDataTable
        columns={columns}
        data={roleQuery.data || []}
        isLoading={roleQuery.isLoading || userRolesQuery.isLoading}
        enableRowSelection
        getRowId={(row) => row.id!}
        state={{
          rowSelection
        }}
        onRowSelectionChange={(updater) => {
          const nextSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
          form.setFieldValue("roleIds", Object.keys(nextSelection));
        }}
        mantineTableContainerProps={{
          style: { maxHeight: "400px" }
        }}
      />
    </CustomButtonCreateUpdate>
  )
}
