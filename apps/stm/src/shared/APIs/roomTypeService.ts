import { RoomType } from "@/shared/interfaces/roomType";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/roomType";

export const roomTypeService = {
    ...createBaseApi<RoomType>(CONTROLLER, axiosInstance),
};
