import { COECourseSection } from '@/interfaces/shared-interfaces/COECourseSection'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useMutation } from '@tanstack/react-query'

export default function useM_COECourseSection_UpdateList() {
  const ENDPOINT = "/COECourseSection/UpdateList"
  const mutation = useMutation({
    mutationFn: async (body: COECourseSection[]) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
