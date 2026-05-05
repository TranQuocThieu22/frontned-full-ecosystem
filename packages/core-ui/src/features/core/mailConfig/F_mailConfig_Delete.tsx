import { CustomActionIconDelete } from '@aq-fe/core-ui/shared/components/button/CustomActionIconDelete'
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance'

export function F_mailConfig_Delete({ id, contextData }: { id?: number, contextData?: string }) {
    return (
        <CustomActionIconDelete
            contextData={contextData}
            onSubmit={() => {
                return axiosInstance.post("/EmailConfig/Delete", {
                    id: id
                })
            }}
        />
    )
}
