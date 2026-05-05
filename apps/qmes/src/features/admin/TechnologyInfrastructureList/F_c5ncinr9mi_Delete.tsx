'use client'

import MyActionIconDelete from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconDelete"


export default function F_c5ncinr9mi_Delete({ id, ma }: { id?: number, ma: string }) {
    return (
        <>
            <MyActionIconDelete
                contextData={ma}
                onSubmit={() => {
                }}>
            </MyActionIconDelete>

        </>
    )
}

