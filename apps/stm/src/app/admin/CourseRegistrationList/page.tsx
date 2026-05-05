import CourseRegistrationListTable from "@/features/admin/courseRegistrationList/CourseRegistrationListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <CourseRegistrationListTable />
        </CustomPageContent>
    );
}
