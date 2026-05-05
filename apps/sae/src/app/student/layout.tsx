'use client'
import { menuData } from "@/data/adminMenuData";
import { studentMenuData } from "@/data/studentMenuData";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { ReactNode } from "react";

function getMenuTitleByLink(link: string) {
    const title = menuData.find(item => item.link == link)?.label
    return title
}

export default function Layout({ children }: { children?: ReactNode }) {

    return <>
        <CustomBasicAppShell menu={studentMenuData}>
            <CustomPageContent>
                {children}
            </CustomPageContent>
            {/* <ChatWithAIButton /> */}
        </CustomBasicAppShell>;
    </>
}



