import { IPagePermission } from "@/interfaces";
import { I_BasicAppShell_LinkItem } from "./types";

export function findBreadcrumbPath(
    items: I_BasicAppShell_LinkItem[],
    currentPath: string,
    parents: string[] = []
): string[] | null {
    for (const item of items) {
        if (item.link === currentPath) {
            return [...parents, item.label];
        }

        if (item.links) {
            const found = findBreadcrumbPath(item.links, currentPath, [...parents, item.label]);
            if (found) return found;
        }
    }

    return null;
}


export function getReadablePageIdSet(permissions: IPagePermission[]): Set<number> {
    return new Set(
        permissions
            .filter(p => p.isRead && p.pageId !== undefined)
            .map(p => p.pageId as number)
    );
}

// Hàm đệ quy lọc menu
export function filterMenuByPermission(
    menuList: I_BasicAppShell_LinkItem[],
    readablePageIds: Set<number>
): I_BasicAppShell_LinkItem[] {
    return menuList
        .map(menu => {
            // Nếu có links con thì đệ quy tiếp
            if (menu.links && Array.isArray(menu.links)) {
                const filteredLinks = filterMenuByPermission(menu.links, readablePageIds);
                if (filteredLinks.length > 0) {
                    return { ...menu, links: filteredLinks };
                }
            }

            // Nếu không có links con, kiểm tra pageId
            if (menu.pageId !== undefined && readablePageIds.has(menu.pageId)) {
                return menu;
            }

            // Không có quyền thì bỏ
            return null;
        })
        .filter((item): item is I_BasicAppShell_LinkItem => item !== null);
}

export function getAllMenuWithPageId(menuList: I_BasicAppShell_LinkItem[]): I_BasicAppShell_LinkItem[] {
    const result: I_BasicAppShell_LinkItem[] = [];


    const traverse = (items: I_BasicAppShell_LinkItem[]) => {
        for (const item of items) {
            if (item.pageId !== undefined) {
                result.push(item);
            }
            if (item.links && Array.isArray(item.links)) {
                traverse(item.links);
            }
        }
    };

    traverse(menuList);
    return result;
}


export function generateEnumFromPageList(
    data: I_BasicAppShell_LinkItem[],
    prefix: string = "",
    orderBy: "pageId" | "name" | null = null
): string {
    const allMenuFlat = getAllMenuWithPageId(data)
    const errors: string[] = [];

    // Kiểm tra dữ liệu không hợp lệ
    allMenuFlat.forEach((item, index) => {
        if (item.pageId === 0 || item.pageId === undefined) {
            errors.push(`Item tại index ${index} có pageId không hợp lệ: ${item.pageId}`);
        }
        if (!item.name) {
            errors.push(`Item tại index ${index} thiếu name`);
        }
    });

    if (errors.length > 0) {
        throw new Error(`Dữ liệu không hợp lệ:\n- ${errors.join("\n- ")}`);
    }

    const validItems = allMenuFlat as (I_BasicAppShell_LinkItem & { pageId: number; name: string })[];

    // Kiểm tra trùng pageId
    const pageIdMap: Record<number, I_BasicAppShell_LinkItem[]> = {};
    for (const item of validItems) {
        if (!pageIdMap[item.pageId]) pageIdMap[item.pageId] = [];
        pageIdMap[item.pageId].push(item);
    }

    const duplicatedPageIds = Object.entries(pageIdMap)
        .filter(([_, items]) => items.length > 1)
        .map(
            ([id, items]) => `pageId ${id} dùng cho: ${items.map((i) => `"${i.name}"`).join(", ")}`
        );

    // Kiểm tra trùng name
    const nameMap: Record<string, I_BasicAppShell_LinkItem[]> = {};
    for (const item of validItems) {
        if (!nameMap[item.name]) nameMap[item.name] = [];
        nameMap[item.name].push(item);
    }

    const duplicatedNames = Object.entries(nameMap)
        .filter(([_, items]) => items.length > 1)
        .map(
            ([name, items]) => `name "${name}" dùng cho pageIds: ${items.map((i) => i.pageId).join(", ")}`
        );

    const allErrors = [...duplicatedPageIds, ...duplicatedNames];
    if (allErrors.length > 0) {
        throw new Error(`Dữ liệu không hợp lệ:\n- ${allErrors.join("\n- ")}`);
    }

    // Sắp xếp theo orderBy
    let sortedItems = [...validItems];
    if (orderBy === "pageId") {
        sortedItems.sort((a, b) => a.pageId - b.pageId);
    } else if (orderBy === "name") {
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Chuyển text thành PascalCase
    const toPascalCase = (str: string) =>
        str
            .replace(/[^a-zA-Z0-9]+/g, " ")
            .trim()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");

    const enumLines = sortedItems.map((item) => {
        let key = toPascalCase(item.name);
        if (prefix) {
            key = `${toPascalCase(prefix)}${key}`;
        }
        return `  ${key} = ${item.pageId},`;
    });

    return `export enum PageIdEnum {\n${enumLines.join("\n")}\n}`;
}

export function extractLinkedMenuItems(menu: I_BasicAppShell_LinkItem[]) {
    const result: I_BasicAppShell_LinkItem[] = [];

    function traverse(items: I_BasicAppShell_LinkItem[]) {
        for (const item of items) {
            // Nếu item có thuộc tính 'link' => là menu con có link
            if (item.link) {
                result.push(item);
            }
            // Nếu item có 'links' => duyệt tiếp (đệ quy)
            if (Array.isArray(item.links)) {
                traverse(item.links);
            }
        }
    }

    traverse(menu); // Bắt đầu duyệt từ gốc
    return result;
}