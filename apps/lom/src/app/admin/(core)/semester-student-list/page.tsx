// import SemesterStudentListRead from "@/features/admin/SemesterStudentList/SemesterStudentListRead";
import SemesterStudentTable from "@aq-fe/core-ui/features/core/semesterStudent/SemesterStudentTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Danh sách sinh viên học kỳ">
            <SemesterStudentTable />
        </CustomPageContent>
    );
}