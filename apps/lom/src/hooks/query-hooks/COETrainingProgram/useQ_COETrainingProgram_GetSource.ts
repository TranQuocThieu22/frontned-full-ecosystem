import { COETrainingProgram } from '@/interfaces/shared-interfaces/COETrainingProgram'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COETrainingProgram_GetSource() {
    const query = useQuery<COETrainingProgram[]>({
        queryKey: ["useQ_COETrainingProgram_GetSource"],
        queryFn: async () => {
            const res = await baseAxios.get("/COEGrade/GetSource")
            return res.data.data
        }
    })
    return query
}
