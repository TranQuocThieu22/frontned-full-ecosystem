import baseAxios from '@/api/config/baseAxios'
import { IExamRegistration } from '@/interfaces/examRegistration'
import { useMutation } from '@tanstack/react-query'

export default function useM_Exam_ExamRegistration() {
    const mutation = useMutation({
        mutationFn: async (body: IExamRegistration[]) => {
            const res = await baseAxios.post("/Exam/ExamRegistration", body)
            return res
        }
    })
    return mutation
}
