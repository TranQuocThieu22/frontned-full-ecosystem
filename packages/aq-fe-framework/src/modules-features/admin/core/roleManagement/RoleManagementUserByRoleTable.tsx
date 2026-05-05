import { roleService } from "@/APIs/roleService";
import { MyFieldset } from "@/components";
import { CustomDataTableAPI } from "@/core";
import { useMyReactMutation } from "@/hooks/custom-hooks/useMyReactMutation";
import { useMyReactQuery } from "@/hooks/custom-hooks/useMyReactQuery";
import { IAccount } from "@/interfaces";
import AccountTableSelect from "@/shared/features/Account/AccountTableSelect";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function RoleManagementUserByRoleTable({
    roleId
}: {
    roleId?: number
}) {
    const query = useMyReactQuery({
        queryKey: ['users', 'byRoleId', roleId],
        axiosFn: () => {
            return roleService.getUserByRole({ roleId: roleId })
        }
    })
    const createMutation = useMyReactMutation({
        axiosFn: async ({ userIds, roleId }: { userIds: number[], roleId: number }) => {
            return roleService.addUsers({ roleId: roleId }, userIds)
        },
        successNotification: "Thêm thành công"

    })
    const columns = useMemo<MRT_ColumnDef<IAccount>[]>(() => [
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
        <MyFieldset title="Danh sách tài khoản người dùng thuộc nhóm">
            <CustomDataTableAPI
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
        </MyFieldset>
    )
}
