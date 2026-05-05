import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useMutation } from '@tanstack/react-query';

export interface ICOECourseSectionStudent_Create extends BaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  classId?: number
  passwordHash?: string,

}
export default function useM_ClassStudent_Create() {
  const ENDPOINT = "/Account/Create"
  const mutation = useMutation({
    mutationFn: async (body: ICOECourseSectionStudent_Create) => {
      const res = await baseAxios.post(ENDPOINT, body)
      return res
    }
  })
  return mutation
}
` `