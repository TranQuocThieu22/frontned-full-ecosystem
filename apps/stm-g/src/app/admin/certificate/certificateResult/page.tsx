import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import CertificateResultTable from "@/modules-features/admin/ModuleCertificate/CertificateResult/CertificateResultTable";

export default function Page() {
    return (
        <MyPageContent>
            <CertificateResultTable />
        </MyPageContent>
    );
}