import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

// Response type is not fully modeled; use unknown for now.
export type CourseTimeClusterDashboard = unknown;

const CONTROLLER = "/CourseTimeCluster";

export const courseTimeClusterDashboardService = {
  getAll: () =>
    axiosInstance.get<CustomApiResponse<CourseTimeClusterDashboard[]>>(
      CONTROLLER + "/getall",
    ),
};

