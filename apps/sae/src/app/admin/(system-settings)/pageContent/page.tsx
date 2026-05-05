"use client"
import { studentMenuData } from '@/data/studentMenuData'
import { filterMenuDataBySchool } from '@/utils/filterMenuDataBySchool'
import { Feat_PageContentTable } from '@aq-fe/core-ui/features/core/pageContent/Feat_PageContentTable'
import { I_BasicAppShell_LinkItem } from '@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types'

export default function Page() {
    const menuDataMerged = [
        ...filterMenuDataBySchool(),
        ...addPrefixToMenu(studentMenuData, "(Sinh viên) ")
    ]
    return (
        <Feat_PageContentTable menuData={menuDataMerged} />
    )
}


function addPrefixToMenu(
    menu: I_BasicAppShell_LinkItem[],
    prefix: string
): I_BasicAppShell_LinkItem[] {
    return menu.map(item => {
        const newItem: I_BasicAppShell_LinkItem = {
            ...item,
            label: `${prefix}${item.label}`
        };

        if (item.links && item.links.length > 0) {
            newItem.links = addPrefixToMenu(item.links, prefix);
        }

        return newItem;
    });
}
