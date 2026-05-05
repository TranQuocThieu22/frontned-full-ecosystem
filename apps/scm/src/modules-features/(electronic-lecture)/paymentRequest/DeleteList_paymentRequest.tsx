'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function DeleteList_paymentRequest({ code }: { code: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => { }}></MyActionIconDelete>
}
