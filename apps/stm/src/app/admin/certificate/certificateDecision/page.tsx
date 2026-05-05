import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import CertificateDecisionTable from "@/modules-features/admin/ModuleCertificate/CertificateDecision/CertificateDecisionTable";

export default function Page() {
    return (
        <>
            <MyPageContent
                title="Quyết định cấp chứng chỉ"
            >
                <CertificateDecisionTable />
            </MyPageContent>
        </>
    )
}