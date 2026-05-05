'use client';
import ContentApprovalTable from "@/modules-features/ModuleContentApproval/ContentApprovalTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <ContentApprovalTable />
        </MyPageContent>
    );
}