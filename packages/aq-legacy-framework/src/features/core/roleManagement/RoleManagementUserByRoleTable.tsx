import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI";
import AccountTableSelect from "@aq-fe/aq-legacy-framework/shared/features/Account/AccountTableSelect";
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { User } from "@aq-fe/aq-legacy-framework/shared/interfaces/User";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function RoleManagementUserByRoleTable({
    roleId
}: {
    roleId?: number
}) {
    const query = useLegacyReactQuery({
        queryKey: ['users', 'byRoleId', roleId],
        axiosFn: () => {
            return roleService.getUserByRole({ roleId: roleId })
        }
    })
    const createMutation = useLegacyReactMutation({
        axiosFn: async ({ userIds, roleId }: { userIds: number[], roleId: number }) => {
            return roleService.addUsers({ roleId: roleId }, userIds)
        },
        successNotification: "Thêm thành công"

    })
    const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
        {
            header: "Mã tài khoản",
            accessorKey: "code",
            size: 40,
        },
        {
            header: "Họ tên",
            accessorKey: "fullName",
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnit.name",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
        },
    ], []);

    return (
        <CustomFieldset title="Danh sách tài khoản người dùng thuộc nhóm">
            <CustomDataTableAPI
                exportProps={{
                    fileName: "Danh sách thành viên"
                }}
                enableRowSelection={true}
                columns={columns}
                query={query}
                deleteFn={(userId) => roleService.removeUsersFromRole({ roleId: roleId, userIds: [userId] })}
                deleteListFn={(userIds) => roleService.removeUsersFromRole({ roleId: roleId, userIds: userIds })}
                renderTopToolbarCustomActions={() => (
                    <AccountTableSelect
                        values={query.data?.map(item => item.id!) || []}
                        onChange={(userIds) => {
                            createMutation.mutate({ roleId: roleId!, userIds })
                        }}

                    />
                )}
            />
        </CustomFieldset>
    )
}
