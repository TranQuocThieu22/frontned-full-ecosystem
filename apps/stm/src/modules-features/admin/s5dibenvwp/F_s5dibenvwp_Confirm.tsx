import useM_Course_CourseRegistration_UpdateCheck from "@/hooks/mutation-hooks/Course/useM_Course_CourseRegistrationCheck"
import { ICourseRegistration } from "@/interfaces/courseRegistration"
import { utils_notification_show } from "@/utils/notification"
import { Button } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"

export default function F_s5dibenvwp_Confirm({ data }: { data: ICourseRegistration[] }) {
    const queryClient = useQueryClient()
    const Course_CourseRegistrationCheck_Mutation = useM_Course_CourseRegistration_UpdateCheck({
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries()
                utils_notification_show({ crudType: "update" })
            }
        }
    })
    function handleCheckMultiple() {
        Course_CourseRegistrationCheck_Mutation.mutate(data.map(item => ({
            id: item.id,
            code: item.code,
            concurrencyStamp: item.concurrencyStamp,
            isCheck: item.isCheck,
            name: item.name,
            isEnabled: item.isEnabled,
            note: item.note
        })))
    }
    return (
        <Button disabled={data.length == 0} onClick={handleCheckMultiple}>Xác nhận</Button>
    )
}
