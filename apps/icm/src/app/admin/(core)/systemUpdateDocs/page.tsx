"use client"
import { const_object_documentTypes } from "@/const";
import { MyPageContent } from "aq-fe-framework/components";
import { F_systemUpdateDocs } from "aq-fe-framework/modules-features";

export default function Page() {
    return (
        <MyPageContent>
            <F_systemUpdateDocs RefinementTypeId={const_object_documentTypes.Refinement} />
        </MyPageContent>
    )
}
