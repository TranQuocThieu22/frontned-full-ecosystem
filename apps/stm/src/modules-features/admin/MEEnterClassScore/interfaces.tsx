import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface I_Class extends IBaseEntity {
  code?: string;
  name?: string;
  homeroomTeacherName?: string;
  schedule?: string;
  room?: string;
  currentCapacity?: number;
  maxCapacity?: number;
  status?: number;
  isGraded?: boolean;
}

export interface I_ClassStudent extends IBaseEntity {
  code?: string;
  name?: string;
  parentPhone?: string;
  studentStatus?: number;
  note?: string | null;
  attendanceStatus?: number;
  originScore?: number | null;
  editedScore?: string | null;
  comment?: string;
  reward?: number;
}
