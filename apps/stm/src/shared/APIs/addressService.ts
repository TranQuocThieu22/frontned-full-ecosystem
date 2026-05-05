import { Address } from "@/shared/interfaces/address";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Address";

export const addressService = {
    ...createBaseApi<Address>(CONTROLLER, axiosInstance),
};
