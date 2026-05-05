import {IconCheck, IconHourglass, IconX, TablerIcon} from "@tabler/icons-react";

export enum SelfAssessmentStatusEnum {
    notRated = 0,
    success = 1,
    failed = 2
}


export const SelfAssessmentStatusEnumLabel: Record<SelfAssessmentStatusEnum, string> = {
    [SelfAssessmentStatusEnum.notRated]: "Chưa đánh giá",
    [SelfAssessmentStatusEnum.success]: "Đạt",
    [SelfAssessmentStatusEnum.failed]: "Không đạt",
  };
  
  export const SelfAssessmentStatusEnumColor: Record<SelfAssessmentStatusEnum, string> = {
      [SelfAssessmentStatusEnum.notRated]: "gray",
    [SelfAssessmentStatusEnum.success]: "green",
    [SelfAssessmentStatusEnum.failed]: "red",
  };
  
  export const SelfAssessmentStatusEnumIcon: Record<SelfAssessmentStatusEnum, TablerIcon> = {
    [SelfAssessmentStatusEnum.notRated]: IconHourglass,
    [SelfAssessmentStatusEnum.success]: IconCheck,
    [SelfAssessmentStatusEnum.failed]: IconX,
  };