import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Class } from '@/interfaces/shared-interfaces/Class'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useMutation } from '@tanstack/react-query'

export interface ICOECourseSectionStudent_Update extends BaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeCourseSectionId?: number
  note?: string
  coeCourseSection?: Class

}
export default function useM_ClassStudent_Update() {
  const ENDPOINT = "/Account/Update"
  const mutation = useMutation({
    mutationFn: async (body: ICOECourseSectionStudent_Update) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
