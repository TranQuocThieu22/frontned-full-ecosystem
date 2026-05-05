/**
 * pointReview — Faculty-Level Participation Review API Service
 *
 * Wires real backend APIs to the pointReview feature (Khoa duyệt điểm hoạt động).
 * Base: /api/activity/{tenantId}/{id}/participants
 *
 * NOTE: approve / reject / score-edit APIs are not yet available.
 * When they are added, add them here.
 */

import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";
import axiosInstance from "../configs/axiosInstance";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";

export const TENANT_ID_POINT_REVIEW = "019d659f-5b84-7107-92f4-362498ddf024";
const CONTROLLER = "/activity";

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

export interface ApiParticipation {
  id: string;
  activityId: string;
  studentId: string;
  proposedScore: number;
  finalScore: number | null;
  state: number; // 1=Recording, 2=Approved, 3=Rejected
  rejectReason: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  student: {
    id: string;
    code: string | null;
    name: string | null;
    classCode: string | null;
    facultyCode: string | null;
  };
}

export const participationService = {
  getParticipants: ( activityId: string) =>
  {
    const tenantId = useAuthenticateStore.getState().state.tenantId

    return  axiosInstance.get<CustomAPIResponse<PaginatedListResponse<ApiParticipation>>>(
      `${CONTROLLER}/${tenantId}/${activityId}/participations`
    )},
};
