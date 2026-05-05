import baseAxios from '@/api/config/baseAxios'
import { IAddress } from '@/interfaces/address'
import { useQuery } from '@tanstack/react-query'

export default function useQ_Address_GetAll({ params = "" }: { params?: string } = {}) {
  const query = useQuery<IAddress[]>({
    queryKey: ["useQ_Address_GetAll"],
    queryFn: async () => {
      const res = await baseAxios.get("/address/getall" + params)
      return res.data.data
    }
  })
  return query
}
