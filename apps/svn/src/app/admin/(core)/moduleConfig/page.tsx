"use client"
import { MyPageContent } from "aq-fe-framework/components";
import { F_moduleConfig } from "aq-fe-framework/modules-features";

export default function Page() {
    return (
        <MyPageContent>
            <F_moduleConfig AQModuleId={3} />
        </MyPageContent>
    )
}
