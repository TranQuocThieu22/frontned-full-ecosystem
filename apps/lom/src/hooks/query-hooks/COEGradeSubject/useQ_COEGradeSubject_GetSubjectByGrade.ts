import { COEGradeSubject } from "@/interfaces/shared-interfaces/COEGradeSubject";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "/COEGradeSubject/GetSubjectByGrade"

export default function useQ_COEGradeSubject_GetSubjectByGrade({
    params = ""
}: {
    params?: string
}) {
    const query = useQuery<COEGradeSubject[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        }
    })
    return query
}
