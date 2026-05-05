/**
 * Numeric participation state from API.
 * Mirrors backend integer values.
 *
 * 1 = Recording (chờ Khoa duyệt)
 * 2 = Approved (đã Khoa duyệt)
 * 3 = Rejected (Khoa từ chối)
 */
export enum ParticipationStateEnum {
    Recording = 1,
    Approved = 2,
    Rejected = 3,
}

/** String label for STATE_CONFIG keys — also accepts raw number from API */
export type ParticipationState = "Recording" | "Approved" | "Rejected" | number;
/** Map numeric state → string label */
export const PARTICIPATION_STATE_LABEL: Record<number, ParticipationState> = {
    [ParticipationStateEnum.Recording]: "Recording",
    [ParticipationStateEnum.Approved]: "Approved",
    [ParticipationStateEnum.Rejected]: "Rejected",
};