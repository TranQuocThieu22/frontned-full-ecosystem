import { ActivityPlan } from "@/interfaces/activityPlan";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

const SUPER_ADMIN_ROLE_ID = 2;
const SUPER_ADMIN_USER_ID = "1";

interface PermissionCheck {
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canEdit: boolean; // Combined check for update permissions
}

export const useActivityPlanPermissions = (activityPlan?: ActivityPlan): PermissionCheck => {
    const currentUser = useAuthenticateStore();
    const permissionStore = usePermissionStore();

    const isSuperAdmin =
        currentUser.state.roleIds?.some((roleId) => roleId === SUPER_ADMIN_ROLE_ID) ||
        currentUser.state.userId?.toString() === SUPER_ADMIN_USER_ID;

    const isHostUnit = activityPlan?.host === currentUser.state.workingUnitId;

    const hasCreatePermission = permissionStore.state.currentPermissionPage?.isCreate ?? false;
    const hasUpdatePermission = permissionStore.state.currentPermissionPage?.isUpdate ?? false;
    const hasDeletePermission = permissionStore.state.currentPermissionPage?.isDelete ?? false;

    const canEdit = hasUpdatePermission && (isHostUnit || isSuperAdmin);

    return {
        canCreate: hasCreatePermission,
        canUpdate: hasUpdatePermission,
        canDelete: hasDeletePermission,
        canEdit,
    };
};

export const useCanEditActivityPlanList = (activityPlans: ActivityPlan[]): boolean => {
    const currentUser = useAuthenticateStore();
    const permissionStore = usePermissionStore();

    const hasPermissions =
        permissionStore.state.currentPermissionPage?.isCreate &&
        permissionStore.state.currentPermissionPage?.isUpdate;

    if (!hasPermissions) return false;

    const isSuperAdmin =
        currentUser.state.roleIds?.some((roleId) => roleId === SUPER_ADMIN_ROLE_ID) ||
        currentUser.state.userId?.toString() === SUPER_ADMIN_USER_ID;

    if (isSuperAdmin) return true;

    return activityPlans.every((plan) => plan.host === currentUser.state.workingUnitId);
};
