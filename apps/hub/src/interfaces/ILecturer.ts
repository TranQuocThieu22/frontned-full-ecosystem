
interface ILecturer extends IBaseEntity {
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
    dateOfBirth?: Date;
    educationLevel?: number;
    coeClassId?: number;
    roles?: any[];
    lastName?: string;
    firstName?: string;
    coeUnitId?: number;

}