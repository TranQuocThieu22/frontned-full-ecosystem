import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from "@tanstack/react-query"

interface I {
  id?: number,
  code?: string,
  name?: string
}
export default function useH12_4GetSkillCenter() {
  const query = useQuery<I[]>({
    queryKey: ["useH12_4GetSkillCenter"],
    queryFn: async () => {
      const res = await baseAxios.get("/skillCenter/getall")
      return res.data.data
    }
  })
  return query
}
