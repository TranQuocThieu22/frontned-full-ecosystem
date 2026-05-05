"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { F_moduleConfig } from "aq-fe-framework/modules-features";

export default function Page() {
    return (
        <MyPageContent>
            <F_moduleConfig AQModuleId={3} />
        </MyPageContent>
    )
}
