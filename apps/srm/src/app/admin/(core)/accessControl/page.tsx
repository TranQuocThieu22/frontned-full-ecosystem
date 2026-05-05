'use client'
import { Feat_accessControl } from '@aq-fe/core-ui/features/core/accessControl/Feat_accessControl'
import { menuData } from '../../../../shared/consts/data/menuData'

export default function Page() {
    return (
        <Feat_accessControl menuData={menuData} />
    )
}
