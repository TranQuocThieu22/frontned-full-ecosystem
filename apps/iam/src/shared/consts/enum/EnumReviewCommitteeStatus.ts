import { IconCircleCheck, IconClock, TablerIcon } from "@tabler/icons-react";

/** Enum trạng thái hội đồng xác định danh mục */
export enum ReviewCommitteeStatusEnum {
  WaitingForMeeting = 1,
  Completed = 2,
}

/** Label enum trạng thái hội đồng xác định danh mục */
export const ReviewCommitteeStatusLabel: Record<ReviewCommitteeStatusEnum, string> = {
  [ReviewCommitteeStatusEnum.WaitingForMeeting]: "Chờ họp",
  [ReviewCommitteeStatusEnum.Completed]: "Hoàn thành",
};

/** Màu hiển thị cho enum trạng thái hội đồng xác định danh mục */
export const ReviewCommitteeStatusColor: Record<ReviewCommitteeStatusEnum, string> = {
  [ReviewCommitteeStatusEnum.WaitingForMeeting]: "blue",
  [ReviewCommitteeStatusEnum.Completed]: "green",
};

/** Icon cho enum trạng thái hội đồng xác định danh mục */
export const ReviewCommitteeStatusIcon: Record<ReviewCommitteeStatusEnum, TablerIcon> = {
  [ReviewCommitteeStatusEnum.WaitingForMeeting]: IconClock,
  [ReviewCommitteeStatusEnum.Completed]: IconCircleCheck,
};