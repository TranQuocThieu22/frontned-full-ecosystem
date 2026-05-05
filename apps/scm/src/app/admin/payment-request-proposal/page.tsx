'use client';
import PaymentRequestProposalTable from "@/modules-features/ModulePaymentRequestProposal/PaymentRequestTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return(
        <MyPageContent>
            <PaymentRequestProposalTable />
        </MyPageContent>
    )
}