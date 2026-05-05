export enum ScoreSystemEnum {
    He4 = 1,
    He10 = 2,
    He100 = 3,
    DiemDanh = 4,
}

export const ScoreSystemLabel: Record<ScoreSystemEnum, string> = {
    [ScoreSystemEnum.He4]: "Hệ 4",
    [ScoreSystemEnum.He10]: "Hệ 10",
    [ScoreSystemEnum.He100]: "Hệ 100",
    [ScoreSystemEnum.DiemDanh]: "Điểm danh",
};

export enum ScoreFormulaEnum {
    TrongSo = 1,
    TrungBinhCong = 2,
    TongKet = 3,
}

export const ScoreFormulaLabel: Record<ScoreFormulaEnum, string> = {
    [ScoreFormulaEnum.TrongSo]: "Trọng số",
    [ScoreFormulaEnum.TrungBinhCong]: "Trung bình cộng",
    [ScoreFormulaEnum.TongKet]: "Tổng kết",
};

