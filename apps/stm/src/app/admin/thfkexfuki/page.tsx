'use client'
import F_thfkexfuki_StudentProfile from "@/features/admin/thfkexfuki/F_thfkexfuki_StudentProfile";
import F_thfkexfuki_TitleInformation from "@/features/admin/thfkexfuki/F_thfkexfuki_TitleInformation";
import { useS_thfkexfuki } from "@/features/admin/thfkexfuki/useS_thfkexfuki";
import F_Shared_FilterStudent from "@/features/shared/FilterStudent/F_Shared_FilterStudent";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Group, rem, Space, Tabs } from "@mantine/core";
import { IconArticle, IconPresentationAnalytics } from "@tabler/icons-react";
import { useState } from "react";
import F_thfkexfuki_Tab_EventFlow from "../../../features/admin/thfkexfuki/F_thfkexfuki_Tab_EventFlow";

//thfkexfuki
export default function Page() {
    useS_thfkexfuki()
    const [activeTab, setActiveTab] = useState<string | null>("generalInfor")
    const iconStyle = { width: rem(14), height: rem(14) }
    return (
        <CustomPageContent>
            <Group align="end">
                <F_Shared_FilterStudent />
                <F_thfkexfuki_TitleInformation />
            </Group>
            <Space />
            <Tabs
                value={activeTab}
                onChange={setActiveTab}
            >
                <Tabs.List grow justify="space-between" mb={'md'}>
                    <Tabs.Tab
                        bg={"rgba(131, 204, 235, 0.3)"}
                        color="rgba(131, 204, 235, 1)"
                        value="generalInfor"
                        leftSection={<IconPresentationAnalytics style={iconStyle} />}
                    >
                        Thông tin tổng quan
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(247, 216, 54, 0.3)"}
                        color="rgba(247, 216, 54, 1)"
                        value="eventFlow"
                        leftSection={<IconArticle style={iconStyle} />}
                    >
                        Dòng sự kiện
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="generalInfor">
                    <F_thfkexfuki_StudentProfile />
                </Tabs.Panel>
                <Tabs.Panel value="eventFlow">
                    <F_thfkexfuki_Tab_EventFlow />
                </Tabs.Panel>
            </Tabs>
        </CustomPageContent>
    )
}

