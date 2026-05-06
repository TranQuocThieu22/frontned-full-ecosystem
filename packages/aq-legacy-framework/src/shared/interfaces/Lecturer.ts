import { BaseEntity } from "@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity";

export interface Lecturer extends BaseEntity {
    teachingStatus?: number;
    // userBranch?: user[];
    // branchs?: IBranch[];
    // userSkillCenters?: IUserSkillCenter[];
    // userPrograms?: IUserProgram[];
    isBlocked?: boolean;
    roleId?: number;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    avatarPath?: string;
    fullName?: string;
    facultyId?: number;
    facultyName?: string;
    classId?: number;
    majorsId?: number;
    workingUnitId?: number;
    workingUnitName?: string;
    gender?: number;
    dateOfBirth?: string;
    educationLevel?: number;
    roles?: any[];
    lastName?: string;
    firstName?: string;
    coeUnitId?: number;

    // For import
    departmentCode?: string
}