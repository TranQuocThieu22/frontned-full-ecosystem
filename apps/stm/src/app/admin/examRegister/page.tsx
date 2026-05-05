import ExamRegisterListTable from "@/features/admin/examRegisterList/ExamRegisterListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <ExamRegisterListTable />
        </CustomPageContent>
    )
}
