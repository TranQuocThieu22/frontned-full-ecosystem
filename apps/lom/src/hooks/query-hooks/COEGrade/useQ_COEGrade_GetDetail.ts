import { IGradeSubjectInfoViewModel } from '@/features/admin/Curriculum&Subject/ModuleGradeSubject/ConfigAMRI/Interfaces/Interfaces'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

const ENDPOINT = "/COEGrade/GetDetail"

export default function useQ_COEGrade_GetDetail({
    params = ""
}: {
    params?: string
} = {}) {
    const query = useQuery<IGradeSubjectInfoViewModel[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        }
    })
    return query
}
