'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

const ENDPOINT = "/Account/delete"
export default function F_core71678_Delete({ id, code }: { id: number, code: string }) {
    return (
        <MyActionIconDelete
            contextData={code}
            onSubmit={async () =>
                await baseAxios.post(ENDPOINT, { id: id })
            }
        />
    )
}

