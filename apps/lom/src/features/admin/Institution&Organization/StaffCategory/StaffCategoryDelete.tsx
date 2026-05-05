'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function StaffCategoryDelete({ id, code }: { id: number, code: string }) {
    return <CustomActionIconDelete contextData={code} onSubmit={() => {
        return baseAxios.post(`/Account/Delete`, {
            id: id,
            isEnabled: true
        });
    }}></CustomActionIconDelete>
}

