import { Branch } from "@/interfaces/branch";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface Account extends BaseEntity {
    isBlocked: boolean,
    roleId: number,
    userName: string,
    email: string,
    phoneNumber: string,
    address: string,
    avatarPath: string,
    fullName: string,
    facultyId: number,
    facultyName: string,
    classId: number,
    majorsId: number,
    workingUnitId: number,
    workingUnitName: string,
    gender: string,
    dateOfBirth: string,
    placeOfBirth: string,
    educationLevel: string,
    isExternal: boolean,
    jobTitle?: string,
    modifiedBy: number,
    coeClassId: number,
    coeUnitId: number,
    modifiedWhen: string,
    roles: any[],
    coeUnit: any,
    userSkillCenters: any[]
    className: string;
    majorsName: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    classCode: string;
}

export interface StudentList extends BaseEntity {
    fullName: string,
    email: string,
    address: string,
    phoneNumber: string,
    gender: string,
    facultyCode: string,
    facultyName: string,
    classCode: string,
    className: string,
    majorsCode: string,
    majorsName: string,
    avatarPath: string,
    dateOfBirth: string,
    placeOfBirth: string,
    identifier: string,
    identifierIssuePlace: string,
    identifierIssueDate: string,
    id: number,
    code: string,
    name: string,
}

// Lecturer
export interface AccountLecturer extends Account {
    teachingStatus?: string;
    userBranch?: UserBranch[];
    branchs?: Branch[];
    userPrograms?: UserProgram[];
    srmUnitId?: number;
    srmUnit?: any;
    srmUserResearchAreas?: any[];
}

export interface SkillCenter extends BaseEntity {
    note?: string;
}

export interface UserBranch extends BaseEntity {
    userId?: number;
    branchId?: number;
    branch?: Branch;
}

export interface Program extends BaseEntity {
}

export interface UserProgram extends BaseEntity {
    userId?: number;
    programId?: number;
    program?: Program;
}

export interface UserSkillCenter extends BaseEntity {
    userId?: number;
    skillCenterId?: number;
}
