import { COEGradeSubject } from "@/interfaces/shared-interfaces/COEGradeSubject";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const ENDPOINT = "/COEGradeSubject"

export default function useM_COEGradeSubject({
    endpointSuffix = ""
}: {
    endpointSuffix: string
}) {
    const mutation = useMutation({
        mutationFn: async (body: COEGradeSubject[] | COEGradeSubject) => {
            const res = await baseAxios.post(ENDPOINT + endpointSuffix, body)
            return res
        }
    })
    return mutation
}
