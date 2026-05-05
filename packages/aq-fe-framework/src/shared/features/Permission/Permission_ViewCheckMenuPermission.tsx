import { roleService } from "@/APIs/roleService";
import { I_BasicAppShell_LinkItem } from "@/components";
import { useMyReactQuery } from "@/hooks";
import { IRole } from "@/interfaces";
import { useEffect, useState } from "react";
import CorePermissionCheck, { Permission } from "../../../core/input/CorePermissionCheck";

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
    const rolePermissionQuery = useMyReactQuery({
        queryKey: ['rolePermissions', roleOrUserId],
        axiosFn: () => {
            if (isUserPermission) return roleService.getUserPermission({ userId: roleOrUserId })
            return roleService.getRolePermission({ roleId: roleOrUserId })
        },
        options: {
            enabled: roleOrUserId != undefined,
            refetchOnWindowFocus: false
        }
    })
    const isLoadingState = useState(true)

    function mergePermissionsType(
        menus: Permission[],
        permissions: IRole[]
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

