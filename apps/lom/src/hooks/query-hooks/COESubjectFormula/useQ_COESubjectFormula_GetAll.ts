import { COESubjectFormula } from '@/interfaces/shared-interfaces/COESubjectFormula'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectFormula_GetAll() {
    const query = useQuery<COESubjectFormula[]>({
        queryKey: ["useQ_COESubjectFormula_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectFormula/getAll")

            return res.data.data
        },
        // enabled:enabled
    })
    return query
}
