import { IButtonThaoTacInfoViewModel } from "./ButtonThaoTac/F9_8_8ButtonThaoTacMonitorExchange";
import { IInfoViewModel } from "./F9_8_8ReadMonitorExchange";

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

export const mockDataButtonThaoTac: IButtonThaoTacInfoViewModel[] = [
  {
    maLuotTraoDoi: "LTTC-2025-001",
    ngayLienLac: "2025-10-01",
    noiDungLienLac: "Email hỏi thẩm tính hình học tập và chỗ ở.",
    nguoiLienLac: "Phạm Thị Gấm (HTQT)",
    ghiChu: "Sinh viên cho biết mọi thứ ổn.",
  },
  {
    maLuotTraoDoi: "LTTC-2025-001",
    ngayLienLac: "2025-11-15",
    noiDungLienLac: "Điện thoại hỗ trợ về vấn đề gia hạn visa.",
    nguoiLienLac: "Trần Văn Bình (HTQT)",
    ghiChu: "Đã hướng dẫn sinh viên liên hệ Đại sứ quán.",
  },
  {
    maLuotTraoDoi: "LTTC-2025-002",
    ngayLienLac: "2025-12-01",
    noiDungLienLac: "Email nhắc nhở về việc nộp báo cáo giữa kỳ.",
    nguoiLienLac: "Lê Thị Mai (HTQT)",
    ghiChu: "Đã nhận được báo cáo.",
  },
];

export const mockDataNguoiLienLac: string[] = ["Phạm Thị Gấm (HTQT)", "Trần Văn Bình (HTQT)", "Lê Thị Mai (HTQT)"];
