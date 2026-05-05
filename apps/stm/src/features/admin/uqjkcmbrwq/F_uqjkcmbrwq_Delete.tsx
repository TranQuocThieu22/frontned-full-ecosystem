'use client'

import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function F_uqjkcmbrwq_Delete({ id, code }: { id: number, code: string }) {
    return <MyActionIconDelete contextData={code} onSubmit={async () => {
        await baseAxios.post(`/Account/Delete`, {
            id: id,
            isEnabled: true
        });
    }}></MyActionIconDelete>
}
