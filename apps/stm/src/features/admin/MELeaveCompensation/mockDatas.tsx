import { I_MakeUpClassSchedule, I_MakeUpLessonRequest } from "./interfaces";
import { EnumMakeUpStatus } from "./LeaveCompensationStatusBadge";

export const mockData_MakeUpLessonRequest: I_MakeUpLessonRequest[] = [
  {
    code: "NP001",
    name: "Nguyễn Thị B",
    studentCode: "HS001",
    studentName: "Nguyễn Thị B",
    subject: "Toán 7A",
    absenceDate: new Date("2025-07-15T15:30:00"),
    reason: "Ốm sốt, có giấy bác sĩ",
    makeUpStatus: EnumMakeUpStatus.NOT_SCHEDULED,
  },
  {
    code: "NP001",
    name: "Nguyễn Thị B",
    studentCode: "HS001",
    studentName: "Nguyễn Thị B",
    subject: "Khoa học 7",
    absenceDate: new Date("2025-07-17T09:00:00"),
    reason: "Ốm sốt, có giấy bác sĩ",
    makeUpStatus: EnumMakeUpStatus.NOT_SCHEDULED,
  },
  {
    code: "NP003",
    name: "Phạm Hữu D",
    studentCode: "HS003",
    studentName: "Phạm Hữu D",
    subject: "Ngữ Văn 8B",
    absenceDate: new Date("2025-07-20T10:00:00"),
    reason: "Đi du lịch cùng gia đình",
    makeUpStatus: EnumMakeUpStatus.NOT_SCHEDULED,
  },
  {
    code: "NP003",
    name: "Phạm Hữu D",
    studentCode: "HS003",
    studentName: "Phạm Hữu D",
    subject: "Ngữ Văn 8B",
    absenceDate: new Date("2025-07-22T14:00:00"),
    reason: "Đi du lịch cùng gia đình",
    makeUpStatus: EnumMakeUpStatus.NOT_SCHEDULED,
  },
];

export const mockData_MakeUpClassSchedule: I_MakeUpClassSchedule[] = [
  {
    code: "TOAN7B",
    name: "Toán 7B",
    subject: "Toán",
    studyDate: new Date("2025-07-16"),
    studyTime: "18:00-19:30",
    teacherName: "Trần Văn A",
    content: "Bài 5: Phân số và số thập phân (tiếp)",
    attendance: "18/25"
  },
  {
    code: "TOAN7C",
    name: "Toán 7C",
    subject: "Toán",
    studyDate: new Date("2025-07-17"),
    studyTime: "09:00-10:30",
    teacherName: "Lê Thị B",
    content: "Bài 5: Phân số và số thập phân (luyện tập)",
    attendance: "20/25"
  },
  {
    code: "TOAN7A-T2",
    name: "Toán 7A - Buổi tối Thứ 2",
    subject: "Toán",
    studyDate: new Date("2025-07-21"),
    studyTime: "19:00-20:30",
    teacherName: "Trần Văn A",
    content: "Bài 5: Phân số và số thập phân (ôn tập)",
    attendance: "15/25"
  },
  {
    code: "TOAN7D",
    name: "Toán 7D",
    subject: "Toán",
    studyDate: new Date("2025-07-18"),
    studyTime: "14:00-15:30",
    teacherName: "Nguyễn Văn C",
    content: "Bài 6: Tỷ lệ thức (giới thiệu)",
    attendance: "23/25"
  },
  {
    code: "TOAN7E",
    name: "Toán 7E",
    subject: "Toán",
    studyDate: new Date("2025-07-19"),
    studyTime: "08:00-09:30",
    teacherName: "Trần Văn A",
    content: "Bài 4: Số nguyên (luyện tập)",
    attendance: "17/25"
  },
];

