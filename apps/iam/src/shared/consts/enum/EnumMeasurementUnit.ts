export enum EnumMeasurementUnit {
    Paper = 1,
    Page = 2,
    Chapter = 3,
    Issue = 4,
}

export const EnumLabelMeasurementUnit: Record<EnumMeasurementUnit, string> = {
    [EnumMeasurementUnit.Paper]: "Bài",
    [EnumMeasurementUnit.Page]: "Trang",
    [EnumMeasurementUnit.Chapter]: "Chương",
    [EnumMeasurementUnit.Issue]: "Quyển",
};