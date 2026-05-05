import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import {Document} from "@aq-fe/core-ui/shared/interfaces/Document";

const CONTROLLLER = "/Document"

export const service_document = {
  ...createBaseApi<Document>(CONTROLLLER, axiosInstance),

  getByType: (documentType?: number) => {
    return axiosInstance.get<CustomApiResponse<Document[]>>(`${CONTROLLLER}/GetByType`, { params: { documentType } })
  },

  getByDocumentAttribute: (id?: number) => {
    return axiosInstance.get<CustomApiResponse<Document[]>>(`${CONTROLLLER}/GetByDocumentAttribute`, { params: { id } })
  },

}
