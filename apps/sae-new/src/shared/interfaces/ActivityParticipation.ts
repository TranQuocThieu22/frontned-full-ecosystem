/**
 * ActivityParticipation interfaces for SAE app - FR-O-12
 * Theo FRD SAE DAV.md
 */

import { BaseEntity } from "./BaseEntity";

export type ParticipationState = "Recording" | "Approved" | "Rejected";

export const ParticipationStateLabel: Record<ParticipationState, string> = {
    Recording: "Đang ghi nhận",
    Approved: "Đã duyệt",
    Rejected: "Từ chối",
};

export const ParticipationStateColor: Record<ParticipationState, string> = {
    Recording: "orange",
    Approved: "green",
    Rejected: "red",
};

/** Tham gia của 1 sinh viên vào 1 hoạt động */
export interface ActivityParticipation extends BaseEntity {
    participationId?: number;
    activityId?: number;
    studentId?: string;
    studentCode?: string;
    studentName?: string;
    className?: string;
    proposedScore?: number;
    finalScore?: number;
    role?: string;
    state?: ParticipationState;
    rejectReason?: string;
    approvedBy?: string;
    approvedAt?: string;
    version?: number;
    createdAt?: string;

}

/** Import participation payload */
export interface ImportParticipationPayload {
    activityId: number;
    file: File;
    mode: "STRICT" | "PARTIAL";
}

/** Import result */
export interface ImportResult {
    totalRows: number;
    successRows: number;
    errorRows: number;
    errors?: Array<{
        row: number;
        studentCode?: string;
        message: string;
    }>;
}
