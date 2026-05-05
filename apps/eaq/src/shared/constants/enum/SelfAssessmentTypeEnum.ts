

export enum SelfAssessmentTypeEnum {
    CurrentSituation = 1,
    Strength = 2,
    Weakness = 3,
    ActionPlan = 4,
    SelfEvaluation = 5,
}

export const SelfAssessmentTypeEnumLabel: Record<SelfAssessmentTypeEnum, string> = {
    [SelfAssessmentTypeEnum.CurrentSituation]: "1. Mô tả hiện trạng",
    [SelfAssessmentTypeEnum.Strength]: "2. Điểm mạnh",
    [SelfAssessmentTypeEnum.Weakness]: "3. Điểm tồn tại và khuyến nghị",
    [SelfAssessmentTypeEnum.ActionPlan]: "4. Kế hoạch hành động",
    [SelfAssessmentTypeEnum.SelfEvaluation]: "5. Tự đánh giá",
};