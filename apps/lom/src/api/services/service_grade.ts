import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/coeGrade"

export const service_grade = {
    ...createBaseApi<COEGrade>(CONTROLLER, baseAxios),
    getSource: () => {
        return baseAxios.get<CustomApiResponse<COEGrade[]>>(CONTROLLER + `/getSource`)
    }
}

