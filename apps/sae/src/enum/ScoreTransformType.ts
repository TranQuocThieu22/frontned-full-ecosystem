
export enum EnumScoreTransform {
    AverageScore10 = 1,
    AccumulatedScore10 = 2,
    AverageScore4 = 3,
    AccumulatedScore4 = 4,
    CreditScore = 5
}

export const EnumScoreTransformLabel: Record<EnumScoreTransform, string> = {
    [EnumScoreTransform.AverageScore10]: "Điểm trung bình học kỳ hệ 10",
    [EnumScoreTransform.AccumulatedScore10]: "Điểm trung bình tích lũy hệ 10",
    [EnumScoreTransform.AverageScore4]: "Điểm trung bình học kỳ hệ 4",
    [EnumScoreTransform.AccumulatedScore4]: "Điểm trung bình tích lũy hệ 4",
    [EnumScoreTransform.CreditScore]: "Số tín chỉ học kỳ",
};
