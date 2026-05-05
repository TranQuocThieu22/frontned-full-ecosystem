import baseAxios from "@/api/config/baseAxios";
import { useQuery } from "@tanstack/react-query";

export default function useQ_CertificateReviewBatch_GetAll() {
    const query = useQuery({
        queryKey: ["useQ_CertificateReviewBatch_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/CertificateReviewBatch/getAll")
            return res.data.data
        }
    })
    return query
}
