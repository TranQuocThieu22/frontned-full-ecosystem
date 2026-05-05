export enum EnumEventApprovalStatus {
    WaitingForApproval = 1,
    UpdateRequested = 2,
    Approved = 3,
    NotApproved = 4,
}

export const EnumLabelEventApprovalStatus: Record<EnumEventApprovalStatus, string> = {
    [EnumEventApprovalStatus.WaitingForApproval]: "Chờ duyệt",
    [EnumEventApprovalStatus.UpdateRequested]: "Yêu cầu hiệu chỉnh",
    [EnumEventApprovalStatus.Approved]: "Duyệt",
    [EnumEventApprovalStatus.NotApproved]: "Không duyệt",
};