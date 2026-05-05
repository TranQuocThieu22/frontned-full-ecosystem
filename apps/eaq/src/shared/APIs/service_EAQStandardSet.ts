import { IStandardSet } from "@/shared/interfaces/standardSet/StandardSet";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

// Ví dụ tạo service
const CONTROLLER = "eaq/EAQStandardSet";

export const service_EAQStandardSet = {
  ...createBaseApi<BaseEntity>(CONTROLLER, axiosInstance),
  GetStandardSets: () => {
    return axiosInstance.get<CustomApiResponse<IStandardSet[]>>(CONTROLLER + "/GetStandardSets");
  },
};
