export interface IStudentInfoViewModel {
    fullName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    gender?: number;
    facultyName?: string;
    className?: string | null;
    majorsName?: string | null;
    avatarPath?: string;
    dateOfBirth?: string;
    placeOfBirth?: string | null;
    identifier?: string | null;
    identifierIssuePlace?: string | null;
    identifierIssueDate?: string | null;
    id?: number;
    code?: string;
    name?: string | null;
    concurrencyStamp?: string;
    isEnabled?: boolean;
    modifiedWhen?: string;
    modifiedBy?: number;
    modifiedFullName?: string;
}

export interface IStudentViewModel {
    id?: number;
    code?: string;
    isEnabled?: boolean;
    isBlocked?: boolean;
    roleId?: number;
    userName?: string | null;
    passwordHash?: string | null;
    passWord?: string | null;
    email?: string;
    phoneNumber?: string;
    address?: string;
    avatarPath?: string | null;
    avatarFileDetail?: {
        fileName: string | null,
        fileExtension: string | null,
        fileBase64String: string | null
    };
    fullName?: string;
    lockoutEnd?: Date | null;
    securityStamp: string | null,
    identifier?: string | null;
    identifierIssuePlace?: string | null;
    identifierIssueDate?: Date | null;
    expiresDate?: Date | null;
    facultyId?: number | null;
    majorsId?: number | null;
    classId?: number | null;
    workingUnitId?: number | null;
    aqModuleId?: number;
    gender?: number | null;
    dateOfBirth?: Date | null;
    placeOfBirth?: string | null;
    educationLevel?: number | null;
    teachingStatus?: number | null;
    coeClassId?: number | null;
    coeUnitId?: number | null;
    userBranch?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        userId?: number;
        branchId?: number;
        branch?: {
            id?: number;
            code?: string;
            name?: string;
            concurrencyStamp?: string;
            isEnabled?: boolean;
            modifiedWhen?: string;
            modifiedBy?: number;
            location?: string;
            note?: string;
            skillCenterId?: number;
            skillCenter?: {
                id?: number;
                code?: string;
                name?: string;
                concurrencyStamp?: string;
                isEnabled?: boolean;
                modifiedWhen?: string;
                modifiedBy?: number;
                note?: string;
            };
        };
    }[] | null;
    userSkillCenters?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        userId?: number;
        skillCenterId?: number;
    }[] | null;
    userPrograms?: {
        id?: number;
        code?: string;
        name?: string;
        concurrencyStamp?: string;
        isEnabled?: boolean;
        modifiedWhen?: string;
        modifiedBy?: number;
        userId?: number;
        programId?: number;
    }[] | null;
}