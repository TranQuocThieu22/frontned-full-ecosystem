import { Holiday } from "@/features/admin/officialExamDate/interfaces";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Holiday";

export const holidayService = {
  getAll: () => axiosInstance.get<CustomApiResponse<Holiday[]>>(CONTROLLER + "/GetAll"),
};

