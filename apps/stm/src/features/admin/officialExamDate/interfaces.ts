export interface OfficialExam {
  programId?: number;
  examDate?: Date;
  roomTypeId?: number | null;
  status?: number;
  startRegistrationDate?: string;
  endRegistrationDate?: string;
  maxStudent?: number;
  branchId?: number;
  skillCenterId?: number;
  courseSectionNumberTotal?: number;
  courseSectionNumber?: number;
  officialExamDate?: Date | string | null;
  classPeriod?: number | null;
  examCourses?: any[];
  program?: {
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
  };
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

export interface Holiday {
  id?: number;
  note?: string;
  date?: Date | string;
  code?: string | null;
  name?: string | null;
  concurrencyStamp?: string;
  isEnabled?: boolean;
}

