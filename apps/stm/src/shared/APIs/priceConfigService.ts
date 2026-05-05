import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

export interface PriceConfig {
  id?: number;
  type?: number;
  program?: { id?: number; code?: string; name?: string };
  branch?: { id?: number; code?: string; name?: string };
  course?: { id?: number; code?: string; name?: string };
  exam?: { id?: number; code?: string; name?: string };
  price?: number;
  concurrencyStamp?: string;
}

const CONTROLLER = "/PriceConfig";

export const priceConfigService = {
  ...createBaseApi<PriceConfig>(CONTROLLER, axiosInstance),

  getByType: ({ type }: { type: number }) =>
    axiosInstance.post<CustomApiResponse<PriceConfig[]>>(
      `${CONTROLLER}/GetByType?type=${type}`,
    ),
};


