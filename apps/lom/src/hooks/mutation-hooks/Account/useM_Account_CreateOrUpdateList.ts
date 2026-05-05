import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useMutation } from '@tanstack/react-query'

interface IBody extends BaseEntity {
    aqModuleId: number,
    classId: number,
    fullName: string,
    dateOfBirth?: Date,
    passWord?: string,
}
export default function useM_Account_CreateOrUpdateList() {
    return useMutation({
        mutationFn: async (body: IBody[]) => {
            const res = await baseAxios.post("/Account/CreateOrUpdateList", body)
            return res
        }
    })
}
