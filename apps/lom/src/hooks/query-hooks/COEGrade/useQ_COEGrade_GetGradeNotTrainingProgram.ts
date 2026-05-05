import { COEGrade } from '@/interfaces/shared-interfaces/COEGrade'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

const ENDPOINT = "/COEGrade/GetGradeNotTrainingProgram"

export default function useQ_COEGrade_GetGradeNotTrainingProgram() {
    const query = useQuery<COEGrade[]>({
        queryKey: [ENDPOINT],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT)
            return res.data.data
        }
    })
    return query
}
