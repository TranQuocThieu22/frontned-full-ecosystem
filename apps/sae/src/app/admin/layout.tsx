"use client"
import ChatBotButton from "@/modules-features/admin/ModuleChat/ChatBot/ChatBotButton";
import ActivityPlanSelect from "@/shared/features/ActivityPlan/ActivityPlanSelect";
import { filterMenuDataBySchool } from "@/utils/filterMenuDataBySchool";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { ReactNode } from "react";
export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <CustomBasicAppShell
            menu={filterMenuDataBySchool()}
            extraTopRight={<ActivityPlanSelect />}
        >
            <CustomPageContent>
                {children}
            </CustomPageContent>
            <ChatBotButton />
        </CustomBasicAppShell>
    )
}


