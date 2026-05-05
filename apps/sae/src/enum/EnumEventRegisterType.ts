export enum EnumRegisterType {
    AllStudents = 1,
    Faculty = 2,
    Major = 3,
    Class = 4,
    StudentList = 5,
}

export const EnumLabelRegisterType: Record<EnumRegisterType, string> = {
    [EnumRegisterType.AllStudents]: "Toàn trường",
    [EnumRegisterType.Faculty]: "Khoa",
    [EnumRegisterType.Major]: "Ngành",
    [EnumRegisterType.Class]: "Lớp",
    [EnumRegisterType.StudentList]: "Danh sách sinh viên",
};

export type RegisterType = "FACULTY" | "MAJOR" | "CLASS" | "STUDENT_LIST" | "ALL_STUDENTS";

export enum EnumStringRegisterType {
    AllStudents = "ALL_STUDENTS",
    Faculty = "FACULTY",
    Major = "MAJOR",
    Class = "CLASS",
    StudentList = "STUDENT_LIST",
}

export const EnumRegisterTypeToEnumString: Record<number, EnumStringRegisterType> = {
    [EnumRegisterType.AllStudents]: EnumStringRegisterType.AllStudents,
    [EnumRegisterType.Faculty]: EnumStringRegisterType.Faculty,
    [EnumRegisterType.Major]: EnumStringRegisterType.Major,
    [EnumRegisterType.Class]: EnumStringRegisterType.Class,
    [EnumRegisterType.StudentList]: EnumStringRegisterType.StudentList,
};
