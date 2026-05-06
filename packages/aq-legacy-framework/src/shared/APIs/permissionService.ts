import iamAxiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/iamAxiosInstance";
import { CustomAPIResponse } from "@aq-fe/aq-legacy-framework/shared/interfaces/CustomAPIResponse";
import { CreatePermissionRequest, GetByCategoryParams, Permission, UpdatePermissionRequest } from "@aq-fe/aq-legacy-framework/shared/interfaces/Permission";


const CONTROLLER = "/permission";

export const permissionService = {
  /** GET /api/permission/{id} */
  getById: (id: string) => {
    return iamAxiosInstance.get<CustomAPIResponse<Permission>>(`${CONTROLLER}/${id}`);
  },

  /** POST /api/permission/create */
  create: (data: CreatePermissionRequest) => {
    return iamAxiosInstance.post<CustomAPIResponse<Permission>>(`${CONTROLLER}/create`, data);
  },

  /** PUT /api/permission/{id}/update */
  update: (id: string, data: UpdatePermissionRequest) => {
    return iamAxiosInstance.put<CustomAPIResponse<Permission>>(`${CONTROLLER}/${id}/update`, data);
  },

  /** DELETE /api/permission/{id}/delete */
  delete: (id: string) => {
    return iamAxiosInstance.delete<CustomAPIResponse<Permission>>(`${CONTROLLER}/${id}/delete`);
  },

  /** GET /api/permission/get-by-category */
  getByCategory: (params: GetByCategoryParams) => {
    return iamAxiosInstance.get<CustomAPIResponse<Permission[]>>(`${CONTROLLER}/get-by-category`, {
      params,
    });
  },

  getAll: ({ category }: { category?: string } = {}) => {
    return iamAxiosInstance.get<CustomAPIResponse<Permission[]>>(`${CONTROLLER}`, { params: { category } });
  }
};
