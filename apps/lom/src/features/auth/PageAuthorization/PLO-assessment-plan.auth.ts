import { AppPage } from "@/data/enum/app-page.enum";
import { hasAllPermissions } from "@/features/auth/authorization-helper";
import { IStore_Authenticate } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { PermissionStoreProps } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export const canCreatePLOAssessmentPlan = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.PLOAssessmentPlan)?.isCreate) return true
    return false
};

export const canDeletePLOAssessmentPlan = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.PLOAssessmentPlan)?.isDelete) return true
    return false
};

export const canUpdatePLOAssessmentPlan = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.PLOAssessmentPlan)?.isUpdate) return true
    return false
};

export const canSavePLOAssessmentPlan = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.PLOAssessmentPlan)?.isUpdate) return true
    return false
};

export const canViewPLOAssessmentPlan = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.PLOAssessmentPlan)?.isRead) return true
    return false
};

export const canExportPLOAssessmentPlan = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.PLOAssessmentPlan)?.isExport) return true
    return false
};

export const canImportPLOAssessmentPlan = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    if (hasAllPermissions(userStore, userPermissionsStore)) return true
    if (!!userPermissionsStore?.permission?.find(permission => permission.pageId === AppPage.PLOAssessmentPlan)?.isCreate) return true
    return false
};
