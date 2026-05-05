'use client'
import { Feat_accessControl } from '@/modules-features/admin/core/accessControl/Feat_accessControl'
import { menuData } from '../../../../data/menuData'

export default function Page() {
    return (
        <Feat_accessControl menuData={menuData} />
    )
}

