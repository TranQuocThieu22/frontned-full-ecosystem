'use client'

import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"

export default function F_jflczdkadk_Delete({ id }: { id: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => await baseAxios.post("/DocumentAttribute/Delete", { id: id })}></MyActionIconDelete>
    )
}
