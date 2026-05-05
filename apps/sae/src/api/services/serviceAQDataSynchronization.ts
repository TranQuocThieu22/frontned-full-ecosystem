import { StudentActivityScore } from "@/interfaces/studentActivityScore";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'AQDataSynchronization';


export const serviceAQDataSynchronization = {
    ...createBaseApi<StudentActivityScore>(`${CONTROLLER}`, axiosInstance),

    GetScoreTransformFilter: (body: GetScoreTransformFilterViewModel) => {
        return axiosInstance.post<CustomApiResponse<StudentActivityScore[]>>(`${CONTROLLER}/GetScoreTransformFilter`, body);
    },
    AQScoreTransform: (params: AQScoreTransformViewModel) => {
        return axiosInstance.post<CustomApiResponse<any[]>>(
            `${CONTROLLER}/AQScoreTransform`,
            null,  // Empty body
            { params }  // Query parameters
        );
    },
}

interface GetScoreTransformFilterViewModel {
    activityPlanId?: number,
    pageSize?: number,
    pageNumber?: number
}

interface AQScoreTransformViewModel {
    activityplanCode?: string
    type?: number
}
