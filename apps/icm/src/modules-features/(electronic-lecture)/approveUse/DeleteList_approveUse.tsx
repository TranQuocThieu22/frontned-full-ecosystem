'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function DeleteList_approveUse({ id, code }: { id: number, code: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => { }}></MyActionIconDelete>
}

