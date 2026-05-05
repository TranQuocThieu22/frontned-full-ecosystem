import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

export interface SystemParameter {
  id?: number;
  code?: string;
  name?: number;
  value?: number;
}

const CONTROLLER = "/SystemParameter";

export const systemParameterService = {
  getAll: () =>
    axiosInstance.get<CustomApiResponse<SystemParameter[]>>(
      CONTROLLER + "/getall",
    ),
};

