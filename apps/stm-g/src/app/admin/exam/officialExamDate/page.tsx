import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import ExamTable from "@/modules-features/admin/ModuleExam/ManageOfficialExamDate/ExamTable";
// import EditablePersonTable from "@/modules-features/admin/ModuleExam/ManageOfficialExamDate/EditTableExample";
// import TypesafeTableEdit from "@/modules-features/admin/ModuleExam/ManageOfficialExamDate/EditTableExample2";

export default function Page() {
    return (
        <MyPageContent>
            <ExamTable />
            {/* <EditablePersonTable /> */}
            {/* <TypesafeTableEdit /> */}
        </MyPageContent>
    )
}
