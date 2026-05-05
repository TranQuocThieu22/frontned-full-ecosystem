import CertificateDecisionTable from "@/features/admin/certificateDecision/CertificateDecisionTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Quyết định cấp chứng chỉ">
            <CertificateDecisionTable />
        </CustomPageContent>
    )
}
