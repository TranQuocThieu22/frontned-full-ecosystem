import iamAxiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/iamAxiosInstance";
import { CustomAPIResponse } from "@aq-fe/aq-legacy-framework/shared/interfaces/CustomAPIResponse";
import type { Tenant } from "@aq-fe/aq-legacy-framework/shared/interfaces/Tenant";
import { createBaseAPI, PagingParams } from "@aq-fe/aq-legacy-framework/shared/libs/iam/createBaseAPI";

const CONTROLLER = "/tenant";

export const tenantService = {
  ...createBaseAPI<Tenant>(CONTROLLER, iamAxiosInstance),
  getAll: (paging?: PagingParams) => {
    return iamAxiosInstance.get<CustomAPIResponse<Tenant[]>>(`${CONTROLLER}`, { params: paging })
  },
  update: (id?: string, name?: string) => {
    return iamAxiosInstance.put<CustomAPIResponse<Tenant>>(`${CONTROLLER}/${id}`, {
      name: name
    })
  },
  create: ({ body }: { body?: { code?: string, name?: string } }) => {
    return iamAxiosInstance.post<CustomAPIResponse<Tenant>>(`${CONTROLLER}`, body)
  },
  activate: (id: string, status: number) => {
    return iamAxiosInstance.patch<CustomAPIResponse<any>>(`${CONTROLLER}/${id}/activate`, { status })
  }
};
