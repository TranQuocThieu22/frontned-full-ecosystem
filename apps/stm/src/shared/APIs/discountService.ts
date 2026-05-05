import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Discount";

export interface DiscountDetailResponse<T> {
  items: T[];
}

export const discountService = {
  getDetail: <T>(type: number) =>
    axiosInstance.get<CustomApiResponse<T[]>>(`${CONTROLLER}/GetDetail?type=${type}`),
};
