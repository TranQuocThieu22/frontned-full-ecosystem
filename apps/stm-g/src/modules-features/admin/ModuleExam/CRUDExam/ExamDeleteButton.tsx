'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";

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

