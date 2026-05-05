import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { CourseRegistration } from "@/shared/interfaces/courseRegistration";

const CONTROLLER = "/CourseRegistration";

export const courseRegistrationService = {
  ...createBaseApi<CourseRegistration>(CONTROLLER, axiosInstance),
};

