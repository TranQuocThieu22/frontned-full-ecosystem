import CandidateListTable from "@/features/admin/candidateList/CandidateListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <CandidateListTable />
        </CustomPageContent>
    )
}
