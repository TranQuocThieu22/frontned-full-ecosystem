import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { EmailTemplate } from "@/interfaces/emailTemplate";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "EmailTemplate";

export const service_emailTemplate = {
  ...createBaseApi<EmailTemplate>(`${CONTROLLER}`, axiosInstance),
};
