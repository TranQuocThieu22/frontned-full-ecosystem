import BranchCatalogTable from "@/features/admin/branchCatalog/BranchCatalogTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <BranchCatalogTable />
        </CustomPageContent>
    )
}
