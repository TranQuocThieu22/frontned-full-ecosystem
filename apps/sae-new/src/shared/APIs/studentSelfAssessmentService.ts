/**
 * US-P-04: Sinh viên tự đánh giá Điểm Rèn luyện
 * Sprint 1 - FR-P-10
 *
 * API service — placed in shared/APIs following project convention.
 *
 * Criteria come from real API (academicYear/{tenantId}/{academicYearId}/criterias).
 * Assessment data from /studentselfassessment/{academicYearId}/current-semester.
 */

import { academicYearService, ScoreFrameworkCriterion } from "@/shared/APIs/academicYearService";
import axiosInstance from "@/shared/configs/axiosInstance";
import type { CustomAPIResponse } from "@/shared/interfaces/CustomAPIResponse";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";

export enum StudentSelfAssessmentState {
  New = 0,                    // Created record, never saved Lưu nháp yet
  Draft = 1,                  // Has saved at least once (Lưu nháp)
  PendingClassApproval = 2,
  PendingFacultyApproval = 3,
  PendingUniversityApproval = 4,
  Approved = 5,
}

export interface SemesterInfoDto {
  id: string;
  code: string | null;
  name: string | null;
  selfAssessmentOpen: string | null;
  selfAssessmentClose: string | null;
}
export interface GetSelfAssessmentDetailDto {
  criteriaId: string;
  criteriaCode: string | null;
  criteriaName: string | null;
  level: number | null;
  maxScore: number | null;
  parentId: string | null;
  orderIndex: number | null;
  score: number;
  /** Server-assigned id — not used client-side */
  id: string;
}

export interface GetSelfAssessmentCurrentSemesterDto {
  studentId: string | null;
  semesterId: string | null;
  totalScore: number;
  classification: string | null;
  state: StudentSelfAssessmentState;
  submittedAt: string | null;
  selfAssessmentDetails: GetSelfAssessmentDetailDto[];
  semester: SemesterInfoDto | null;
  /** Root entity id */
  id: string;
}

export interface SaveDraftRequest {
  semesterId: string;
  selfAssessmentDetails: Array<{ criteriaId: string; score: number }>;
}

export interface CriterionWithSub {
  id: string;
  code: string;
  name: string;
  maxScore: number;
  parentId: string | null;
  level: number;
  orderIndex: number;
  description?: string;
  subCriteria?: ScoreFrameworkCriterion[];
}


export const studentSelfAssessmentService = {
  /** GET /academicYear/{tenantId}/{academicYearId}/criterias → ScoreFrameworkCriterion[] */
  getCriterias: (academicYearId: string) => {
    const tenantId = useAuthenticateStore.getState().state.tenantId

    return academicYearService.getCriterias(tenantId!, academicYearId);
  },

  getSelfAssessmentCurrentSemester: (academicYearId: string) => {
    return axiosInstance.get<CustomAPIResponse<GetSelfAssessmentCurrentSemesterDto>>(
      `/studentselfassessment/${academicYearId}/student-current-semester`,
    );
  },

  saveDraft: (academicYearId: string, body: SaveDraftRequest) => {
    return axiosInstance.post<CustomAPIResponse<unknown>>(
      `/studentselfassessment/${academicYearId}/student-save-draft`,
      body,
    );
  },

  submitAssessment: (academicYearId: string, selfAssessmentId: string, body: SaveDraftRequest) => {
    return axiosInstance.post<CustomAPIResponse<unknown>>(
      `/studentselfassessment/${academicYearId}/${selfAssessmentId}/student-submit`,
      body,
    );
  },
};
