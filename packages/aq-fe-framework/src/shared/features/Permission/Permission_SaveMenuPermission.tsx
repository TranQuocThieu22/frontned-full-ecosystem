import { roleService } from "@/APIs/roleService"
import { MyButton } from "@/core"
import { Permission } from "@/core/input/CorePermissionCheck"
import { useMyReactMutation } from "@/hooks"
import { IRole } from "@/interfaces"
import { useStore_Permission } from "@/stores"

interface Permission_SaveMenuPermissionProps {
    roleOrUserId?: number,
    isUserPermission?: boolean
    values?: Permission[]
}

export default function Permission_SaveMenuPermission({
    roleOrUserId,
    isUserPermission,
    values
}: Permission_SaveMenuPermissionProps) {
    const permissionStore = useStore_Permission()
    const mutation = useMyReactMutation({
        axiosFn: (values: IRole[]) => {
            if (isUserPermission) return roleService.updateUserPermission({
                pagePermissions: values,
                userId: roleOrUserId
            })
            return roleService.updateRolePermission({
                pagePermissions: values,
                roleId: roleOrUserId
            })
        },
        mutationType: "update"
    })
    return (
        <MyButton
            hidden={!permissionStore.state.currentPermissionPage?.isUpdate}
            onClick={() => {
                mutation.mutate(values?.filter(item => item.id != "0").map(item => ({
                    pageId: parseInt(item.id!),
                    isCreate: item.isCreate,
                    isUpdate: item.isUpdate,
                    isDelete: item.isDelete,
                    isPrint: item.isPrint,
                    isExport: item.isExport || false,
                    isRead: item.isRead,
                })) || [])
            }}
            actionType="save"
        />
    )
}
