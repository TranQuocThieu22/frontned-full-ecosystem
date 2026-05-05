export enum EnumTaskProposalType {
    LecturerProposal = 1,
    StudentProposal = 2,
}

export const EnumLabelReviewType: Record<EnumTaskProposalType, string> = {
    [EnumTaskProposalType.LecturerProposal]: "Đề xuất giảng viên",
    [EnumTaskProposalType.StudentProposal]: "Đề xuất sinh viên",
};

