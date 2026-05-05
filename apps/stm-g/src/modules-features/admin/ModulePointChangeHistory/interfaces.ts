export interface IPointChangeHistoryViewModel {
  code?: string; // ID vết sửa đổi
  updatedDate?: string; // Ngày cập nhật
  updatedTime?: string; // Thời gian cập nhật
  executor?: string; // Người thực hiện
  studentCode?: string; // Mã học sinh
  studentName?: string; // Tên học sinh
  subject?: string; // Môn học
  scoreType?: string; // Loại điểm
  value?: number; // Giá trị
  reason?: string; // Lý do sửa đổi
}
