import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import CourseSectionScheduleTable from "@/modules-features/admin/ModuleCourseSectionSchedule/CheckAttendance/CourseSectionScheduleTable";

export default function Page() {
    return (
        <MyPageContent>
            <CourseSectionScheduleTable />
        </MyPageContent>
    )
}