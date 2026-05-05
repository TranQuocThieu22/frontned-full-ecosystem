
'use client'
import F_CLO_Filter from "@/features/admin/UncategorizedModules/CLO/F_CLO_Filter";
import F_CLO_Table from "@/features/admin/UncategorizedModules/CLO/F_CLO_Table";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <CustomPageContent>
            <F_CLO_Filter />
            <Space />
            <F_CLO_Table />
        </CustomPageContent>
    )
}