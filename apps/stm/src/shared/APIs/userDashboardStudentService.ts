import { IUserDashboardData } from "@/features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/UserDashboard";

export const userDashboardStudentService = {
  getStudentDashboard: ({ params = "" }: { params?: string }) =>
    axiosInstance.get<CustomApiResponse<IUserDashboardData>>(
      CONTROLLER + "/GetStudentDashboard" + params,
    ),
};

