import { IBranch } from "@/interfaces/branch";
import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { IUserBranch } from "../UserBranch/IUserBranch";
import { IUserProgram } from "../UserProgram/IUserProgram";
import { IUserSkillCenter } from "../UserSkillCenter/IUserSkillCenterViewModel";

export interface ILecturer extends ISimpleViewModel {
    teachingStatus?: number;
    // userBranch?: user[];
    branchs?: IBranch[];
    userBranch?: IUserBranch[];
    userSkillCenters?: IUserSkillCenter[];
    userPrograms?: IUserProgram[];
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
    dateOfBirth?: Date;
    educationLevel?: number;
    coeClassId?: number;
    roles?: any[];

}