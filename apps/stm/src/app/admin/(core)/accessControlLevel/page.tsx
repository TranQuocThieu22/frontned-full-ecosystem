"use client"
import { adminMenuData } from '@/data/adminMenuData'
import { Feat_accessControlLevel } from '@aq-fe/core-ui/features/core/accessControlLevel/Feat_accessControlLevel'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function Page() {
    return (
        <CustomPageContent>
            <Feat_accessControlLevel menuData={adminMenuData} />
        </CustomPageContent>
    )
}
