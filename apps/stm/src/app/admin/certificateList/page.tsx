import CertificateListTable from "@/features/admin/certificateList/CertificateListTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent title="Danh mục chứng chỉ">
            <CertificateListTable />
        </CustomPageContent>
    )
}
