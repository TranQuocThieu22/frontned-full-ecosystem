import baseAxios from "@/api/config/baseAxios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface I {
    id?: number,
    code?: string,
    name?: string,
    programId?: number
}

export default function useQ_Exam_GetAll({ options }: { options?: Partial<UseQueryOptions<I[], Error>> } = {}) {
    const query = useQuery<I[]>({
        queryKey: ["useQ_Exam_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/exam/getall")
            return res.data.data
        },
        ...options
    })
    return query
}
