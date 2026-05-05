import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


// Ví dụ tạo service
const CONTROLLER = "eaq/EAQCriteria";

export const service_EAQCriteria = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<ICriteria>(CONTROLLER, axiosInstance),
  GetEAQCriteriaByEAQStandardSetId: (eaqStandardSetId?: number) => {
    return axiosInstance.get<CustomApiResponse<ICriteria[]>>(
      CONTROLLER +
      `/GetEAQCriteriaByEAQStandardSetId?eaqStandardSetId=${eaqStandardSetId}`
    );
  },
  getById: (id: number) => {
    return axiosInstance.get<CustomApiResponse<ICriteria>>(
      CONTROLLER + "/GetById",
      { params: { id: id, cols: "EAQStandard" }, }
    );
  },
};
