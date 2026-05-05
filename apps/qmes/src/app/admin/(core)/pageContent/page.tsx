"use client"

import { adminMenuData } from "@/data/adminMenuData"
import { Feat_PageContentTable } from "aq-fe-framework/modules-features"

export default function Page() {
    return (
        <Feat_PageContentTable menuData={adminMenuData} />
    )
}
