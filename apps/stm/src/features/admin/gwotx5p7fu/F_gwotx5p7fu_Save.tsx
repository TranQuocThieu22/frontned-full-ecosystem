import { MyButton } from '@/components/Buttons/Button/MyButton';
import { utils_notification_show } from '@/utils/notification';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import type { SystemParameter } from "@/shared/APIs/systemParameterService";

export default function F_gwotx5p7fu_Save() {
    const queryClient = useQueryClient()
    async function handleSubmit() {
        const query = queryClient.getQueryData<SystemParameter[]>(["systemParameters"])
        const res = await baseAxios.post("/SystemParameter/updatelist", query)
        if (res.status == 200) {
            utils_notification_show({ crudType: "update" })
            queryClient.invalidateQueries({ queryKey: ["systemParameters"] })
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
