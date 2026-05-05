import {IconClipboardCheck, IconHomeCheck, IconUserCheck, TablerIcon} from "@tabler/icons-react";

export enum limitationTypeEnum {
    SelfAssessment = 1,
    ExternalAssessment = 2,
    AssessmentCouncil = 3
}

export const limitationTypeEnumLabel: Record<limitationTypeEnum, string> = {
    [limitationTypeEnum.SelfAssessment]: "Báo cáo tự đánh giá",
    [limitationTypeEnum.ExternalAssessment]: "Báo cáo kết quả đánh giá ngoài",
    [limitationTypeEnum.AssessmentCouncil]: "Nghị quyết của hội đồng kiểm định CLGD",
};

export const limitationTypeEnumColor: Record<limitationTypeEnum, string> = {
  [limitationTypeEnum.SelfAssessment]: "#009432",
  [limitationTypeEnum.ExternalAssessment]: "#22a6b3",
  [limitationTypeEnum.AssessmentCouncil]: "#344CB7",
};

export const limitationTypeEnumIcon: Record<limitationTypeEnum, TablerIcon> = {
  [limitationTypeEnum.SelfAssessment]: IconUserCheck,
  [limitationTypeEnum.ExternalAssessment]: IconClipboardCheck,
  [limitationTypeEnum.AssessmentCouncil]: IconHomeCheck,
};