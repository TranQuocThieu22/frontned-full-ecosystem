export const departmentType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};
export enum departmenType {
    Falcuty = 1,
    Subject = 2,
    Department = 3,
    Center = 4,
}
export const departmentLabel: Record<departmenType, string> = {
    [departmenType.Falcuty]: "Khoa",
    [departmenType.Subject]: "Bộ môn",
    [departmenType.Department]: "Phòng",
    [departmenType.Center]: "Trung tâm",
};
