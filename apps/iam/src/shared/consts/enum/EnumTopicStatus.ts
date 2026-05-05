import { IconGitBranch, IconGitPullRequest, IconSparkles, TablerIcon } from "@tabler/icons-react";

/** Enum trạng thái đề tài */
export enum EnumTopicStatus {
  New = 1,
  PreviousResearchDirection = 2,
  OtherResearchGroupDirection = 3
}

/** Label enum trạng thái đề tài */
export const EnumLabelTopicStatus: Record<EnumTopicStatus, string> = {
  [EnumTopicStatus.New]: "Mới",
  [EnumTopicStatus.PreviousResearchDirection]: "Kế tiếp hướng nghiên cứu của chính nhóm tác giả",
  [EnumTopicStatus.OtherResearchGroupDirection]: "Kế tiếp nghiên cứu của người khác"
};

/** Màu hiển thị cho enum trạng thái đề tài */
export const EnumColorTopicStatus: Record<EnumTopicStatus, string> = {
  [EnumTopicStatus.New]: "#0065F8",
  [EnumTopicStatus.PreviousResearchDirection]: "#54B435",
  [EnumTopicStatus.OtherResearchGroupDirection]: "#6A42C2"
};

/** Icon cho enum trạng thái đề tài */
export const EnumIconTopicStatus: Record<EnumTopicStatus, TablerIcon> = {
  [EnumTopicStatus.New]: IconSparkles,
  [EnumTopicStatus.PreviousResearchDirection]: IconGitPullRequest,
  [EnumTopicStatus.OtherResearchGroupDirection]: IconGitBranch,
};