import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import CourseSectionTable from "@/modules-features/admin/ModuleCourseSection/CourseSectionList/CourseSectionTable";

export default function Page() {
    return (
        <MyPageContent>
            <CourseSectionTable />
        </MyPageContent>
    )
}
