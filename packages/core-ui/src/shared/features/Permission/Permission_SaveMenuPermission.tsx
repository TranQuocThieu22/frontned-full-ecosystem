import { roleService } from "@aq-fe/core-ui/shared/APIs/roleService"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { Permission } from "@aq-fe/core-ui/shared/components/input/CorePermissionCheck"
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation"
import { Role } from "@aq-fe/core-ui/shared/interfaces/Role"
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore"

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
    const permissionStore = usePermissionStore()
    const mutation = useCustomReactMutation({
        axiosFn: (values: Role[]) => {
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
        <CustomButton
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
