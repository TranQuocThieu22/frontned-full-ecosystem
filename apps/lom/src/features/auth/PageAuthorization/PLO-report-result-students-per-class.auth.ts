import { AppPage } from "@/data/enum/app-page.enum";
import { hasAllPermissions } from "@/features/auth/authorization-helper";
import { IStore_Authenticate } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { PermissionStoreProps } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export const canViewClassStudentStudent = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.ReportPLOResultOfStudentsPerClass)?.isRead) return true
    return false
};

export const canPrintClassStudentStudent = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.ReportPLOResultOfStudentsPerClass)?.isPrint) return true
    return false
};
