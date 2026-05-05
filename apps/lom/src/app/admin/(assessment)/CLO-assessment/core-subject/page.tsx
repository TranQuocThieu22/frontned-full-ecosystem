'use client'
import F_CoreSubjectFilter from "@/features/admin/UncategorizedModules/CLO-core-subject/F_CoreSubjectFilter";
import F_CoreSubjectTable from "@/features/admin/UncategorizedModules/CLO-core-subject/F_CoreSubjectTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Space } from "@mantine/core";

export default function Page() {
    return (
        <CustomPageContent>
            <F_CoreSubjectFilter />
            <Space />
            <F_CoreSubjectTable />
        </CustomPageContent>
    )
}
