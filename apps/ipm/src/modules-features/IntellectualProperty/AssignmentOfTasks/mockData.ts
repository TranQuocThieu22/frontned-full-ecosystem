import { IAssignmentOfTasksButtonPhanCongInfoViewModel } from "./AssignmentOfTasksButtonPhanCong";
import { IAssignmentOfTasksReadInfoViewModel } from "./AssignmentOfTasksRead";

export const mockData: IAssignmentOfTasksReadInfoViewModel[] = [
  {
    maIp: "IP-SC-2024-002",
    tenIp: "Thuật toán nhận dạng khuôn mặt bằng AI",
    buocHienTai: "Thẩm định nội dung",
    ngayHoanThanhBuoc: undefined,
    thoiHanTiepTheo: "2025-07-10",
    trangThaiHoSoChiTiet: "Đang chờ ý kiến thẩm định",
    canBoPhuTrach: "Nguyễn Thị B",
    ghiChu: "Đã giải công văn phản hồi lần 1",
  },
  {
    maIp: "IP-KDCN-2025-001",
    tenIp: "Thiết kế hình lọc nước thông minh",
    buocHienTai: "Nộp đơn chính thức",
    ngayHoanThanhBuoc: "2025-06-01",
    thoiHanTiepTheo: "2025-08-01",
    trangThaiHoSoChiTiet: "Đã được Cục SHTT tiếp nhận",
    canBoPhuTrach: "Trần Văn C",
    ghiChu: "Chờ có số đơn chính thức",
  },
  {
    maIp: "IP-NH-2024-001",
    tenIp: "GreenChem",
    buocHienTai: "Công bố đơn",
    ngayHoanThanhBuoc: "2024-05-20",
    thoiHanTiepTheo: undefined,
    trangThaiHoSoChiTiet: "Đã công bố trên Công báo SHTT",
    canBoPhuTrach: "Lê Thị D",
    ghiChu: "Không có ý kiến phản đối",
  },
  {
    maIp: "IP-SC-2023-001",
    tenIp: "Hệ thống quản lý chất thải thông minh",
    buocHienTai: "Duy trì hiệu lực (Nộp phí)",
    ngayHoanThanhBuoc: undefined,
    thoiHanTiepTheo: "2025-03-01",
    trangThaiHoSoChiTiet: "Sắp đến hạn nộp phí duy trì năm 3",
    canBoPhuTrach: "Nguyễn Thị B",
    ghiChu: "Đã gửi thông báo đến tác giả",
  },
];


export const mockDataButtonPhanCong: IAssignmentOfTasksButtonPhanCongInfoViewModel[] = [
  {
      buocTrongQuyTrinh: "1. Tiếp nhận hồ sơ nộp bổ",
      ngayBatDauBuoc: "2023-02-20",
      ngayKetThucBuoc: "2023-02-28",
      moTaGhiChuChiTiet: "Chuẩn bị và kiểm tra hồ sơ nộp bổ.",
      taiLieuCanThiet: "Bằng độc quyền sáng chế",
      laiLichSuDung: "Văn bằng bảo hộ",
      nguoiPhuTrach: "Nguyễn Thị B",
  },
  {
      buocTrongQuyTrinh: "2. Nộp đơn chính thức",
      ngayBatDauBuoc: "2023-03-01",
      ngayKetThucBuoc: "2023-03-01",
      moTaGhiChuChiTiet: "Hồ sơ đã được nộp tại Cục SHTT.",
      taiLieuCanThiet: "Bằng độc quyền sáng chế",
      laiLichSuDung: "Văn bằng bảo hộ",
      nguoiPhuTrach: "Nguyễn Thị B",
  },
  {
      buocTrongQuyTrinh: "3. Thẩm định hình thức",
      ngayBatDauBuoc: "2023-03-05",
      ngayKetThucBuoc: "2024-04-15",
      moTaGhiChuChiTiet: "Cục SHTT kiểm tra tính hợp lệ về hình thức.",
      taiLieuCanThiet: "Bằng độc quyền sáng chế",
      laiLichSuDung: "Văn bằng bảo hộ",
      nguoiPhuTrach: "Nguyễn Thị B",
  },
  {
      buocTrongQuyTrinh: "4. Công bố đơn",
      ngayBatDauBuoc: "2023-05-20",
      ngayKetThucBuoc: "2023-05-20",
      moTaGhiChuChiTiet: "Đơn đã được công bố trên Công báo SHTT số 450.",
      taiLieuCanThiet: "Bằng độc quyền sáng chế",
      laiLichSuDung: "Văn bằng bảo hộ",
      nguoiPhuTrach: "Nguyễn Thị B",
  },
  {
      buocTrongQuyTrinh: "5. Thẩm định nội dung",
      ngayBatDauBuoc: "2023-06-01",
      ngayKetThucBuoc: "2024-11-15",
      moTaGhiChuChiTiet: "Quá trình thẩm định về tính mới, tính sáng tạo khả năng áp dụng công nghiệp.",
      taiLieuCanThiet: "Bằng độc quyền sáng chế",
      laiLichSuDung: "Văn bằng bảo hộ",
      nguoiPhuTrach: "Nguyễn Thị B",
  },
  {
      buocTrongQuyTrinh: "6. Ra quyết định / Cấp văn bằng",
      ngayBatDauBuoc: "N/A",
      ngayKetThucBuoc: "2024-12-20",
      moTaGhiChuChiTiet: "Cục SHTT ra quyết định cấp bằng độc quyền sáng chế.",
      taiLieuCanThiet: "Bằng độc quyền sáng chế",
      laiLichSuDung: "Văn bằng bảo hộ",
      nguoiPhuTrach: "Nguyễn Thị B",
  },
  {
      buocTrongQuyTrinh: "7. Duy trì hiệu lực",
      ngayBatDauBuoc: "2024-03-01",
      ngayKetThucBuoc: "2025-03-01 (lần 2)",
      moTaGhiChuChiTiet: "Nộp phí duy trì hiệu lực hàng năm.",
      taiLieuCanThiet: "Bằng độc quyền sáng chế",
      laiLichSuDung: "Văn bằng bảo hộ",
      nguoiPhuTrach: "Nguyễn Thị B",
  },
]

export const mockDataNguoiPhuTrach: string[] = [
  "Nguyễn Thị B",
  "Trần Văn C",
  "Lê Thị D",
]