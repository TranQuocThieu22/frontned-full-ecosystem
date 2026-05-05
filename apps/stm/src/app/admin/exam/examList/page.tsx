import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import ExamTable from "@/modules-features/admin/ModuleExam/CRUDExam/ExamTable";

export default function Page() {
    return (
        <MyPageContent>
            <ExamTable />
        </MyPageContent>
    )
}
