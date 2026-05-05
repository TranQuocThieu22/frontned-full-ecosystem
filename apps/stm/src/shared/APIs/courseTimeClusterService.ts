import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { CourseTimeClusters } from "@/shared/interfaces/courseTimeClusters";

const CONTROLLER = "/CourseTimeCluster";

export const courseTimeClusterService = {
  ...createBaseApi<CourseTimeClusters>(CONTROLLER, axiosInstance),
};


