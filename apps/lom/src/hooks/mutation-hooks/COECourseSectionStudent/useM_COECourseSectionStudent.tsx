import { COECourseSectionStudent } from "@/interfaces/shared-interfaces/COECourseSectionStudent";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const ENDPOINT = "/COECourseSectionStudent"
export default function useM_COECourseSectionStudent({
    endpointSuffix = ""
}: {
    endpointSuffix: string
}) {
    const query = useMutation({
        mutationFn: async (body: COECourseSectionStudent | COECourseSectionStudent[]) => {
            const res = await baseAxios.post(ENDPOINT + endpointSuffix, body)
            return res.data.data
        },
    })
    return query
}
