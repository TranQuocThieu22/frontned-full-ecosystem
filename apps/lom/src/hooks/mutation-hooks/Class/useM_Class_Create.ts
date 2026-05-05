import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"
import { useMutation } from '@tanstack/react-query'
export interface ClassCreate extends BaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeCourseSectionId?: number
  note?: string
}
export default function useM_Class_Create() {
  const ENDPOINT = "/Class/Create"
  const mutation = useMutation({
    mutationFn: async (body: ClassCreate) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}