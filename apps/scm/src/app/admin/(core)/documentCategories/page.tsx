"use client";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { F_documentCategories } from "aq-fe-framework/modules-features";

const const_object_documentTypes = {
    Security: 200,
    Refinement: 201,
    Guideline: 202,
    Regulations: 203,
    Workflow: 204,
    Form: 205,
};

export default function Page() {
    return (
        <MyPageContent>
            <F_documentCategories documentTypes={const_object_documentTypes} />
        </MyPageContent>
    );
}
