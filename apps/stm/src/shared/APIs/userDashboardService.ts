import { ResGetAdminDashBoard } from "@/shared/interfaces/userDashboard";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/UserDashboard";

export const userDashboardService = {
    getAdminDashBoard: () =>
        axiosInstance.get<CustomApiResponse<ResGetAdminDashBoard>>(
            CONTROLLER + "/GetAdminDashBoard"
        ),
};
