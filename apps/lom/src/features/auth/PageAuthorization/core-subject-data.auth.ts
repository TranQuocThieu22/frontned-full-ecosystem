import { AppPage } from "@/data/enum/app-page.enum";
import { hasAllPermissions } from "@/features/auth/authorization-helper";
import { IStore_Authenticate } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { PermissionStoreProps } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export const canCreateCoreSubjectData = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.CoreSubjectData)?.isCreate) return true
    return false
};

export const canDeleteCoreSubjectData = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.CoreSubjectData)?.isDelete) return true
    return false
};

export const canViewCoreSubjectData = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.CoreSubjectData)?.isRead) return true
    return false
};