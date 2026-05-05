import { IButtonDanhGiaInfoViewModel } from "./F9_8_6ButtonDanhGiaCandidateProfileEvaluation";
import { ICandidateProfileEvaluationInfoViewModel } from "./F9_8_6ReadCandidateProfileEvaluation";

export const mockDataRead: ICandidateProfileEvaluationInfoViewModel[] = [
  {
    maHoSo: "HSXT-2025-0011",
    tenNguoiDangKy: "Nguyễn Văn A",
    chuongTrinh: "CTTCB-2025-001 (SV Kỹ thuật)",
    doiTac: "Siemens AG",
    chieuDangKy: "Đi",
    trangThaiHoSo: "Đang xét duyệt",
    ngayDangKy: "2025-03-10",
  },
  {
    maHoSo: "HSXT-2025-0012",
    tenNguoiDangKy: "Trần Thị B",
    chuongTrinh: "CTTCB-2025-001 (SV Kỹ thuật)",
    doiTac: "Siemens AG",
    chieuDangKy: "Đi",
    trangThaiHoSo: "Đã nộp",
    ngayDangKy: "2025-03-12",
  },
  {
    maHoSo: "HSXT-2025-0013",
    tenNguoiDangKy: "TS. Trần Bình",
    chuongTrinh: "CTTCB-2025-002 (GV Khoa Y)",
    doiTac: "NUS",
    chieuDangKy: "Đi",
    trangThaiHoSo: "Đang xét duyệt",
    ngayDangKy: "2025-06-15",
  },
  {
    maHoSo: "HSXT-2025-0014",
    tenNguoiDangKy: "Li Wei",
    chuongTrinh: "CTTCB-2025-001 (SV Kỹ thuật)",
    doiTac: "Siemens AG",
    chieuDangKy: "Đến",
    trangThaiHoSo: "Đã nhập",
    ngayDangKy: "2025-04-01",
  },
  {
    maHoSo: "HSXT-2025-0015",
    tenNguoiDangKy: "Park Ji-Hoon",
    chuongTrinh: "CTTCB-2025-006 (NCS - Đến)",
    doiTac: "ĐH California",
    chieuDangKy: "Đến",
    trangThaiHoSo: "Đang xem xét",
    ngayDangKy: "2025-07-05",
  },
];

export const mockDataButtonDanhGia: IButtonDanhGiaInfoViewModel[] = [
  {
    maKetQuaDanhGia: "KQ001",
    maHoSo: "HSXT-2025-001",
    maBuocXetDuyet: "BXD001",
    nguoiDanhGia: "CB001 (Phạm Thị Gầm)",
    ngayDanhGia: "2025-03-15",
    diemSo: 8,
    nhanXet: "Hồ sơ đầy đủ, đạt yêu cầu cơ bản về GPA và tiếng Anh.",
    quyetDinhBuocNay: "Chuyển tiếp",
    taiLieuKemTheo: "file1.pdf",
  },
  {
    maKetQuaDanhGia: "KQ002",
    maHoSo: "HSXT-2025-001",
    maBuocXetDuyet: "BXD002",
    nguoiDanhGia: "GV002 (TS. Lê Văn Khải)",
    ngayDanhGia: "2025-04-01",
    diemSo: 90,
    nhanXet: "Kế hoạch học tập chi tiết, phù hợp với định hướng phát triển của Khoa. Sinh viên có năng lực tốt.",
    quyetDinhBuocNay: "Chuyển tiếp",
    taiLieuKemTheo: "",
  },
  {
    maKetQuaDanhGia: "KQ003",
    maHoSo: "HSXT-2025-001",
    maBuocXetDuyet: "BXD003",
    nguoiDanhGia: "GV005 (GS. Nguyễn Thị Hương)",
    ngayDanhGia: "2025-04-10",
    diemSo: 8.5,
    nhanXet: "Kỹ năng giao tiếp và khả năng thích nghi tốt. Rất năng động.",
    quyetDinhBuocNay: "Chuyển tiếp",
    taiLieuKemTheo: "",
  },
  {
    maKetQuaDanhGia: "KQ004",
    maHoSo: "HSXT-2025-001",
    maBuocXetDuyet: "BXD004",
    nguoiDanhGia: "LD001 (Hội đồng Xét duyệt)",
    ngayDanhGia: "2025-05-01",
    diemSo: undefined,
    nhanXet: "Hồ sơ được chấp nhận sau các vòng đánh giá tích cực.",
    quyetDinhBuocNay: "Được duyệt",
    taiLieuKemTheo: "",
  },
];

export const mockDataQuyetDinhBuocNay: string[] = ["Chuyển tiếp", "Được duyệt"];
