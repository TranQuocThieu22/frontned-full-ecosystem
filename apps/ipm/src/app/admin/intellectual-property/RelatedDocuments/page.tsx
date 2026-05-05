"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import RelatedDocumentsTable from "@/modules-features/IntellectualProperty/ModuleRelatedDocuments/RelatedDocumentsTable";

export default function Page() {
    return (
        <MyPageContent>
            <RelatedDocumentsTable />
        </MyPageContent>
    )
}
