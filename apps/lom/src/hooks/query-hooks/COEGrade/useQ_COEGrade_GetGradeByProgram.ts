import { COEGrade } from '@/interfaces/shared-interfaces/COEGrade'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/COEGrade/GetGradeByProgram"

export default function useQ_COEGrade_GetGradeByProgram({
    params = "",
    option
}: {
    params?: string,
    option?: Partial<UseQueryOptions<COEGrade[], Error>>
} = {}) {
    const query = useQuery<COEGrade[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...option
    })
    return query
}
