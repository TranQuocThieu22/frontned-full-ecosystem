'use client'

import baseAxios from "@/api/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F11_3Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => await baseAxios.post("/DocumentAttribute/Delete", { id: id })}></MyActionIconDelete>
    )
}
