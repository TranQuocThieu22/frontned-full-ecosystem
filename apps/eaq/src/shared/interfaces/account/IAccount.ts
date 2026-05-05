import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IAccount extends BaseEntity {
    isBlocked?: boolean,
    roleId?: number,
    userName?: string,
    email?: string,
    phoneNumber?: string,
    address?: string,
    avatarPath?: string,
    fullName?: string,
    facultyId?: number,
    facultyName?: string,
    majorsId?: number,
    workingUnitId?: number,
    workingUnitName?: string,
    dateOfBirth?: string,
    coeClassId?: number,
    coeUnitId?: number,
}
