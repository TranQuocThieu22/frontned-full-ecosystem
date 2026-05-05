export enum EnumProposalNotificationType {
    TaskProposal = 1,
    TaskSelection = 2,
    TaskSelectionNotification = 3,
    StudentTaskProposal = 4
}

export const EnumLabelProposalNotificationType: Record<EnumProposalNotificationType, string> = {
    [EnumProposalNotificationType.TaskProposal]: "đề xuất", // Thông báo đề xuất nhiệm vụ khoa học
    [EnumProposalNotificationType.TaskSelection]: "đăng ký", //  // Thông báo tuyển chọn nhiệm vụ khoa học
    [EnumProposalNotificationType.TaskSelectionNotification]: "thông báo", //Thông báo kết quả tuyển chọn
    [EnumProposalNotificationType.StudentTaskProposal]: ""
};
