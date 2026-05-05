import { ICheckTheFinalVersionInfoViewModel } from "./CheckTheFinalVersionRead";

export const mockData: ICheckTheFinalVersionInfoViewModel[] = [
  {
    maBanThao: "BT001",
    tenGiaoTrinhDeXuat: "Giáo trình Nguyên lý Kế toán",
    chuBienBanBienSoan: "ThS. Nguyễn Văn A (GV12345)",
    trangThaiBanThaoHienTai: "Yêu cầu chỉnh sửa (sau sơ bộ)",
    ngayHoanThienGanNhat: "2025-10-05",
    fileBanThaoDaCapNhat: "Xem file",
    trangThaiKiemTraLai: "Đang cho sơ duyệt",
    nhanXetGopYBoSung: undefined,
    ngayKiemTraLai: undefined,
    nguoiKiemTraLai: undefined,
  },
  {
    maBanThao: "BT002",
    tenGiaoTrinhDeXuat: "Giáo trình Phân tích Dữ liệu Lớn",
    chuBienBanBienSoan: "TS. Hoàng D (GV99887)",
    trangThaiBanThaoHienTai: "Yêu cầu chỉnh sửa (sau thẩm định)",
    ngayHoanThienGanNhat: "2025-11-15",
    fileBanThaoDaCapNhat: "Xem file",
    trangThaiKiemTraLai: "Đã duyệt",
    nhanXetGopYBoSung: "Bản thảo đã được chỉnh sửa đầy đủ và đáp ứng các yêu cầu thẩm định.",
    ngayKiemTraLai: "2025-11-20",
    nguoiKiemTraLai: "Nguyễn Thị K (CB.QLKH01)",
  },
  {
    maBanThao: "BT003",
    tenGiaoTrinhDeXuat: "Giáo trình Kinh tế Vĩ mô",
    chuBienBanBienSoan: "PGS. Kim G (GV44556)",
    trangThaiBanThaoHienTai: "Yêu cầu chỉnh sửa (sau sơ bộ)",
    ngayHoanThienGanNhat: undefined,
    fileBanThaoDaCapNhat: "Xem file",
    trangThaiKiemTraLai: "Đang cho sơ duyệt",
    nhanXetGopYBoSung: undefined,
    ngayKiemTraLai: undefined,
    nguoiKiemTraLai: undefined,
  },
  {
    maBanThao: "BT004",
    tenGiaoTrinhDeXuat: "Giáo trình Dược lý học",
    chuBienBanBienSoan: "TS. Trần T (GV00112)",
    trangThaiBanThaoHienTai: "Yêu cầu chỉnh sửa (sau thẩm định)",
    ngayHoanThienGanNhat: "2025-11-10",
    fileBanThaoDaCapNhat: "Xem file",
    trangThaiKiemTraLai: "Yêu cầu chinh sửa",
    nhanXetGopYBoSung: "Cần bổ sung thêm 2 ví dụ lâm sàng theo góp ý ban đầu.",
    ngayKiemTraLai: "2025-11-15",
    nguoiKiemTraLai: "Nguyễn Thị K (CB.QLKH01)",
  },
];

export const mockDataTrangThaiKiemTraLai: string[] = [
  "Đang cho sơ duyệt",
  "Yêu cầu chinh sửa",
  "Đã duyệt",
  "Đã từ chối",
];
