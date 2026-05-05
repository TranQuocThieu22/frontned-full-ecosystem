"use client";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import MyTab from "@/components/Layouts/Tab/MyTab";
import { C0DocumentTypes } from "@/constants/documentTypes";
import F11_3Read from "@/modules-features/(11)/11-3/F11_3Read";
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
                    <F11_3Read documentType={C0DocumentTypes.Regulations} />
                </Tabs.Panel>
                <Tabs.Panel value="2. Quy trình xử lý công việc">
                    <F11_3Read documentType={C0DocumentTypes.Workflow} />
                </Tabs.Panel>
                <Tabs.Panel value="3. Danh mục biểu mẫu">
                    <F11_3Read documentType={C0DocumentTypes.Form} />
                </Tabs.Panel>
            </MyTab>
        </MyPageContent>
    );
}
