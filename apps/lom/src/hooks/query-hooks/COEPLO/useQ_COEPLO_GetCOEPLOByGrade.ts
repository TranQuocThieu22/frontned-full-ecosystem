import { COEPLO } from '@/interfaces/shared-interfaces/COEPLO'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COEPLO_GetCOEPLOByGrade({ params = "" }: { params?: string } = {}) {
    const query = useQuery<COEPLO[]>({
        queryKey: ["useQ_COEPLO_GetCOEPLOByGrade", params],
        queryFn: async () => {
            const res = await baseAxios.get("/COEPLO/GetCOEPLOByGrade" + params)
            if (!res.data.isSuccess) throw Error("Có lỗi xảy ra!")
            return res.data.data
        }
    })
    return query
}
