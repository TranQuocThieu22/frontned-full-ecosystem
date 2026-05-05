import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useMutation } from '@tanstack/react-query'

export default function useM_ClassStudent_Delete() {
  const ENDPOINT = "/COECourseSectionStudent/Delete"
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await baseAxios.post(ENDPOINT, { id: id })
      return res
    }
  })
  return mutation
}
