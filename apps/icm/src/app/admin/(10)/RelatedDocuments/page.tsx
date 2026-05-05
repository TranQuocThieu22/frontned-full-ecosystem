"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import RelatedDocumentsTable from "@/modules-features/(10)/ModuleRelatedDocuments/RelatedDocumentsTable";

export default function Page() {
    return (
        <MyPageContent>
            <RelatedDocumentsTable/>
        </MyPageContent>
    )
}
