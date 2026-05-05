"use client"
import { menuData } from '@/data/menuData/menuData'
import { Feat_PageContentTable } from '@aq-fe/core-ui/features/core/pageContent/Feat_PageContentTable'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function Page() {
    return (
        <CustomPageContent>
            <Feat_PageContentTable menuData={menuData} />
        </CustomPageContent>
    )
}
