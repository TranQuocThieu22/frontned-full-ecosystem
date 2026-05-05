import { ProgramType } from "@/shared/interfaces/programType";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/ProgramType";

export const programTypeService = {
    ...createBaseApi<ProgramType>(CONTROLLER, axiosInstance),
};

