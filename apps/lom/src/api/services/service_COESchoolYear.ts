import { COESchoolYear } from "@/interfaces/shared-interfaces/COESchoolYear";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/AcademicYear"

export const service_COESchoolYear = {
    ...createBaseApi<COESchoolYear>(CONTROLLER, baseAxios),
    getAcademicYearByAQModule: () => {
        return baseAxios.get<CustomApiResponse<any[]>>(CONTROLLER + "/AcademicGetAll")
    }
}


