"use client"
import { object_documentTypes } from "@/constants/object/object_documentTypes";
import { F_systemUpdateDocs } from "@aq-fe/core-ui/features/core/systemUpdateDocs/F_systemUpdateDocs";

export default function Page() {
    return (
        <F_systemUpdateDocs RefinementTypeId={object_documentTypes.Refinement} />
    )
}
