'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";


export default function F_MIT_Delete({ id }: { id: number }) {
    return <CustomActionIconDelete onSubmit={async () => {
        return baseAxios.post("COEMITScale/Delete", {
            "id": id,
            "isEnabled": true
        })
    }}></CustomActionIconDelete>
}

