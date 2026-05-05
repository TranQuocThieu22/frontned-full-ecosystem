"use client"
import { F_documentCategories } from '@/modules-features';
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
        <F_documentCategories documentTypes={const_object_documentTypes} />
    )
}
