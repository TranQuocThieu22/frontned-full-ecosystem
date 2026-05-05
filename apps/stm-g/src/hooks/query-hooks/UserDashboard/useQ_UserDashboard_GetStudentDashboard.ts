import baseAxios from '@/api/config/baseAxios'
import { IUserDashboardData } from '@/modules-features/student/emsiqqmzrm/interfaces/StudentDashBoard'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'


export default function useQ_UserDashboard_GetStudentDashboard({
    params = "",
    options
}: {
    params?: string,
    options?: Partial<UseQueryOptions<IUserDashboardData, Error>>
}) {
    const query = useQuery<IUserDashboardData>({
        queryKey: ["/UserDashboard/GetStudentDashboard" + params],
        queryFn: async () => {
            const res = await baseAxios.get("/UserDashboard/GetStudentDashboard" + params)
            return res.data.data
        },
        ...options
    })
    return query
}
