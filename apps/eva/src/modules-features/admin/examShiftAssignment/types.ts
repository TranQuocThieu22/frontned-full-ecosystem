// types.ts - Extract shared types and constants
export enum ExamSectionStatus {
    UPCOMING = 1,
    ONGOING = 2,
    FINISHED = 3,
}

export const TAB_CONFIG = {
    UPCOMING: { value: ExamSectionStatus.UPCOMING, label: "Sắp diễn ra" },
    ONGOING: { value: ExamSectionStatus.ONGOING, label: "Đang diễn ra" },
    FINISHED: { value: ExamSectionStatus.FINISHED, label: "Đã kết thúc" },
    ALL: { value: null, label: "Tất cả" },
} as const;

export type TabKey = keyof typeof TAB_CONFIG;

export const VIETNAMESE_STATUS_LABELS: Record<ExamSectionStatus, string> = {
    [ExamSectionStatus.UPCOMING]: "Sắp diễn ra",
    [ExamSectionStatus.ONGOING]: "Đang diễn ra",
    [ExamSectionStatus.FINISHED]: "Đã kết thúc",
};