import { IApproveLeaveViewModel } from "./intefaces";

export const approveLeaves: IApproveLeaveViewModel[] = [
  {
    code: "NP001",
    requestDate: "2025-07-14 09:00",
    studentCode: "HS001",
    studentName: "Nguyễn Thị B",
    relatedClassOrCourse: "Toán 7A, Khoa học 7",
    startDate: "2025-07-15",
    endDate: "2025-07-17",
    affectedSessions: "Toán 7A - 15/07/2025 (Buổi 15:30-17:00), Khoa học 7 - 17/07/2025 (Buổi 09:00-10:30)",
    reason: "Ốm sốt, có giấy bác sỹ",
    sender: "Phụ huynh Nguyễn Thị B",
    status: "Đã duyệt",
    handler: "QLĐT An Nguyễn",
    handleDate: "2025-07-14 10:30",
    rejectionReason: "",
    suggestMakeupClass: true,
    notifyTo: true
  },
  {
    code: "NP002",
    requestDate: "2025-07-14 09:30",
    studentCode: "HS002",
    studentName: "Lê Văn C",
    relatedClassOrCourse: "Anh văn giao tiếp Level B1",
    startDate: "2025-07-15",
    endDate: "2025-07-16",
    affectedSessions: "Anh văn B1 - 16/07/2025 (Buổi 18:00-19:30)",
    reason: "Việc gia đình đột xuất",
    sender: "HS Lê Văn C",
    status: "Đang chờ duyệt",
    handler: "",
    handleDate: "",
    rejectionReason: "",
    suggestMakeupClass: false,
    notifyTo: false
  },
  {
    code: "NP003",
    requestDate: "2025-07-13 14:00",
    studentCode: "HS003",
    studentName: "Phạm Hữu D",
    relatedClassOrCourse: "Ngữ Văn 8B",
    startDate: "2025-07-20",
    endDate: "2025-07-22",
    affectedSessions: "Ngữ Văn 8B - 20/07/2025 (Buổi 10:00-11:30), Ngữ Văn 8B - 22/07/2025 (Buổi 14:00-15:30)",
    reason: "Đi du lịch cùng gia đình",
    sender: "Phụ huynh Phạm Hữu D",
    status: "Đã duyệt",
    handler: "QLĐT An Nguyễn",
    handleDate: "2025-07-13 15:30",
    rejectionReason: "",
    suggestMakeupClass: true,
    notifyTo: true
  },
  {
    code: "NP004",
    requestDate: "2025-07-12 10:00",
    studentCode: "HS004",
    studentName: "Đỗ Thị E",
    relatedClassOrCourse: "Vật lý 9C",
    startDate: "2025-07-15",
    endDate: "2025-07-15",
    affectedSessions: "Vật lý 9C - 15/07/2025 (Buổi 16:00-17:30)",
    reason: "Không rõ lý do",
    sender: "Phụ huynh Đỗ Thị E",
    status: "Từ chối",
    handler: "QLĐT An Nguyễn",
    handleDate: "2025-07-12 11:00",
    rejectionReason: "Không có giấy tờ xác nhận hợp lệ",
    suggestMakeupClass: false,
    notifyTo: false
  }
];

export const selectStatusOptions: string[] = [
  "Đang chờ duyệt",
  "Đã duyệt",
  "Từ chối"
];