import { IStandard } from "@/shared/interfaces/standard/Standard";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

// Ví dụ tạo service
const CONTROLLER = "eaq/EAQStandard";

export const service_EAQStandard = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IStandard>(CONTROLLER, axiosInstance),
  GetAllByEAQStandardSetId: (params: { eaqStandardSetId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IStandard[]>>(CONTROLLER + "/GetAllByEAQStandardSetId", {
      params,
    });
  },
};
