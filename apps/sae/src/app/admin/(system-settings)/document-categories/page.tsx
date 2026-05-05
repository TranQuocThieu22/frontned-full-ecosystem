"use client";
import { object_documentTypes } from "@/constants/object/object_documentTypes";
import { F_documentCategories } from "@aq-fe/core-ui/features/core/documentCategories/F_documentCategories";


export default function Page() {
    return (
        <F_documentCategories documentTypes={object_documentTypes} />
    );
}
