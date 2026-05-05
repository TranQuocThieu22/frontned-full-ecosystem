import { COESubjectMethod } from '@/interfaces/shared-interfaces/COESubjectMethod'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectMethod_GetAll() {
    const query = useQuery<COESubjectMethod[]>({
        queryKey: ["useQ_COESubject_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectMethod/getAll")
            return res.data.data
        },
    })
    return query
}
