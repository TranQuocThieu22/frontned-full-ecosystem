import AssignStudentToCourseSectionTable from "@/features/admin/assignStudentToCourseSection/AssignStudentToCourseSectionTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <AssignStudentToCourseSectionTable />
        </CustomPageContent>
    )
}
