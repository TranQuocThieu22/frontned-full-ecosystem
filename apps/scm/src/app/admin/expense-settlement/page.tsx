'use client';
import PaymentSettlementTable from "@/modules-features/ModuleExpenseSettlement/ExpenseSettlementTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return(
        <MyPageContent>
            <PaymentSettlementTable />
        </MyPageContent>
    )
}