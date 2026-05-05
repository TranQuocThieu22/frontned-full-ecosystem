"use client";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import MyTab from "@/components/Layouts/Tab/MyTab";
import { C0DocumentTypes } from "@/constants/documentTypes";
import F12_1Read from "@/modules-features/(12)/12-1/F12_1Read";
import { Tabs } from "@mantine/core";

const tabData = [
    { label: "1. Văn bản quy định" },
    { label: "2. Quy trình xử lý công việc" },
    { label: "3. Danh mục biểu mẫu" },
];

export default function Page() {
    return (
        <MyPageContent>
            <MyTab tabList={tabData}>
                <Tabs.Panel value="1. Văn bản quy định">
                    <F12_1Read documentType={C0DocumentTypes.Regulations} />
                </Tabs.Panel>
                <Tabs.Panel value="2. Quy trình xử lý công việc">
                    <F12_1Read documentType={C0DocumentTypes.Workflow} />
                </Tabs.Panel>
                <Tabs.Panel value="3. Danh mục biểu mẫu">
                    <F12_1Read documentType={C0DocumentTypes.Form} />
                </Tabs.Panel>
            </MyTab>
        </MyPageContent>
    );
}
