import { schoolCode } from "@/constants/object/schoolCode";
import { menuData } from "@/data/adminMenuData";
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
/** Dùng để ẩn menu đối với từng trường */
export function filterMenuDataBySchool(): I_BasicAppShell_LinkItem[] {
    const removeMenuWithIDOfFTU = [61, 62, 66, 24, 25];
    const removeMenuWithIdOfTNUT = [69, 55, 56, 57];

    let idsToRemove: number[] = [];

    if (APP_CONFIG.schoolCode === schoolCode.FTU) {
        idsToRemove = removeMenuWithIDOfFTU;
    } else if (APP_CONFIG.schoolCode === schoolCode.TNUT) {
        idsToRemove = removeMenuWithIdOfTNUT;
    }

    return filterMenu(menuData, idsToRemove);
}

function filterMenu(items: I_BasicAppShell_LinkItem[], idsToRemove: number[]): I_BasicAppShell_LinkItem[] {
    const result: I_BasicAppShell_LinkItem[] = [];

    for (const item of items) {
        if (item.pageId && idsToRemove.includes(item.pageId)) {
            continue; // bỏ menu cần loại
        }

        const newItem = { ...item };

        if (item.links && item.links.length > 0) {
            newItem.links = filterMenu(item.links, idsToRemove);
        }

        result.push(newItem);
    }

    return result;
}
