import CourseListTable from "@/features/admin/courseList/CourseListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <CourseListTable />
        </CustomPageContent>
    );
}

