export interface IThanhLapToThamDinhKinhPhiViewModel {
  id: number;
  code: string; // Mã tổ thẩm định (TTD2025xxxx)
  name: string; // Tên tổ thẩm định
  meetingDate: string; // Ngày họp (dd/mm/yyyy)
  location: string; // Địa điểm họp
  time: string; // Thời gian họp (ví dụ: "09:00 - 11:00")
  members: string[]; // Danh sách thành viên tổ (chỉ tên hoặc mã - tên)
  registerIds: string[]; // Mã các đề tài được thẩm định
  fileUrl: string; // Đường dẫn file quyết định
  status: string; // Trạng thái tổ (Đang thẩm định / Đã thành lập)
}

export interface VienChucVuViewModel {
  id: number;
  code: string;
  name: string; // Tên đề tài
  birthDate?: string;
  gender?: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
}

export interface ThanhVienViewModel extends VienChucVuViewModel {
  role: string;
}

export interface DangKyTuyenChonViewModel {
  id: number;
  code: string;  // Mã đăng ký
  name: string; // Tên đề tài
  field: string; // Lĩnh vực
  leader: string; // Chủ nhiệm
  suitability: "Phù hợp" | "Không phù hợp"; // Đánh giá của hội đồng
  score: number; // Đánh giá phù hợp
  comment: string; // Ghi chú
}
