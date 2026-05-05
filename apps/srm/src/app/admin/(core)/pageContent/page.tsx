"use client"
import { menuData } from '@/shared/consts/data/menuData'
import { Feat_PageContentTable } from '@aq-fe/core-ui/features/core/pageContent/Feat_PageContentTable'

export default function Page() {
    return (
        <Feat_PageContentTable menuData={menuData} />
    )
}
