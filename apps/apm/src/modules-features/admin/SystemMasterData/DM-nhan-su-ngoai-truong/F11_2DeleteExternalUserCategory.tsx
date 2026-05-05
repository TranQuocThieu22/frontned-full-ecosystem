'use client'

import baseAxios from "@/api/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F11_2DeleteExternalUserCategory(
    { externalUserId }: { externalUserId: number }
) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.delete("/userNCKHs/" + externalUserId)}></MyActionIconDelete>
    )
}
