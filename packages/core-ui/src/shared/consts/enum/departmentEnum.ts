export const departmentType: Record<number, string> = {
    1: "Khoa",
    2: "Bộ môn",
    3: "Phòng",
    4: "Trung tâm",
};

export enum DepartmentType {
    Falcuty = 1,
    Subject = 2,
    Department = 3,
    Center = 4,
}

export const DepartmentLabel: Record<DepartmentType, string> = {
    [DepartmentType.Falcuty]: "Khoa",
    [DepartmentType.Subject]: "Bộ môn",
    [DepartmentType.Department]: "Phòng",
    [DepartmentType.Center]: "Trung tâm",
};
