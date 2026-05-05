import { IAQFileDetail } from "@/utils/utils_file";
import { IBaseEntity } from "./IBaseEntity";
import { IFaculty } from "./IFaculty";
import { IUserSkillCenters } from "./IUserSkillCenters";
import { IWorkingUnit } from "./IWorkingUnit";

export interface IUser extends IBaseEntity {
    password?: string
    passwordHash?: string
    userName?: string,
    phoneNumber?: string,
    email?: string
    fullName?: string,
    address?: string,
    isBlocked?: boolean,
    AQModuleId?: number,
    avatarFileDetail?: IAQFileDetail
    workingUnit?: IWorkingUnit
    workingUnitId?: number
    workingUnitName?: string
    gender?: number
    dateOfBirth?: Date
    userSkillCenters?: IUserSkillCenters[]
    note?: string
    isExternal?: boolean
    facultyId?: number
    faculty?: IFaculty
}