'use client'
import GiftCatalogTable from "@/features/admin/GiftCatalog/GiftCatalogTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <GiftCatalogTable />
        </CustomPageContent>
    )
}

