'use client'

import { menuData } from "@/shared/consts/data/menuData"
import { Feat_accessControlLevel } from "@aq-fe/core-ui/features/core/accessControlLevel/Feat_accessControlLevel"

export default function Page() {
    return (
        <Feat_accessControlLevel menuData={menuData} />
    )
}
