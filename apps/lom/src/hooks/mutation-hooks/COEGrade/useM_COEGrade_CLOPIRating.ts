import { COECLOPI } from '@/interfaces/shared-interfaces/COECLOPi'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useMutation } from '@tanstack/react-query'

export default function useM_COEGrade_CLOPIRating() {
    const mutation = useMutation({
        mutationFn: async (body: COECLOPI[]) => {
            const res = await baseAxios.post("/COEGrade/CLOPIRating", body)
            return res
        }
    })
    return mutation
}
