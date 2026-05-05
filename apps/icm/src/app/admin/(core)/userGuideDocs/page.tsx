"use client"
import { const_object_documentTypes } from "@/const";
import { MyPageContent } from "aq-fe-framework/components";
import { F_userGuideDocs } from "aq-fe-framework/modules-features";

export default function Page() {
    return (
        <MyPageContent>
            <F_userGuideDocs GuidelineTypeId={const_object_documentTypes.Guideline} />
        </MyPageContent>
    )
}
