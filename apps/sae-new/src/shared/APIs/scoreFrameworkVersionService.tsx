import { CreateVersionBody, ScoreFrameworkVersionDetail, UpdateVersionBody } from "@/features/admin/scoreFrameworkVersion/shared/types";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { CustomAPIResponse } from "@aq-fe/aq-core-framework/shared/interfaces/CustomAPIResponse";
import { createBaseAPI } from "@aq-fe/aq-core-framework/shared/libs/createBaseAPI";
import axiosInstance from "../configs/axiosInstance";
import { CustomAPIResponseWithPaging } from "../interfaces/CustomAPIResponse";
import { ScoreFrameworkVersion } from "../interfaces/ScoreFrameworkVersion";

const CONTROLLER = "/scoreframeworkversion";

export const scoreFrameworkVersionService = {
  ...createBaseAPI<ScoreFrameworkVersion>(CONTROLLER, axiosInstance),

  getAll: ({ tenantId, params }: { tenantId?: string, params?: { state?: ScoreFrameworkVersionStateEnum, include?: string, codeOrName?: string } }) => {
    return axiosInstance.get<CustomAPIResponse<ScoreFrameworkVersion[]>>(
      `${CONTROLLER}/${tenantId}`, { params: params }
    );
  },
  deleteById: (tenantId: string, id: string) => {
    return axiosInstance.delete<CustomAPIResponse<ScoreFrameworkVersion>>(`${CONTROLLER}/${tenantId}/${id}`);
  },
  getallNew: (TenantId?: string, params?: { include?: string }) => {
    return axiosInstance.get<CustomAPIResponseWithPaging<ScoreFrameworkVersion>>(
      `${CONTROLLER}/${TenantId}`, { params }
    );
  },

  getById: (TenantId?: string, Id?: string, params?: { include?: string }) => {
    return axiosInstance.get<CustomAPIResponse<ScoreFrameworkVersionDetail>>(
      `${CONTROLLER}/${TenantId}/${Id}`, { params }
    );
  },

  createNew: (TenantId: string, body: CreateVersionBody) => {
    return axiosInstance.post<CustomAPIResponse<ScoreFrameworkVersionDetail>>(
      `${CONTROLLER}/${TenantId}/`,
      body
    );
  },
  updateData: (TenantId: string, Id: string, body: UpdateVersionBody) => {
    return axiosInstance.put<CustomAPIResponse<ScoreFrameworkVersionDetail>>(
      `${CONTROLLER}/${TenantId}/${Id}`,
      body
    );
  },
  archive: (TenantId: string, Id: string) => {
    return axiosInstance.post<CustomAPIResponse<ScoreFrameworkVersionDetail>>(
      `${CONTROLLER}/${TenantId}/${Id}/archive`,
    );
  },
  publish: (TenantId: string, Id: string) => {
    return axiosInstance.post<CustomAPIResponse<ScoreFrameworkVersionDetail>>(
      `${CONTROLLER}/${TenantId}/${Id}/publish`,
    );
  },
};
