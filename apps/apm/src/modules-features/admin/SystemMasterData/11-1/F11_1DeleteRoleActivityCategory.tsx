'use client'

import baseAxios from "@/api/baseAxios"
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export default function F11_1DeleteRoleActivityCategory(
    { roleActivityId }: { roleActivityId: number }
) {
    return (
        <MyActionIconDelete onSubmit={() => baseAxios.post("/role/delete", {
            "id": roleActivityId
        })}>

        </MyActionIconDelete>
    )
}
