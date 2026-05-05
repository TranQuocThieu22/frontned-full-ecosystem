"use client";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { F_documentCategories } from "aq-fe-framework/modules-features";
import { object_documentTypes } from "../../../../constants/object/object_documentTypes";

export default function Page() {
    return (
        <MyPageContent>
            <F_documentCategories documentTypes={object_documentTypes} />
        </MyPageContent>
    );
}
