import iamAxiosInstance from "@aq-fe/aq-core-framework/shared/configs/iamAxiosInstance";
import { CustomAPIResponse } from "@aq-fe/aq-core-framework/shared/interfaces/CustomAPIResponse";
import type {
  CreateRoleRequest,
  Role,
  UpdateRoleRequest
} from "@aq-fe/aq-core-framework/shared/interfaces/Role";
import { Permission } from "../interfaces/Permission";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { PagingParams } from "../libs/createBaseAPI";

const CONTROLLER = "/role";

export const roleService = {
  /** GET /api/role/{tenantId} - Lấy danh sách vai trò */
  getAll: ({ IsGlobal }: { IsGlobal?: boolean }) => {
    const tenantId = useAuthenticateStore.getState().state.tenantId
    return iamAxiosInstance.get<CustomAPIResponse<Role[]>>(`${CONTROLLER}/${tenantId}`, { params: { IsGlobal } });
  },

  /** GET /api/role/{id} - Lấy chi tiết vai trò */
  getById: (id: string) => {
    return iamAxiosInstance.get<CustomAPIResponse<Role>>(`${CONTROLLER}/${id}`);
  },

  /** POST /api/role - Tạo vai trò mới */
  create: (data: CreateRoleRequest) => {
    return iamAxiosInstance.post<CustomAPIResponse<Role>>(`${CONTROLLER}`, data);
  },

  /** PUT /api/role/{id} - Cập nhật vai trò */
  update: (id: string, data: UpdateRoleRequest) => {
    return iamAxiosInstance.put<CustomAPIResponse<Role>>(`${CONTROLLER}/${id}`, data);
  },

  /** DELETE /api/role/{id} - Xóa vai trò */
  delete: (id: string) => {
    return iamAxiosInstance.delete<CustomAPIResponse<Role>>(`${CONTROLLER}/${id}`);
  },

  /** POST /api/role/{id}/assign-permissions - Gán quyền cho vai trò */
  assignPermissions: (id: string, permissionIds: string[]) => {
    return iamAxiosInstance.post(`${CONTROLLER}/${id}/assign-permissions`, { permissionIds })
  },
  /** POST /api/role/{id}/unassign-permissions - Gỡ quyền khỏi vai trò */
  unassignPermissions: (id: string, permissionIds: string[]) => {
    return iamAxiosInstance.post(`${CONTROLLER}/${id}/unassign-permissions`, { permissionIds })
  },
  getPermissions: (id: string, pagingParams?: PagingParams) => {
    return iamAxiosInstance.get<CustomAPIResponse<Permission[]>>(`${CONTROLLER}/${id}/get-permissions`, {
      params: pagingParams,
    })
  },
  /** PATCH /api/role/{id}/activate - Kích hoạt/Vô hiệu hóa vai trò */
  activate: (id: string, status: number) => {
    return iamAxiosInstance.patch<CustomAPIResponse<any>>(`${CONTROLLER}/${id}/activate`, { status })
  },
};
