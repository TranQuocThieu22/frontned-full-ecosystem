"use client"
import { adminMenuData } from '@/data/adminMenuData'
import { Feat_accessControlLevel } from '@aq-fe/core-ui/features/core/accessControlLevel/Feat_accessControlLevel'

export default function Page() {
    return (
        <Feat_accessControlLevel menuData={adminMenuData} />
    )
}
