"use client"
import { adminMenuData } from '@/data/adminMenuData'
import { MyPageContent } from 'aq-fe-framework/components'
import { Feat_PageContentTable } from 'aq-fe-framework/modules-features'

export default function Page() {
    return (
        <MyPageContent>
            <Feat_PageContentTable menuData={adminMenuData} />
        </MyPageContent>
    )
}