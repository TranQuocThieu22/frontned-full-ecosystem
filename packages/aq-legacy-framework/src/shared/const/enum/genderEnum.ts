export enum genderEnum {
    /** Nam */
    Male = 1,
    /** Nữ */
    Female = 2,
}
/** 1=Nam, 2=Nữ */
export const genderLabel: Record<genderEnum, string> = {
    [genderEnum.Male]: "Nam",
    [genderEnum.Female]: "Nữ",
};