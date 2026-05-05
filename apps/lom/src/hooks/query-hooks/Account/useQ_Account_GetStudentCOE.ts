import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { Account } from '@aq-fe/core-ui/shared/interfaces/Account'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export default function useQ_Account_GetStudentCOE({
   params = "",
   options
}: {
   params?: string
   options?: Partial<UseQueryOptions<Account[], Error>>
}) {
   const ENDPOINT = "/Account/GetStudentCOE"
   const query = useQuery<Account[]>({
      queryKey: [ENDPOINT + params],
      queryFn: async () => {
         const res = await baseAxios.get(ENDPOINT + params)
         return res.data.data
      },
      ...options
   })
   return query
}
