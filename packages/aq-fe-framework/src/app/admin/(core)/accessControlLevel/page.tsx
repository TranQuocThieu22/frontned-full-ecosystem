'use client'
import { menuData } from '@/data/menuData'
import { Feat_accessControlLevel } from '@/modules-features/admin/core/accessControlLevel/Feat_accessControlLevel'

export default function Page() {
    return (
        <Feat_accessControlLevel menuData={menuData} />
    )
}
