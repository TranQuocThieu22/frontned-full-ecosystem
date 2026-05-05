'use client'
import { allMenuData } from '@/data/menuData/allMenuData'
import { Feat_accessControl } from '@aq-fe/core-ui/features/core/accessControl/Feat_accessControl'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function Page() {

    return (
        <CustomPageContent>
            <Feat_accessControl menuData={allMenuData} />
        </CustomPageContent>
    )
}
