import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "./BaseEntity";
import { Class } from "./Class";
import { Faculty } from "./Faculty";
import { UserSkillCenters } from "./UserSkillCenters";
import { WorkingUnit } from "./WorkingUnit";

export interface User extends BaseEntity {
    password?: string
    passwordHash?: string
    userName?: string,
    firstName?: string
    lastName?: string
    phoneNumber?: string,
    email?: string
    fullName?: string,
    address?: string,
    isBlocked?: boolean,
    AQModuleId?: number,
    avatarFileDetail?: AQFileDetail
    workingUnit?: WorkingUnit
    workingUnitId?: number
    workingUnitName?: string
    gender?: number
    dateOfBirth?: string
    userSkillCenters?: UserSkillCenters[]
    note?: string
    isExternal?: boolean
    facultyId?: number
    faculty?: Faculty
    roleId?: number
    class?: Class
}