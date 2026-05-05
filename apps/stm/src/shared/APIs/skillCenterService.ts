import { SkillCenter } from "@/shared/interfaces/skillCenter";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/SkillCenter";

export const skillCenterService = {
    ...createBaseApi<SkillCenter>(CONTROLLER, axiosInstance),
};
