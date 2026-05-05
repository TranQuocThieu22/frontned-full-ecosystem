'use client'
import SubjectGroupTable from "@/features/admin/Curriculum&Subject/ModuleSubjectGroup/SubjectGroupWithMIT/SubjectGroupTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent >
            <SubjectGroupTable />
        </CustomPageContent>
    )
}