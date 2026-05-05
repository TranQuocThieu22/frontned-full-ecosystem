"use client";
import { object_documentTypes } from "@/constants/object/object_documentTypes";
import F12_1Read from "@/features/admin/(12)/12-1/F12_1Read";
import { Tabs } from "@mantine/core";
import { MyTab } from "aq-fe-framework/components";

const tabData = [
    { label: "1. Văn bản quy định" },
    { label: "2. Quy trình xử lý công việc" },
    { label: "3. Danh mục biểu mẫu" },
];

export default function Page() {
    return (

        <MyTab tabList={tabData}>
            <Tabs.Panel value="1. Văn bản quy định">
                <F12_1Read documentType={object_documentTypes.Regulations} />
            </Tabs.Panel>
            <Tabs.Panel value="2. Quy trình xử lý công việc">
                <F12_1Read documentType={object_documentTypes.Workflow} />
            </Tabs.Panel>
            <Tabs.Panel value="3. Danh mục biểu mẫu">
                <F12_1Read documentType={object_documentTypes.Form} />
            </Tabs.Panel>
        </MyTab>

    );
}
