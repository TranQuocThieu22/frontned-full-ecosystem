import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService"
import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton"
import { Permission } from "@aq-fe/aq-legacy-framework/shared/components/input/CorePermissionCheck"
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation"
import { Role } from "@aq-fe/aq-legacy-framework/shared/interfaces/Role"
import { usePermissionStore } from "@aq-fe/aq-legacy-framework/shared/stores/usePermissionStore"

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
    const mutation = useLegacyReactMutation({
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
