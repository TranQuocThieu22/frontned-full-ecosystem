"use client"
import { adminMenuData } from "@/data/adminMenuData";
import { Feat_accessControl } from "@aq-fe/core-ui/features/core/accessControl/Feat_accessControl";

export default function Page() {
    return (
        <Feat_accessControl menuData={adminMenuData} />
    )
}
