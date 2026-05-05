import CreateCertificateReviewBatchTable from "@/features/admin/createCertificateReviewBatch/CreateCertificateReviewBatchTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <CreateCertificateReviewBatchTable />
        </CustomPageContent>
    )
}
