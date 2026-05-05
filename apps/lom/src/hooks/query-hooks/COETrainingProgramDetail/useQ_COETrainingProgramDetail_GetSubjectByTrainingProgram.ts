import { COESubjectByTrainingProgram } from '@/interfaces/shared-interfaces/COESubjectByTrainingProgram'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COETrainingProgramDetail_GetSubjectByTrainingProgram({ trainingProgramId, cols = "COESubject,COESemester,COESubjectGroup", enabled }: { trainingProgramId: number, cols?: string, enabled: boolean }) {
    const query = useQuery<COESubjectByTrainingProgram[]>({
        queryKey: [`useQ_COETrainingProgramDetail_GetSubjectByTrainingProgram_${trainingProgramId}`],
        queryFn: async () => {
            const res = await baseAxios.get(`/COEGradeSubject/GetSubjectByGrade?COEGradeId=${trainingProgramId}&cols=${cols}`)
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
