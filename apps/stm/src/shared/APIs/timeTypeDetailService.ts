import { TimeClusterDetails } from "@/shared/interfaces/timeClusterDetails";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/TimeType";

export const timeTypeDetailService = {
    ...createBaseApi<TimeClusterDetails>(CONTROLLER, axiosInstance),
};
