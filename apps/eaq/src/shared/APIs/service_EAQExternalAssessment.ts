import { IExternalAssessment } from "@/shared/interfaces/externalAssessment/IExternalAssessment";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'EAQ/EAQExternalAssessment';

export const service_EAQExternalAssessment = {
  ...createBaseApi<IExternalAssessment>(CONTROLLER, axiosInstance),
};
