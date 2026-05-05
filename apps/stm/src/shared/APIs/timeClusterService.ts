import { TimeCluster } from "@/shared/interfaces/timeCluster";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/TimeCluster";

export const timeClusterService = {
    ...createBaseApi<TimeCluster>(CONTROLLER, axiosInstance),
};
