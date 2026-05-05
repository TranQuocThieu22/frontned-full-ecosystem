'use client'

import baseAxios from "@/api/baseAxios"
import MyActionIconDelete from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F12_1Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => await baseAxios.post("/DocumentAttribute/Delete", { id: id })}></MyActionIconDelete>
    )
}
