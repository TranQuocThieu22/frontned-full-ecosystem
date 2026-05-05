/**
 * Activity interfaces for SAE app - US-P-01 (Student Public View)
 * Student-facing: activity list + registration
 *
 * API: GET /api/activity/{tenantId}
 */

import { MantineColor } from "@mantine/core";
import { Criterion } from "./criterion";

// ─── Enums ─────────────────────────────────────────────────────────────────────

/** ActivityState from API: 1=Draft, 2=Open, 3=Ongoing, 4=Recording, 5=Locked, 6=Closed */
export enum ActivityState {
    Draft = 1,
    Open = 2,
    Ongoing = 3,
    Recording = 4,
    Locked = 5,
    Closed = 6,
}

export const ActivityStateLabel: Record<ActivityState, string> = {
    [ActivityState.Draft]: "Bản nháp",
    [ActivityState.Open]: "Mở đăng ký",
    [ActivityState.Ongoing]: "Đang diễn ra",
    [ActivityState.Recording]: "Đang ghi nhận điểm",
    [ActivityState.Locked]: "Đã khóa",
    [ActivityState.Closed]: "Đã đóng",
};

export const ActivityStateColor: Record<ActivityState, MantineColor> = {
    [ActivityState.Draft]: "#B8810A",
    [ActivityState.Open]: "#D4623B",
    [ActivityState.Ongoing]: "#4ab80a",
    [ActivityState.Recording]: "#4ab80a",
    [ActivityState.Locked]: "#6B7280",
    [ActivityState.Closed]: "#6B7280",
};

export const ActivityStateBg: Record<ActivityState, string> = {
    [ActivityState.Draft]: "#FFF8E1",
    [ActivityState.Open]: "#FDF0EC",
    [ActivityState.Ongoing]: "#e9f3e4",
    [ActivityState.Recording]: "#e9f3e4",
    [ActivityState.Locked]: "#F3F4F6",
    [ActivityState.Closed]: "#F3F4F6",
};

/**
 * States to SHOW in student list:
 * - Open (2): show + register
 * - Ongoing (3): show only
 * - Recording (4): show only
 * - Closed (6): show only
 *
 * Excluded: Draft (1), Locked (5)
 */
export const VISIBLE_STATES = [
    ActivityState.Open,
    ActivityState.Ongoing,
    ActivityState.Recording,
    ActivityState.Closed,
] as const;

export const REGISTRATION_ENABLED_STATE = ActivityState.Open;

/** ActivityType from API: 1=Mandatory, 2=Optional */
export enum ActivityType {
    Mandatory = 1,
    Optional = 2,
}
export enum ApproveType {
    /// <summary>
    /// Action phê duyệt hoạt động.
    /// </summary>
    Approve = 1,
    // <summary>
    // Từ chối.
    //</summary>
    Reject = 2,
}
export const ActivityTypeLabel: Record<ActivityType, string> = {
    [ActivityType.Mandatory]: "Bắt buộc",
    [ActivityType.Optional]: "Tự chọn",
};

export const ActivityTypeColor: Record<ActivityType, string> = {
    [ActivityType.Mandatory]: "#1A2744",
    [ActivityType.Optional]: "#D4623B",
};

export const ActivityTypeBg: Record<ActivityType, string> = {
    [ActivityType.Mandatory]: "#EEF1F8",
    [ActivityType.Optional]: "#FDF0EC",
};

export const ActivityTypeBorder: Record<ActivityType, string> = {
    [ActivityType.Mandatory]: "#1A2744",
    [ActivityType.Optional]: "#D4623B",
};

// ─── Semester (nested object in API response) ────────────────────────────────────

export interface ActivitySemester {
    code: string | null;
    name: string;
    state: number;
    id: string;
}

// ─── API Request / Response ─────────────────────────────────────────────────────

export interface ActivityFilterRequest {
    pageNumber?: number;
    pageSize?: number;
    codeOrName?: string;
    state?: ActivityState;
    type?: number
}

export interface RegisterActivityRequest {
    studentId: string | null;
}

export interface ApproveActivityScoreRequest {
    studentId: string;
    action?: ApproveType;
    rejectReason?: string
}

export interface ChangeActivityStateRequest {
    state: ActivityState;
}

// ─── API Response Item ──────────────────────────────────────────────────────────

export interface ActivityApiItem {
    id: string;
    code?: string;
    name?:string;
    description?: string;
    type?: ActivityType;
    state?: ActivityState;
    semesterId?: string | null;
    semester?: ActivitySemester | null;
    registeredCount?: number;
    quota?: number;
    maxScore?: number;
    organizerUnit?: string;
    criteriaId?: string | null;
    criteria?: Criterion;
    acknowledgedBy?: string | null;
    approvedBy?: string | null;
}

// ─── Paging ─────────────────────────────────────────────────────────────────────

export interface ActivityPaging {
    currentPage: number;
    pageSize: number;
    totalPage: number;
    totalItemCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    before: string | null;
    after: string | null;
}

// ─── API Results Wrapper ─────────────────────────────────────────────────────────

export interface ActivityApiResults {
    data: ActivityApiItem[];
    paging: ActivityPaging;
}

// ─── State Transition Rules ─────────────────────────────────────────────────────

/**
 * Quy tắc chuyển trạng thái Activity theo API:
 *
 *  1 (Draft)     → Open
 *  2 (Open)      → Ongoing
 *  3 (Ongoing)   → Recording
 *  4 (Recording) → Locked
 *  5 (Locked)    → Closed
 *
 * Trạng thái Closed (6) là trạng thái cuối cùng — không chuyển tiếp.
 */
export const ACTIVITY_STATE_TRANSITIONS: Record<ActivityState, ActivityState[]> = {
    [ActivityState.Draft]: [ActivityState.Open],
    [ActivityState.Open]: [ActivityState.Ongoing],
    [ActivityState.Ongoing]: [ActivityState.Recording],
    [ActivityState.Recording]: [ActivityState.Locked],
    [ActivityState.Locked]: [ActivityState.Closed],
    [ActivityState.Closed]: [],          // trạng thái cuối, không chuyển tiếp
};

/**
 * Lấy danh sách trạng thái hợp lệ kế tiếp từ trạng thái hiện tại.
 */
export function getNextStates(current: ActivityState): ActivityState[] {
    return ACTIVITY_STATE_TRANSITIONS[current] ?? [];
}

/**
 * Kiểm tra xem có thể chuyển từ from → to hay không.
 */
export function canTransition(from: ActivityState, to: ActivityState): boolean {
    return getNextStates(from).includes(to);
}

/**
 * Mô tả hành động chuyển trạng thái (dùng cho button/tooltip).
 * Ví dụ: Draft → Open  → "Mở đăng ký"
 *        Open → Ongoing → "Bắt đầu"
 *        ...
 */
export const ACTIVITY_STATE_ACTION_LABEL: Record<string, string> = {
    [`${ActivityState.Draft}_${ActivityState.Open}`]: "Mở đăng ký",
    [`${ActivityState.Open}_${ActivityState.Ongoing}`]: "Bắt đầu hoạt động",
    [`${ActivityState.Ongoing}_${ActivityState.Recording}`]: "Ghi nhận kết quả",
    [`${ActivityState.Recording}_${ActivityState.Locked}`]: "Khóa kết quả",
    [`${ActivityState.Locked}_${ActivityState.Closed}`]: "Đóng hoạt động",
};

/**
 * Lấy action label cho một transition cụ thể.
 */
export function getStateActionLabel(from: ActivityState, to: ActivityState): string {
    return ACTIVITY_STATE_ACTION_LABEL[`${from}_${to}`] ?? `Chuyển sang ${ActivityStateLabel[to]}`;
}
