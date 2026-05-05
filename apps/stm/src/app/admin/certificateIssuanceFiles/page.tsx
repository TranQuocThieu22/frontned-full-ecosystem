import CertificateIssuanceFilesTable from "@/features/admin/certificateIssuanceFiles/CertificateIssuanceFilesTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Hồ sơ cấp chứng chỉ">
            <CertificateIssuanceFilesTable />
        </CustomPageContent>
    )
}
