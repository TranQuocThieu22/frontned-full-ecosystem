import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export function utils_layout_getItemsWithoutLinks(menu: I_BasicAppShell_LinkItem[]) {
    let result: I_BasicAppShell_LinkItem[] = [];
    function traverse(items: I_BasicAppShell_LinkItem[]) {
        for (const item of items) {
            if (!item.links) {
                result.push(item);
            } else {
                traverse(item.links);
            }
        }
    }
    traverse(menu);
    return result;
}