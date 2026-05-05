/**
 * pointReviewByClass — Class Approval API Service
 *
 * Wires real backend APIs to the pointReviewByClass feature (GVCN duyệt).
 * Base: /api/studentselfassessment/{tenantId}
 */

import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";
import type { StudentListItem } from "@/app/operation/ctsv/pointReviewByClass/types";
export type { StudentListItem };

import type { StudentAssessment } from "@/app/operation/ctsv/pointReviewByClass/types";
import axiosInstance from "../configs/axiosInstance";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { createBaseAPI } from "@aq-fe/aq-core-framework/shared/libs/createBaseAPI";
import { ActivityApiResults } from "../interfaces/ActivityStudent";

// ── Constants ─────────────────────────────────────────────────────────────────

const CONTROLLER = "/studentselfassessment";

// ── Paging response type ───────────────────────────────────────────────────────

export interface PagingInfo {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalItemCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  before: string | null;
  after: string | null;
}

export interface PaginatedListResponse<T> {
  data: T[];
  paging: PagingInfo;
}

// ── Request body types ─────────────────────────────────────────────────────────

export interface ClassApproveDetailRequest {
  criteriaId: string;
  classApprovalScore: number;
}

export interface ClassApproveRequest {
  classApprovalComment?: string;
  selfAssessmentDetails?: ClassApproveDetailRequest[];
}

export interface ClassRejectRequest {
  classRejectComment?: string;
}

// ── Service ────────────────────────────────────────────────────────────────────

export const pointReviewService = {

  ...createBaseAPI<ActivityApiResults>(CONTROLLER, axiosInstance),
    getClassApprovalList: (params?: {
    State?: number;
    Search?: string;
    OrderBy?: string;
    OrderDirection?: string;
    PageNumber?: number;
    PageSize?: number;
  }) => {
    const tenantId = useAuthenticateStore.getState().state.tenantId
    return axiosInstance.get<CustomAPIResponse<PaginatedListResponse<StudentListItem>>>(
      `${CONTROLLER}/${tenantId}/class-approval-current-semester`,
      { params }
    )
  },
  getAssessmentDetail: (id: string) => {
    const tenantId = useAuthenticateStore.getState().state.tenantId
    return axiosInstance.get<CustomAPIResponse<StudentAssessment>>(
      `${CONTROLLER}/${tenantId}/${id}`
    )
  },
  classSaveDraft: (id: string, body: ClassApproveRequest) => {
    const tenantId = useAuthenticateStore.getState().state.tenantId

    return axiosInstance.post<CustomAPIResponse<void>>(
      `${CONTROLLER}/${tenantId}/${id}/class-save-draft`,
      body
    )
  },
  classApprove: (id: string, body: ClassApproveRequest) => {
    const tenantId = useAuthenticateStore.getState().state.tenantId
    return axiosInstance.post<CustomAPIResponse<void>>(
      `${CONTROLLER}/${tenantId}/${id}/class-approve`,
      body
    )
  },
  classReject: (id: string, body: ClassRejectRequest) => {
    const tenantId = useAuthenticateStore.getState().state.tenantId
    return axiosInstance.post<CustomAPIResponse<void>>(
      `${CONTROLLER}/${tenantId}/${id}/class-reject`,
      body
    )
  },
};
