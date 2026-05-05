import baseAxios from "@/api/config/baseAxios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface I {
    id?: number,
    code?: string,
    name?: string,
}

export default function useQ_Program_GetAll({ options }: { options?: Partial<UseQueryOptions<I[], Error>> } = {}) {
    const query = useQuery<I[]>({
        queryKey: ["useQ_Program_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/program/getall")
            return res.data.data
        },
        ...options
    })
    return query
}
