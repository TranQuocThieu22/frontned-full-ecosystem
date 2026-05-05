export enum EnumProposalType {
    BasicResearch = 1,
    AppliedResearch = 2,
    BasicResearchProject = 3,
    AppliedResearchProject = 4,
    DevelopmentProject = 5,
  }
  
  export const EnumProposalTypeLabels: Record<EnumProposalType, string> = {
    [EnumProposalType.BasicResearch]: "Nghiên cứu cơ bản",
    [EnumProposalType.AppliedResearch]: "Nghiên cứu ứng dụng",
    [EnumProposalType.BasicResearchProject]: "Đề tài nghiên cứu cơ bản",
    [EnumProposalType.AppliedResearchProject]: "Đề tài nghiên cứu ứng dụng",
    [EnumProposalType.DevelopmentProject]: "Đề tài phát triển",
  };
  
