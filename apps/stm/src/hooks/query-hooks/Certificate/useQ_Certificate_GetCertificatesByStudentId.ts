import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface IRes {
    certificate?: string
    decisionDate?: string,
    certificateNumber?: string
    filePath?: string
    fullName?: string
}

export function useQ_Certificate_GetCertificatesByStudentId({
    params = ""
}: {
    params?: string
}) {
    const ENDPOINT = "/Certificate/GetCertificatesByStudentId" + params
    const query = useQuery<IRes[]>({
        queryKey: [ENDPOINT],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT)
            return res.data.data
        }
    })
    return query
}
