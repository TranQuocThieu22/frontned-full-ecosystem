import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { DocumentAttribute } from "@aq-fe/core-ui/shared/interfaces/DocumentAttribute";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/DocumentAttribute"



interface Params {
  documentType?: number;
  id?: number;
}

export const service_documentAttribute = {
  ...createBaseApi<DocumentAttribute>(CONTROLLLER, axiosInstance),

  getByType: (params?: Params) => {
    return axiosInstance.get<CustomApiResponse<DocumentAttribute[]>>(`${CONTROLLLER}/GetByType`, { params })
  },

  getByDocumentAttribute: (params?: Params) => {
    return axiosInstance.get<CustomApiResponse<DocumentAttribute[]>>(`${CONTROLLLER}/GetByDocumentAttribute`, { params })
  },

}
