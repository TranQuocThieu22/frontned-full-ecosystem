"use client"
import ChatBotButton from "@/features/admin/ChatBot/ChatBotButton";
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell";
import SemesterSelect from "@aq-fe/core-ui/shared/features/Semester/SemesterSelect";
import { Group } from "@mantine/core";
import { ReactNode } from "react";
import { menuData } from "../../data/menuData/menuData";
// import { Button } from "@aq-fe/core-ui/components/example/button";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <>
            <CustomBasicAppShell menu={menuData} extraTopRight={<Group>
                {/* <ActivityPlanSelect /> */}
                <SemesterSelect />
            </Group>}>
                {/* <Button appName={"LOM App"}>Test Button</Button> */}
                {/* <Button2 appName={"LOM App"}>Test Button</Button2> */}
                {children}
                <ChatBotButton />
            </CustomBasicAppShell>
        </>
    )
}


