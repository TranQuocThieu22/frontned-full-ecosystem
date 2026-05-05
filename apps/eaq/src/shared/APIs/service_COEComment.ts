import { IComment } from "@/shared/interfaces/comment/IComment";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLER = "/eaq/COEComment"

export const service_COEComment = {
    ...createBaseApi<IComment>(CONTROLLER, axiosInstance),
}

