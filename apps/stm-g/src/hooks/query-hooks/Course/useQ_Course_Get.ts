import baseAxios from "@/api/config/baseAxios";
import { IBaseBody, IBaseEntity } from "@/interfaces/base";
import { ICourseTimeClusters } from "@/interfaces/courseTimeClusters";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface IBody extends IBaseBody { }
interface IQ_Course_Get extends IBaseEntity {
    courseTimeClusters?: ICourseTimeClusters[]
}

export default function useQ_Course_Get({ params = "", options, body }: { params?: string, options?: Partial<UseQueryOptions<IQ_Course_Get[], Error>>, body: IBody }) {
    const query = useQuery<IQ_Course_Get[]>({
        queryKey: ["useQ_Course_Get"],
        queryFn: async () => {
            const res = await baseAxios.post("/course/get" + params, body)
            return res.data.data
        },
        ...options
    })
    return query
}
