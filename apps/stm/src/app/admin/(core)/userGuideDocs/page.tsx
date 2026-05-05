"use client"
import { object_documentTypes } from "@/constants/object/object_documentTypes";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { F_userGuideDocs } from "aq-fe-framework/modules-features";

export default function Page() {
    return (
        <CustomPageContent>
            <F_userGuideDocs GuidelineTypeId={object_documentTypes.Guideline} />
        </CustomPageContent>
    )
}
