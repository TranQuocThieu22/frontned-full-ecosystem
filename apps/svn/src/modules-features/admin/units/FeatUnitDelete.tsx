'use client'
import { MyActionIconDelete } from "aq-fe-framework/components";

export default function FeatSubjectDelete({ id, code }: { id: number, code: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={() => {

    }}></MyActionIconDelete>
}

