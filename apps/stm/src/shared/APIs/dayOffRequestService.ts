import { DayOffRequest } from "@/shared/interfaces/DayOffRequest";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/DayOffRequest";

export const dayOffRequestService = {
    ...createBaseApi<DayOffRequest>(CONTROLLER, axiosInstance),

    LecturerRequest: ({ param = "" }: { param?: string }) =>
        axiosInstance.get<CustomApiResponse<DayOffRequest[]>>(
            CONTROLLER + `/LecturerRequest?${param}`
        ),
};
