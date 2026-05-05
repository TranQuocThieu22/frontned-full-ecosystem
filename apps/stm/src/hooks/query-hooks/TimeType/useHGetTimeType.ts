import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface ItimeTypeDetails {
    id?: number,
    code?: string,
    name?: string,
    order?: number,
    startHour?: Date,
    minuteNumber?: number
}

interface I {
    id?: number,
    name?: string,
    code?: string,
    classPeriodAfternoon?: number,
    classPeriodEvening?: number,
    classPeriodMorning?: number,
    timeTypeDetails?: ItimeTypeDetails[]
}

export default function useHGetTimeType({ params }: { params?: string } = {}) {
    const query = useQuery<I[]>({
        queryKey: ["useHGetTimeType"],
        queryFn: async () => {
            const result = await baseAxios.get(`/timetype/getall${params ?? ""}`)
            return result.data.data
        }
    })
    return query
}
