import { IStore_Authenticate } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { PagePermission } from "@aq-fe/core-ui/shared/interfaces/PagePermission";
import { PermissionStoreProps } from "@aq-fe/core-ui/shared/stores/usePermissionStore";

export const hasAllPermissions = (userStore?: IStore_Authenticate | null, userPermissionsStore?: PermissionStoreProps | null) => {
    return !!(
        userPermissionsStore?.isSuperAdmin ||
        userStore?.userId?.toString() === '3' ||
        isInExcludedRoles(userStore?.roleIds ?? [], [3])
    )
};

export const isInExcludedRoles = (userRoleIds: number[], excludeRoleIds: number[], userRoleId?: number) => {
    return !!(userRoleIds?.some(roleId => excludeRoleIds.includes(roleId)) || (userRoleId && excludeRoleIds.includes(userRoleId)))
};



type PermissionAction = 'Create' | 'Update' | 'Delete' | 'Read' | 'Export' | 'Print';

export type RuleNode =
    | { ruleType: 'group'; operator: 'AND' | 'OR'; rules: RuleNode[] }
    | { ruleType: 'page'; pageId: number; action: PermissionAction }
    | { ruleType: 'feature'; featureId: number; action: PermissionAction };

export const checkPermissionByRule = (rule: RuleNode, userPermissions: PagePermission[]): boolean => {
    if ('operator' in rule) {
        if (rule.operator === 'AND') {
            return rule.rules.every((rule: RuleNode) => checkPermissionByRule(rule, userPermissions));
        }
        else {
            return rule.rules.some((rule: RuleNode) => checkPermissionByRule(rule, userPermissions));
        }
    } else {
        switch (rule.ruleType) {
            case 'page':
                const userPermision = userPermissions.find(item => item.pageId === rule.pageId);
                return !!userPermision?.[`is${rule.action}`];
            // case 'feature':
            //     const userPermisionFeature = userPermissions.find(item => item.featureId === rule.featureId);
            //     return !!userPermisionFeature?.[`is${rule.action}`];
        }
        return false;
    }
}