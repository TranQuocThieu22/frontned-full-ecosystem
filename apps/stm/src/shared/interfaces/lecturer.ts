import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Branch } from "./branch";
import { UserBranch } from "./userBranch";
import { UserProgram } from "./userProgram";
import { UserSkillCenter } from "./userSkillCenter";

export interface Lecturer extends BaseEntity {
  teachingStatus?: number;
  branchs?: Branch[];
  userBranch?: UserBranch[];
  userSkillCenters?: UserSkillCenter[];
  userPrograms?: UserProgram[];
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
