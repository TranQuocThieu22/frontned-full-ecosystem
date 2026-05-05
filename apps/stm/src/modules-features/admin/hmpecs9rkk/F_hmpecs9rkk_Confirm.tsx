import useM_Exam_ExamRegistrationCheck from "@/hooks/mutation-hooks/Exam/useM_Exam_ExamRegistrationCheck"
import { IExamRegistration } from "@/interfaces/examRegistration"
import { utils_notification_show } from "@/utils/notification"
import { Button } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"

export default function F_hmpecs9rkk_Confirm({ data }: { data: IExamRegistration[] }) {
    const queryClient = useQueryClient()
    const Exam_ExamRegistrationCheck_Mutation = useM_Exam_ExamRegistrationCheck({
        options: {
            onSuccess: () => {
                queryClient.invalidateQueries()
                utils_notification_show({ crudType: "update" })
            }
        }
    })
    function handleCheckMultiple() {
        Exam_ExamRegistrationCheck_Mutation.mutate(data.map(item => ({
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
