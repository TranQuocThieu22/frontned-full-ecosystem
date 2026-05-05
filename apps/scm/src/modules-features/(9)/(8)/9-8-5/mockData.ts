import { IInfoViewModel } from "./F9_8_5ReadExchangeRegister";

export const mockDataRead: IInfoViewModel[] = [
  {
      maHoSo: "HSXT-2025-001",
      tenNguoiDangKy: "Nguyễn Văn A",
      chuongTrinh: "CTTCB-2025-001 (SV Kỹ thuật)",
      doiTac: "Siemens AG",
      chieuDangKy: "Đi",
      trangThaiHoSo: "Đang xét duyệt",
      ngayDangKy: "2025-03-10"
  },
  {
      maHoSo: "HSXT-2025-002",
      tenNguoiDangKy: "Trần Thị B",
      chuongTrinh: "CTTCB-2025-001 (SV Kỹ thuật)",
      doiTac: "Siemens AG",
      chieuDangKy: "Đi",
      trangThaiHoSo: "Đã nộp",
      ngayDangKy: "2025-03-12"
  },
  {
      maHoSo: "HSXT-2025-003",
      tenNguoiDangKy: "TS. Trần Bình",
      chuongTrinh: "CTTCB-2025-002 (GV Khoa Y)",
      doiTac: "NUS",
      chieuDangKy: "Đi",
      trangThaiHoSo: "Đang xét duyệt",
      ngayDangKy: "2025-06-15"
  },
  {
      maHoSo: "HSXT-2025-004",
      tenNguoiDangKy: "Li Wei",
      chuongTrinh: "CTTCB-2025-001 (SV Kỹ thuật)",
      doiTac: "Siemens AG",
      chieuDangKy: "Đến",
      trangThaiHoSo: "Đã nhập",
      ngayDangKy: "2025-04-01"
  },
  {
      maHoSo: "HSXT-2025-005",
      tenNguoiDangKy: "Park Ji-Hoon",
      chuongTrinh: "CTTCB-2025-006 (NCS - Đến)",
      doiTac: "ĐH California",
      chieuDangKy: "Đến",
      trangThaiHoSo: "Đang xem xét",
      ngayDangKy: "2025-07-05"
  }
]

export const mockDataNguoiDangKy: string[] = [
  "Nguyễn Văn A",
  "Trần Thị B",
  "TS. Trần Bình",
  "Li Wei",
  "Park Ji-Hoon"
];

export const mockDataChuongTrinh: string[] = [
  "CTTCB-2025-001 (SV Kỹ thuật)",
  "CTTCB-2025-002 (GV Khoa Y)",
  "CTTCB-2025-006 (NCS - Đến)",
];