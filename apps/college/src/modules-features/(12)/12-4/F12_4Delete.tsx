'use client'

import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";


export default function F12_4Delete({ id }: { id: number }) {
    return <MyActionIconDelete contextData={id.toString()} onSubmit={async () => await {}}></MyActionIconDelete>
}

