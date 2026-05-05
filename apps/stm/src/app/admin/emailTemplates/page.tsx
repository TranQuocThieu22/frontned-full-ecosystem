import EmailTemplatesTable from "@/features/admin/emailTemplates/EmailTemplatesTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";


export default function Page() {
    return (
        <CustomPageContent>
            <EmailTemplatesTable />
        </CustomPageContent>
    )
}
