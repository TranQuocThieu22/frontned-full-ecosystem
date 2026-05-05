import { IBaseEntity } from '@/interfaces/IBaseEntity'
import baseAxios from '@/shared/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface ISkillCenter extends IBaseEntity {

}

export default function useQ_SkillCenter_GetAll() {
    const query = useQuery<ISkillCenter[]>({
        queryKey: [],
        queryFn: async () => {
            const res = await baseAxios.get("/SkillCenter/GetAll")
            return res.data.data
        }
    })
    return query
}
