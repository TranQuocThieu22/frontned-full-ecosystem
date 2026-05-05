import { COESemester } from "@/interfaces/shared-interfaces/COESemester";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/ActivityPlan"

export const service_COESemester = {
    ...createBaseApi<COESemester>(CONTROLLER, baseAxios),
    getSemesterByAQModule: () => {
        return baseAxios.get<CustomApiResponse<any[]>>(CONTROLLER + "/ActivityPlanOnlyGetAll")
    }
}



