import { COEProgram } from "@/interfaces/shared-interfaces/COEProgram";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useQ_COEProgram_GetAll(param?: string) {
    const query = useQuery<COEProgram[]>({
        queryKey: ["useQ_COEProgram_GetAll"],
        queryFn: async () => {
            if (param == undefined) {
                const res = await baseAxios.get(`/COEProgram/getAll`)
                return res.data.data
            }
            const res = await baseAxios.get(`/COEProgram/getAll?${param}`)
            return res.data.data
        }
    })
    return query
}
