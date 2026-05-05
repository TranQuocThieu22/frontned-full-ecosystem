import baseAxios from '@/api/config/baseAxios';
import { useQuery } from '@tanstack/react-query';


interface Isubjects {
    id?: number,
    code?: string,
    name?: string,
    hours?: number,
    classPeriodNumber?: number
}
interface IprogramSubjects {
    id?: number,
    code?: string,
    name?: string,
    programId?: number,
    subjectId?: number,
    subject?: Isubjects
    concurrencyStamp?: string,
    isEnabled?: boolean
}
interface I {
    id?: number
    programSubjects?: IprogramSubjects[]
}

export default function useH3_2GetProgramSubject({ id, enable }: { id: number, enable: boolean }) {
    const query = useQuery<I>({
        queryKey: ["H3_2GetProgramSubject"],
        queryFn: async () => {
            const result = await baseAxios.get("/program/programdetail?programid=" + id)
            return result.data.data
        },
        enabled: enable
    })
    return query
}
