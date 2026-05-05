export enum ScoreFrameworkVersionStateEnum {
    Draft = 1,
    Published = 2,
    Archived = 3
}

export const ScoreFrameworkVersionStatusLabel: Record<ScoreFrameworkVersionStateEnum, string> = {
    [ScoreFrameworkVersionStateEnum.Draft]: "Nháp",
    [ScoreFrameworkVersionStateEnum.Published]: "Xuất bản",
    [ScoreFrameworkVersionStateEnum.Archived]: "Đã lưu trữ"
}
