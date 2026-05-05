import baseAxios from '@/api/config/baseAxios'
import { IExamAddress } from '@/interfaces/examAdress'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export default function useQ_Exam_GetExamAddress({ examId, options }: { examId?: string, options?: Partial<UseQueryOptions<IExamAddress[], Error>> }) {
    const query = useQuery<IExamAddress[]>({
        queryKey: ["useQ_Exam_GetExamAddress", examId],
        queryFn: async () => {
            const res = await baseAxios.get("Exam/GetExamAddress?examId=" + examId)
            return res.data.data
        },
        ...options
    })
    return query
}
