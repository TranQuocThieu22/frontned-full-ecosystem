import { TimeType } from "@/shared/interfaces/timeType";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/TimeType";

export const timeTypeService = {
    ...createBaseApi<TimeType>(CONTROLLER, axiosInstance),
    /** Backend expects POST /timeType/update (lowercase) */
    update: (body: Partial<TimeType>) =>
        axiosInstance.post<CustomApiResponse<TimeType>>("/timeType/update", body),
};
