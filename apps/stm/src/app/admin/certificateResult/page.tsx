import CertificateResultTable from "@/features/admin/certificateResult/CertificateResultTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Kết quả xét chứng chỉ">
            <CertificateResultTable />
        </CustomPageContent>
    )
}
