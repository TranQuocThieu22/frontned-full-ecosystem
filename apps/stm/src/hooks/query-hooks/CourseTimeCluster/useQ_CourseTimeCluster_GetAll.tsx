import baseAxios from "@/api/config/baseAxios";
import { useQuery } from "@tanstack/react-query";

export default function useQ_CourseTimeCluster_GetAll() {
    const query = useQuery({
        queryKey: ["useQ_CourseTimeCluster_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/CourseTimeCluster/getall")
            return res.data.data
        }
    })
    return query
}
