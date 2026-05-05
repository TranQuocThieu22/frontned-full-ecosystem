import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface I_MakeUpLessonRequest extends BaseEntity {
  code?: string; // Mã đơn nghỉ phép gốc
  name?: string; // Họ và tên HS
  studentCode?: string;
  studentName?: string;
  subject?: string;
  absenceDate?: Date;
  reason?: string;
  makeUpStatus?: number;
}

export interface I_MakeUpClassSchedule {
  code: string; // Mã lớp
  name: string; // Tên lớp
  subject: string;
  studyDate: Date;
  studyTime: string;
  teacherName: string;
  content: string;
  attendance: string; // ví dụ: "18/25"
}

