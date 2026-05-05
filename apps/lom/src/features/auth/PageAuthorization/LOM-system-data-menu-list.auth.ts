import { AppPage } from "@/data/enum/app-page.enum";
import { hasAllPermissions } from "@/features/auth/authorization-helper";
import { IStore_Authenticate } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { PermissionStoreProps } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export const canViewLOMSystemDataMenuList = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.LOMSystemDataMenuList)?.isRead) return true
    return false
};

export const canViewLOMSystemDataMenuListItem = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null, pageId?: number) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === pageId)?.isRead) return true
    return false
};
