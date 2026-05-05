export interface IReceiveLeaveViewModel {
  code?: string; // Mã đơn nghỉ phép
  requestDate?: string; // Ngày gửi đơn
  studentCode?: string; // Mã học sinh
  studentName?: string; // Họ và tên HS
  relatedClassOrCourse?: string; // Lớp/Khóa học liên quan
  startDate?: string; // Ngày bắt đầu nghỉ
  endDate?: string; // Ngày kết thúc nghỉ
  affectedSessions?: string; // Buổi học bị ảnh hưởng
  reason?: string; // Lý do nghỉ
  sender?: string; // Người gửi
  status?: string; // Trạng thái
  handler?: string; // Người xử lý
  handleDate?: string; // Ngày xử lý
  rejectionReason?: string; // Lý do từ chối (nếu có)
  suggestMakeupClass?: boolean; // Đề xuất bù lớp
  notifyTo?: boolean; // Gửi thông báo cho GV/HS/PH
}
