"use client"
import { menuData } from '@/data/menuData'
import { Feat_PageContentTable } from '@/modules-features/admin/core/pageContent/Feat_PageContentTable'

export default function Page() {
    return (
        <Feat_PageContentTable menuData={menuData} />
    )
}
