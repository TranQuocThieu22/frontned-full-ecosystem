"use client";

import { MyTab } from "@/components";
import { Tabs } from "@mantine/core";
import { F_documentCategories_Read } from "./F_documentCategories_Read";


const tabData = [
    { label: "1. Văn bản quy định" },
    { label: "2. Quy trình xử lý công việc" },
    { label: "3. Danh mục biểu mẫu" },
];
type DocumentTypes = {
    Security: number;
    Refinement: number;
    Guideline: number;
    Regulations: number;
    Workflow: number;
    Form: number;
};

// bỏ object này vào dự án vào paste prop để dùng
// const const_object_documentTypes = {
//     Security: 1,
//     Refinement: 2,
//     Guideline: 3,
//     Regulations: 4,
//     Workflow: 5,
//     Form: 6,
// };
interface Props {
    documentTypes: DocumentTypes;
}

export function F_documentCategories({ documentTypes }: Props) {
    return (
        <MyTab tabList={tabData}>
            <Tabs.Panel value="1. Văn bản quy định">
                <F_documentCategories_Read documentType={documentTypes.Regulations} />
            </Tabs.Panel>
            <Tabs.Panel value="2. Quy trình xử lý công việc">
                <F_documentCategories_Read documentType={documentTypes.Workflow} />
            </Tabs.Panel>
            <Tabs.Panel value="3. Danh mục biểu mẫu">
                <F_documentCategories_Read documentType={documentTypes.Form} />
            </Tabs.Panel>
        </MyTab>
    );
}
