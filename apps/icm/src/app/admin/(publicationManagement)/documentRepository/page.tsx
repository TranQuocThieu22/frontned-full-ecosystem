'use client'

import DocumentRepositoryRead from "@/modules-features/DocumentRepository/DocumentRepositoryRead";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <DocumentRepositoryRead />
        </MyPageContent>
    )
}
