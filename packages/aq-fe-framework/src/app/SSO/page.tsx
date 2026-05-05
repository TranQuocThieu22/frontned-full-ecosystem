"use client"
import { menuData } from "@/data/menuData";
import { Feat_Authenticate_SSOHandler } from "@/modules-features";

export default function Page() {
    return (
        <Feat_Authenticate_SSOHandler
            aqModule="srm"
            menuData={menuData}
            onSuccessNavigateFollowRole={() => { }} />
    )
}
