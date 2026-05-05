import { Branch } from "@/shared/interfaces/branch";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Branch";

export const branchService = {
    ...createBaseApi<Branch>(CONTROLLER, axiosInstance),
};
