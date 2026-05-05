import baseAxios from '@/api/config/baseAxios'
import { MyButton } from '@/components/Buttons/Button/MyButton'
import { ISystemParameter } from '@/hooks/query-hooks/SystemParameter/useQ_SystemParameter_GetAll'
import { utils_notification_show } from '@/utils/notification'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'

export default function F_gwotx5p7fu_Save() {
    const queryClient = useQueryClient()
    async function handleSubmit() {
        const query = queryClient.getQueryData<ISystemParameter[]>(["useQ_SystemParameter_GetAll"])
        const res = await baseAxios.post("/SystemParameter/updatelist", query)
        if (res.status == 200) {
            utils_notification_show({ crudType: "update" })
            queryClient.invalidateQueries({ queryKey: ["useQ_SystemParameter_GetAll"] })
            return
        }
        notifications.show({
            message: "Có lỗi xảy ra",
            color: "red"
        })

    }
    return (
        <MyButton crudType='save' onClick={handleSubmit} />
    )
}
