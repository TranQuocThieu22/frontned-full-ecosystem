import { IButtonCheckListInfoViewModel } from "./F9_8_7ButtonCheckListExchangeSession";
import { IInfoViewModel } from "./F9_8_7ReadExchangeSession";

export const mockDataRead: IInfoViewModel[] = [
  {
    maLuotTraoDoi: "LTTC-2025-001",
    maHoSo: "HSXT-2025-001",
    maDoiTac: "DTQT-003",
    maNguoiDung: "SV001",
    chieuTraoDoi: "Đi",
    thoiGianBatDauDuKien: "2025-09-01",
    thoiGianKetThucDuKien: "2026-02-28",
    trangThaiLuotTraoDoi: "Sắp diễn ra",
    noiDenDi: "Siemens AG, Đức",
  },
  {
    maLuotTraoDoi: "LTTC-2025-002",
    maHoSo: "HSXT-2025-003",
    maDoiTac: "DTQT-005",
    maNguoiDung: "GV002",
    chieuTraoDoi: "Đi",
    thoiGianBatDauDuKien: "2025-11-15",
    thoiGianKetThucDuKien: "2026-02-15",
    trangThaiLuotTraoDoi: "Sắp diễn ra",
    noiDenDi: "NUS, Singapore",
  },
  {
    maLuotTraoDoi: "LTTC-2025-003",
    maHoSo: "HSXT-2025-004",
    maDoiTac: "DTQT-003",
    maNguoiDung: "SV010",
    chieuTraoDoi: "Đến",
    thoiGianBatDauDuKien: "2025-08-15",
    thoiGianKetThucDuKien: "2026-01-15",
    trangThaiLuotTraoDoi: "Sắp diễn ra",
    noiDenDi: "Trường bạn",
  },
];

export const mockDataButtonThaoTac: IButtonCheckListInfoViewModel[] = [
  {
    maLuotTraoDoi: "LTTC-2025-001",
    mucChuanBi: "Xin Visa",
    trangThai: "Đã xong",
    ngayHoanThanh: "2025-07-15",
    ghiChu: "Visa Schengen đã được cấp",
  },
  {
    maLuotTraoDoi: "LTTC-2025-001",
    mucChuanBi: "Mua Bảo Hiểm",
    trangThai: "Đã xong",
    ngayHoanThanh: "2025-07-20",
    ghiChu: "Bảo hiểm du lịch quốc tế đã mua.",
  },
  {
    maLuotTraoDoi: "LTTC-2025-001",
    mucChuanBi: "Vé Máy Bay",
    trangThai: "Đã xong",
    ngayHoanThanh: "2025-08-01",
    ghiChu: "Đã đặt vé khứ hồi.",
  },
  {
    maLuotTraoDoi: "LTTC-2025-001",
    mucChuanBi: "Chỗ ở",
    trangThai: "Đã xong",
    ngayHoanThanh: "2025-08-10",
    ghiChu: "Đã đăng ký ở ký túc xá của Siemens.",
  },
  {
    maLuotTraoDoi: "LTTC-2025-001",
    mucChuanBi: "Thủ tục nhập học",
    trangThai: "Đã xong",
    ngayHoanThanh: "2025-08-20",
    ghiChu: "Đã hoàn tất thủ tục với Siemens.",
  },
  {
    maLuotTraoDoi: "LTTC-2025-002",
    mucChuanBi: "Xin Visa",
    trangThai: "Đang chờ",
    ngayHoanThanh: undefined,
    ghiChu: "Đang chờ phản hồi từ Đại sứ quán.",
  },
];

export const mockDataTrangThai: string[]=[
  "Đã xong",
  "Đang chờ",
]
