import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface Iprogram {
    id?: number,
    code?: string,
    name?: string
}
interface Ibranch {
    id?: number,
    code?: string,
    name?: string
}
interface Icourse {
    id?: number,
    code?: string,
    name?: string
}
interface Iexam {
    id?: number,
    code?: string,
    name?: string
}
export interface IPriceConfig {
    id?: number,
    type?: number,
    program?: Iprogram,
    branch?: Ibranch,
    course?: Icourse,
    exam?: Iexam,
    price?: number,
    concurrencyStamp?: string

}
export default function useQ_PriceConfig_GetByType({ type }: { type?: number } = {}) {
    const query = useQuery<IPriceConfig[]>({
        queryKey: ["useQ_PriceConfig_GetByType", type],
        queryFn: async () => {
            const res = await baseAxios.post("/PriceConfig/GetByType?type=" + type)
            return res.data.data
        },
        enabled: type != undefined,
        refetchOnWindowFocus: false
    })
    return query
}
