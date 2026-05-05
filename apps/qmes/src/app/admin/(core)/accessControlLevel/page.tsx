'use client'

import { adminMenuData } from "@/data/adminMenuData"
import { MyPageContent } from "aq-fe-framework/components"
import { Feat_accessControlLevel } from "aq-fe-framework/modules-features"

export default function Page() {
    return (

        <Feat_accessControlLevel menuData={adminMenuData} />

    )
}
