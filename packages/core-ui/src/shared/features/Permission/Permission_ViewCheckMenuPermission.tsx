import { roleService } from "@aq-fe/core-ui/shared/APIs/roleService";
import CorePermissionCheck, { Permission } from "@aq-fe/core-ui/shared/components/input/CorePermissionCheck";
import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Role } from "@aq-fe/core-ui/shared/interfaces/Role";
import { useEffect, useState } from "react";

interface Permission_ViewCheckMenuPermissionProps {
    value?: Permission[],
    onChange?: (value?: Permission[]) => void,
    roleOrUserId?: number,
    isUserPermission?: boolean,
    menuDataRoot?: I_BasicAppShell_LinkItem[]
}
export default function Permission_ViewCheckMenuPermission({
    value,
    onChange,
    roleOrUserId,
    isUserPermission,
    menuDataRoot
}: Permission_ViewCheckMenuPermissionProps) {
    const rolePermissionQuery = useCustomReactQuery({
        queryKey: ['rolePermissions', roleOrUserId],
        axiosFn: () => {
            if (isUserPermission) return roleService.getUserPermission({ userId: roleOrUserId })
            return roleService.getRolePermission({ roleId: roleOrUserId })
        },
        options: {
            enabled: !!roleOrUserId,
            refetchOnWindowFocus: false
        }
    })
    const isLoadingState = useState(true)

    function mergePermissionsType(
        menus: Permission[],
        permissions: Role[]
    ): Permission[] {
        return menus.map(menu => {
            const matchedPermission = permissions.find(p => p.pageId?.toString() === menu.id);
            return {
                ...menu,
                isRead: matchedPermission?.isRead || false,
                isUpdate: matchedPermission?.isUpdate || false,
                isDelete: matchedPermission?.isDelete || false,
                isCreate: matchedPermission?.isCreate || false,
                isPrint: matchedPermission?.isPrint || false,
                isExport: matchedPermission?.isExport || false
            };
        });
    }

    function extractMenusWithRootGroupTitle(
        data: I_BasicAppShell_LinkItem[],
        rootGroupTitle?: string
    ): Permission[] {
        const result: Permission[] = [];

        for (const item of data) {
            const currentRoot = rootGroupTitle || item.label;

            // Nếu có con, duyệt tiếp
            if (item.links && item.links.length > 0) {
                const children = extractMenusWithRootGroupTitle(item.links, currentRoot);
                result.push(...children);
            }

            // Nếu là menu thực sự (có link và pageId)
            if (item.link && item.pageId !== undefined) {
                result.push({
                    id: item.pageId.toString(),
                    name: item.label,
                    groupTitle: rootGroupTitle, // group theo menu gốc lớn nhất
                });
            }
        }

        return result;
    }
    useEffect(() => {
        if (!rolePermissionQuery.data) return
        const flattenMenu = extractMenusWithRootGroupTitle(menuDataRoot || [])
        const menuMerged = mergePermissionsType(flattenMenu, rolePermissionQuery.data)
        onChange?.(menuMerged)
        isLoadingState[1](false)
    }, [rolePermissionQuery.data])
    if (roleOrUserId == undefined) return "Vui lòng chọn Người dùng"
    return (
        <CorePermissionCheck

            isLoading={isLoadingState[0]}
            value={value}
            onChange={onChange}
        />
    )
}

