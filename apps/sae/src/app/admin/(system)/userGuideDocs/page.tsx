"use client"
import { object_documentTypes } from "@/constants/object/object_documentTypes";
import { F_userGuideDocs } from "@aq-fe/core-ui/features/core/userGuideDocs/F_userGuideDocs";

export default function Page() {
    return (
        <F_userGuideDocs GuidelineTypeId={object_documentTypes.Guideline} />
    )
}
