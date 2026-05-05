"use client";
import { F_documentCategories } from "@aq-fe/core-ui/features/core/documentCategories/F_documentCategories";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { object_documentTypes } from "../../../../constants/object/object_documentTypes";

export default function Page() {
    return (
        <CustomPageContent>
            <F_documentCategories documentTypes={object_documentTypes} />
        </CustomPageContent>
    );
}
