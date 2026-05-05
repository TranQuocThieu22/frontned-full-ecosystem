'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function Delete_paymentRequest({ paymentCode }: { paymentCode: string }) {
    return <MyActionIconDelete contextData={paymentCode} onSubmit={() => { }}></MyActionIconDelete>
}

