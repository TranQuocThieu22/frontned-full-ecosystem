'use client'

import MyActionIconDelete from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F_joakzugxkqDelete({ id, maTieuChuan }: { id: number | number[], maTieuChuan: string }) {
    return (
        <MyActionIconDelete
            contextData={maTieuChuan}
            onSubmit={() => { }} ></MyActionIconDelete >
    )
}
