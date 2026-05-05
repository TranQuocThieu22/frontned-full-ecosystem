"use client"
import { adminMenuData } from "@/data/adminMenuData";
import { Feat_accessControl } from "@aq-fe/core-ui/features/core/accessControl/Feat_accessControl";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <Feat_accessControl menuData={adminMenuData} />
        </CustomPageContent>
    )
}
