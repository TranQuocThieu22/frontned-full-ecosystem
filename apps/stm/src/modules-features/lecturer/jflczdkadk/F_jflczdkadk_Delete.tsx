'use client'

import baseAxios from "@/api/config/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F_jflczdkadk_Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => await baseAxios.post("/DocumentAttribute/Delete", { id: id })}></MyActionIconDelete>
    )
}
