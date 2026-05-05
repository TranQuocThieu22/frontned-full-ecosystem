import { MyActionIconDelete } from "aq-fe-framework/components";
export default function ExpenseSettlementDeleteButton({ settlementCode }: { settlementCode: string }) {
    return (
        <MyActionIconDelete contextData={settlementCode} onSubmit={() => {}} />
    );
}