import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IRole } from "../userRole/IRole";

export interface IUser extends BaseEntity {
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
    classId?: number | null;
    majorsId?: number | null;
    workingUnitId?: number | null;
    workingUnitName?: string | null;
    gender?: string | null;
    dateOfBirth?: string;
    placeOfBirth?: string | null;
    educationLevel?: string | null;
    coeClassId?: number | null;
    coeUnitId?: number | null;
    roles?: IRole[];
    coeUnit?: any | null;
    userSkillCenters?: any[];
}
