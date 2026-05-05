import baseAxios from "@/api/config/baseAxios";
import { IScoreConfigs } from "@/interfaces/scoreConfigs";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IBaseEntity } from "aq-fe-framework/interfaces";

interface I extends IBaseEntity {
    scoreConfigs?: IScoreConfigs[]
}

export default function useQ_Program_ProgramDetail({
    options,
    params = ""
}: {
    options?: Partial<UseQueryOptions<I, Error>>,
    params?: string
} = {}) {
    const ENDPOINT = "/Program/ProgramDetail"
    const query = useQuery<I>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...options
    })
    return query
}
