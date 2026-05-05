export enum EnumProductType {
    International = 1,
    NationnalJournalArticle = 2,
    Trainning = 3,
    Handbook = 4,
    Other = 5,
    ReasearchGuideline = 6
}

export const EnumLabelProductType: Record<EnumProductType, string> = {
    [EnumProductType.International]: "Bài báo quốc tế",
    [EnumProductType.NationnalJournalArticle]: "Bài báo thuộc HDDS tính điểm",
    [EnumProductType.Trainning]: "Đào tạo",
    [EnumProductType.Handbook]: "Tài liệu cẩm nang",
    [EnumProductType.Other]: "Khác",
    [EnumProductType.ReasearchGuideline]: "Hướng dẫn NCKH",
};

