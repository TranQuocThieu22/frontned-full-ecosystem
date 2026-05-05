import CourseApprovalDecisionsTable from "@/features/admin/courseApprovalDecisions/CourseApprovalDecisionsTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
export default function Page() {
    return (
        <CustomPageContent>
            <CourseApprovalDecisionsTable />
        </CustomPageContent>
    )
}