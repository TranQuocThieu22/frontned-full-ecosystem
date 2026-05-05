'use client'

import PublicationCatalogRead from "@/modules-features/PublicationCatalog/PublicationCatalogRead";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <PublicationCatalogRead />
        </MyPageContent>
    )
}
