import baseAxios from "@/api/config/baseAxios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface I {
    id?: number,
    code?: string,
    name?: string,
}

export default function useQ_Course_GetAll({ params = "", options }: { params?: string, options?: Partial<UseQueryOptions<I[], Error>> } = {}) {
    const query = useQuery<I[]>({
        queryKey: ["useQ_Course_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/course/getall" + params)
            return res.data.data
        },
        ...options
    })
    return query
}
