"use client"

import { documentTypesObject } from "@/shared/consts/object/documentTypesObject";
import { F_documentCategories } from "@aq-fe/core-ui/features/core/documentCategories/F_documentCategories";

export default function Page() {
    return (
        <F_documentCategories documentTypes={documentTypesObject} />

    )
}
