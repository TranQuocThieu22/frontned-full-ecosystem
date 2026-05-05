import baseAxios from "@/api/config/baseAxios";
import { ICertificateResult } from "@/interfaces/certificateResult";
import { useQuery } from "@tanstack/react-query";

export default function useQ_CertificateResult_GetCertificateResultDecision() {
    const query = useQuery<ICertificateResult[]>({
        queryKey: [],
        queryFn: async () => {
            const res = await baseAxios.get("/CertificateResult/GetCertificateResultDecision?cols=User%2CExam")
            return res.data.data
        }
    })
    return query
}
