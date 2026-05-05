import { IApprovalForUseInfoViewModel } from "./ApprovalForUseRead";
import { IElectronicLecturesInfoViewModel } from "./ApprovalForUseReadUpdate";

export const mockData: IApprovalForUseInfoViewModel[] = [
  {
      maQuyetDinh: "QD2025001",
      soQuyetDinh: "QĐ-2025/123/HV-ĐH",
      ngayQuyetDinh: "2025-12-01",
      nguoiKyQuyetDinh: "PGS.TS. Lê Văn T (Hiệu trưởng)",
      trangThaiQuyetDinh: "Đã ban hành",
      fileQuyetDinh: "QD_2025_123.pdf",
  },
  {
      maQuyetDinh: "QD2025002",
      soQuyetDinh: "QĐ-2025/124/HV-QLKH",
      ngayQuyetDinh: "2025-12-10",
      nguoiKyQuyetDinh: "TS. Nguyễn B (Trưởng Phòng QLKH)",
      trangThaiQuyetDinh: "Đang chờ ký",
      fileQuyetDinh: undefined,
  },
  {
      maQuyetDinh: "QD2025003",
      soQuyetDinh: "QĐ-2025/125/HV-HT",
      ngayQuyetDinh: "2025-12-15",
      nguoiKyQuyetDinh: "GS.TS. Phan A (Chủ tịch HĐKH)",
      trangThaiQuyetDinh: "Đã ban hành",
      fileQuyetDinh: "QD_2025_125.pdf",
  }
];


export const mockDataElectronicLectures: IElectronicLecturesInfoViewModel[] = [
  {
      maBanThao: "BT002",
      tenGiaoTrinhDeXuat: "Giáo trình Phân tích Dũ liệu Lớn",
      chuBienBanBienSoan: "TS. Hoảng D"
  },
  {
      maBanThao: "BT004",
      tenGiaoTrinhDeXuat: "Giáo trình Dược lý học",
      chuBienBanBienSoan: "TS. Trằn T"
  },
  {
      maBanThao: "BT007",
      tenGiaoTrinhDeXuat: "Giáo trình Cơ sở Dũ liệu",
      chuBienBanBienSoan: "ThS. Lê K"
  }
]