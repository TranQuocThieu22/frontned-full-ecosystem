import { MyActionIconDelete } from '@/components'
import baseAxios from '@/shared/config/baseAxios'

export function F_mailConfig_Delete({ id, contextData }: { id?: number, contextData?: string }) {
    return (
        <MyActionIconDelete
            contextData={contextData}
            onSubmit={() => {
                return baseAxios.post("/EmailConfig/Delete", {
                    id: id
                })
            }}
        />
    )
}
