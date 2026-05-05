import { Subject } from "@/shared/interfaces/subject";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/subject";

export const subjectService = {
    ...createBaseApi<Subject>(CONTROLLER, axiosInstance),
};

