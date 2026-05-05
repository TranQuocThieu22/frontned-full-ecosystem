'use client'

import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

export default function F_uqjkcmbrwq_Delete({ id, code }: { id: number, code: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={async () => {
        await baseAxios.post(`/Account/Delete`, {
            id: id,
            isEnabled: true
        });
    }}></MyActionIconDelete>
}
