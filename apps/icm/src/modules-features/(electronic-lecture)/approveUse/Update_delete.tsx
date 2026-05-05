'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function Update_delete({ id, code }: { id: string, code: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => { }}></MyActionIconDelete>
}
