'use client'
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

const ENDPOINT = '/Account/delete'
export default function StudentDeleteActionIcon({ id }: { id: number }) {
    return (
        <CustomActionIconDelete
            onSubmit={async () =>
                await baseAxios.post(ENDPOINT, { id: id })
            }
        />
    )
}

