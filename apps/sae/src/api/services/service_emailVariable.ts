import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { EmailVariable } from "@/interfaces/emailVariable";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = "EmailVariable";

export const service_emailVariable = {
  ...createBaseApi<EmailVariable>(`${CONTROLLER}`, axiosInstance),
};
