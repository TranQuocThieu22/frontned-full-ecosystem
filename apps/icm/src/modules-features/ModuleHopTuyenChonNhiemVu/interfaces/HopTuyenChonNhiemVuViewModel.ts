export interface HopTuyenChonNhiemVuViewModel {
  id: number; //id
  code: string; // Mã đăng ký (DKTC...)
  name: string; // Tên đề tài
  field: string; // Lĩnh vực
  leader: string; // Chủ nhiệm
  suitability: "Phù hợp" | "Không phù hợp";
  score: number; // Thang điểm
  comment: string; // Kiến nghị / nhận xét
  pathFile?: string; // Đường dẫn file
  hoiDong: HopTuyenChonNhiemVuHoiDongViewModel;
}

export interface HopTuyenChonNhiemVuHoiDongViewModel { //Hội đồng tuyển chọn nhiệm vụ
  id: number; //id
  code?: string; //Mã hội đồng (HDTC...)
  name: string; // Tên hội đồng
  meetingDate: string; // Ngày họp (dd/mm/yyyy)
}

export interface ThanhVienViewModel {
  id: number; //id
  code: string; // Mã thành viên
  name: string; // Tên thành viên
  role: string; // Vai trò
  suitability: boolean;
  comment: string; // Kiến nghị
}