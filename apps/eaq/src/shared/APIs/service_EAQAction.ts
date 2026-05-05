import { IAction } from "@/shared/interfaces/action/IAction";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "eaq/EAQAction";

export const service_EAQAction = {
  ...createBaseApi<IAction>(CONTROLLER, axiosInstance),
};
