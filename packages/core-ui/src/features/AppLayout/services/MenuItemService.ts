import { NavbarMenuData } from "@aq-fe/core-ui/shared/interfaces/NavbarMenuData";

/**
 * 
 * @description Mutates the menu items by assigning unique IDs using Depth-First Search (DFS) traversal.
 */
export const assignIdsDFS = <T extends { items?: T[]; id?: number }>(
    menu: T[],
    startId = 1
): void => {
    let currentId = startId;

    const dfs = (list: T[]): void => {
        for (const item of list) {
            item.id = currentId++;

            if (item.items && item.items.length > 0) {
                dfs(item.items);
            }
        }
    };

    dfs(menu);
};

/**
 * 
 * @description Creates a new menu data with unique IDs and displayOrder assigned to each item using Depth-First Search (DFS) traversal, without mutating the original menu.
 */
export const assignIdsDFSNoMutate = <T extends { items?: T[], displayOrder?: string  }>(
    menu: T[],
    startId = 1
): T[] => {
    let currentId = startId;

    const dfsNoMutate = (list: T[], parentPrefix: string | null): T[] => {
        return list.map((item, index) => {
            const newItem: T = {
                ...item,
                id: currentId++
            };

            const currentOrder = parentPrefix
                ? `${parentPrefix}.${index + 1}`
                : `${index + 1}`;
            newItem.displayOrder = currentOrder;

            if (item.items && item.items.length > 0) {
                newItem.items = dfsNoMutate(item.items, currentOrder);
            }

            return newItem;
        });
    };

    const result = dfsNoMutate(menu, null);
    return result;
}

/**
 * 
 * @description Creates a lookup map from route string. Each key (route) can point to multiple menu items (e.g., in case of duplicate routes).
 */
export const createMenuDataLookupMap = <TPageNameLanguageKey>(menuData: NavbarMenuData<TPageNameLanguageKey>[]) => {
    const map = new Map<string, NavbarMenuData<TPageNameLanguageKey>[]>();

    function addItemToMap(menuItem: NavbarMenuData<TPageNameLanguageKey>) {
        if (menuItem.route) {
            if (map.has(menuItem.route)) {
                map.get(menuItem.route)!.push(menuItem);
            } else {
                map.set(menuItem.route, [menuItem]);
            }
        }
        if (menuItem.items) {
            menuItem.items.forEach(item => addItemToMap(item));
        }
    }

    menuData.forEach(item => addItemToMap(item));
    return map;
}

const normalizeURL = (url: string) => {
    return url.split("?")[0]?.split("#")[0]?.replace(/\/+$/, "") ?? "";
}

/**
 * @description Depth-first search to find the path (ancestors -> target) by item id. Returns null if not found.
 */
export const findDimensionPathByItemId = <TPageNameLanguageKey>(
    list: NavbarMenuData<TPageNameLanguageKey>[],
    targetId: number
): NavbarMenuData<TPageNameLanguageKey>[] | null => {
    for (const item of list) {
        if (item.id === targetId) return [item];

        if (item.items) {
            const childPath = findDimensionPathByItemId(item.items, targetId);
            if (childPath) return [item, ...childPath];
        }
    }
    return null;
};

/**
 * @description Matches a URL against a template route by comparing URL segments, skip dynamic segments (e.g., [id])
 */
const matchRoute = (templateRoute: string, url: string) => {
    if (templateRoute === "/" && (url === "/" || url === "")) return true; // case for root route

    function removeEmptySegment(segment: string[]) {
        // filter(Boolean) to remove empty segments (e.g /"")
        return segment.filter(Boolean);
    }
    const templateSegments = removeEmptySegment(templateRoute.split("/"));
    const urlSegments = removeEmptySegment(url.split("/"));

    if (templateSegments.length !== urlSegments.length) return false;

    for (let i = 0; i < templateSegments.length; i++) {
        const templateSegment = templateSegments[i];
        const urlSegment = urlSegments[i];
        if (templateSegment!.startsWith("[") && templateSegment!.endsWith("]")) continue;
        if (templateSegment !== urlSegment) return false;
    }
    return true;
}

/**
 * @description Finds a menu item by matching the given URL, return undefined if not found. Requires a lookup map created from createMenuDataLookupMap function.
 */
export const findMenuItemByURL = <TPageNameLanguageKey>(url: string, lookupMap: Map<string, NavbarMenuData<TPageNameLanguageKey>[]>) => {
    const normalizedURL = normalizeURL(url);

    for (const [template, menuItems] of lookupMap.entries()) {
        if (matchRoute(template, normalizedURL)) {
            return menuItems[0]; // return the first matched item
        }
    }
    return undefined;
}

/**
* @description Assign IDs (DFS) and hierarchical displayOrder in a single pass.
* Example displayOrder:
* - root item: 1, 2, 3
* - children of 1: 1.1, 1.2
* - children of 1.2: 1.2.1, 1.2.2
*/
export const assignIdsAndOrdersDFS = <
    T extends { items?: T[]; id?: number; displayOrder?: string }
>(
    menu: T[],
    startId = 1
): void => {
    let currentId = startId;

    const dfs = (list: T[], parentPrefix: string | null) => {
        list.forEach((item, index) => {
            item.id = currentId++;

            const currentOrder = parentPrefix
                ? `${parentPrefix}.${index + 1}`
                : `${index + 1}`;
            item.displayOrder = currentOrder;

            if (item.items && item.items.length > 0) {
                dfs(item.items, currentOrder);
            }
        });
    };

    dfs(menu, null);
};

// Backward compatibility alias
export const assignMenuDisplayOrder = assignIdsAndOrdersDFS;
