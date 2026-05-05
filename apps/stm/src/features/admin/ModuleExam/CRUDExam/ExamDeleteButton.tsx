'use client'
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";

export default function ExamDeleteButton({ examId }: { examId: number }) {
    return (
        <MyActionIconDelete onSubmit={async () => {
            await baseAxios.post(`/Exam/Delete`, {
                id: examId,
                isEnabled: false
            });
        }} />
    )
}

