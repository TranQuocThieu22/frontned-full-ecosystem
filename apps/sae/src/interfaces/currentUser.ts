import { Role } from "@/interfaces/roles";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";


interface CurrentUser extends User {
  isBlocked?: boolean;
  roleId?: number;
  address?: string;
  avatarPath?: string;
  fullName?: string;
  facultyId?: number;
  facultyName?: string;
  classId?: number | null;
  majorsId?: number | null;
  workingUnitId?: number;
  workingUnitName?: string;
  educationLevel?: string | null;
  coeClassId?: number;
  roles?: Role[];
}

export type { CurrentUser };

