import baseAxios from "@/api/config/baseAxios"
import { useQuery } from "@tanstack/react-query"

interface I {
  id?: number,
  code?: string,
  name?: string
}
export default function useH3_2GetProgramType() {
  const query = useQuery<I[]>({
    queryKey: ["F3_2Form_programType"],
    queryFn: async () => {
      const result = await baseAxios.get("/programType/getall")
      return result.data.data
    }
  })
  return query
}
