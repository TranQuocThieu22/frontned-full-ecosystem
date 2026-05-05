import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import CourseTable from "@/modules-features/admin/ModuleCourse/CRUDCourse/CourseTable";

export default function Page() {
    return (
        <MyPageContent>
            <CourseTable />
        </MyPageContent>
    )
}
