import { IAttachedSurveyFormInfoViewModel } from "./SetUpAnnualSurveyScenarioCreate/AttachedSurveyFormTab/AttachedSurveyFormRead";
import { ISetUpAnnualSurveyScenarioInfoViewModel } from "./SetUpAnnualSurveyScenarioRead";


export const mockSurveyScenario: ISetUpAnnualSurveyScenarioInfoViewModel[] = [
  {
    maKichBanGoc: "KB-HK-CHUAN",
    tenKichBanGoc: "Kịch bản Khảo sát Chuẩn Cuối Học kỳ",
    loaiChuKyLapLai: "Theo Học kỳ",
    thoiDiemTrienKhai: "Cuối Học kỳ 1 (Tháng 12/2025)",
    ngayBatDauDuKien: "2025-12-01",
    ngayKetThucDuKien: "2025-12-15",
    donViPhoiHopGoiY: "Phòng Đào tạo; Phòng Công tác Sinh viên",
    ghiChu: "Khảo sát tất cả các môn học.",
    namHoc: "Học kỳ 1 - năm học 2025 - 2026",
  },
  {
    maKichBanGoc: "KB-HK-CHUAN",
    tenKichBanGoc: "Kịch bản Khảo sát Chuẩn Cuối Học kỳ",
    loaiChuKyLapLai: "Theo Học kỳ",
    thoiDiemTrienKhai: "Cuối Học kỳ 2 (Tháng 5/2026)",
    ngayBatDauDuKien: "2026-05-01",
    ngayKetThucDuKien: "2026-05-15",
    donViPhoiHopGoiY: "Phòng Đào tạo; Phòng Công tác Sinh viên",
    ghiChu: "Chú trọng môn chuyên ngành.",
    namHoc: "Học kỳ 2 - năm học 2025 - 2026",
  },
  {
    maKichBanGoc: "KB-CTDT-RV",
    tenKichBanGoc: "Kịch bản Rà soát Chương trình Đào tạo Hàng năm",
    loaiChuKyLapLai: "Theo Năm học",
    thoiDiemTrienKhai: "Tháng 3/2026",
    ngayBatDauDuKien: "2026-03-01",
    ngayKetThucDuKien: "2026-03-31",
    donViPhoiHopGoiY: "Phòng Đảm bảo Chất lượng; Các Khoa chuyên môn",
    ghiChu: "",
    namHoc: "Năm học 2025 - 2026",
  },
  {
    maKichBanGoc: "KB-TS-HV",
    tenKichBanGoc: "Kịch bản Khảo sát Hàng năm cho Thí sinh và Cựu sinh viên",
    loaiChuKyLapLai: "Theo Năm học",
    thoiDiemTrienKhai: "Tháng 9/2025",
    ngayBatDauDuKien: "2025-09-10",
    ngayKetThucDuKien: "2025-09-30",
    donViPhoiHopGoiY: "Phòng Tuyển sinh; Phòng Cựu sinh viên",
    ghiChu: "Tập trung vào tân sinh viên.",
    namHoc: "Năm học 2025 - 2026",
  },
  {
    maKichBanGoc: "KB-AD-DBCL",
    tenKichBanGoc: "Kịch bản Đánh giá Đảm bảo Chất lượng Nội bộ",
    loaiChuKyLapLai: "Không lặp lại (Một lần)",
    thoiDiemTrienKhai: "Tháng 11/2025",
    ngayBatDauDuKien: "2025-11-01",
    ngayKetThucDuKien: "2025-11-15",
    donViPhoiHopGoiY: "Phòng Đảm bảo Chất lượng",
    ghiChu: "Khảo sát cán bộ phòng ban khối hành chính.",
    namHoc: "Không chu kỳ",
  },
];


export const selectLoaiChuKyLapLai: string[] = [
  "Theo Học kỳ",
  "Theo Năm học",
]

export const mockDataAttachedSurveyForm: IAttachedSurveyFormInfoViewModel[] = [
  {
      maMauPhieu: "MP-SV-CBGD",
      tenMauPhieu: "01. Sinh viên đánh giá CBGD & Môn học",
      thoiGianTrienKhaiTuongDoi: "Tuần thở 10 của học kỳ; Sau khi kết thúc môn học 1 tuần",
      loaiPhieu: "01. Sinh viên đánh giá CBGD & Môn học",
      donViChuTri: "Phòng Đào tạo",
      nguongTyLePhanHoiGoiY: 85,
  },
  {
      maMauPhieu: "MP-SV-CSVC",
      tenMauPhieu: "07. Sinh viên đánh giá trường",
      thoiGianTrienKhaiTuongDoi: "Cuối học kỳ",
      loaiPhieu: "07. Sinh viên đánh giá trường",
      donViChuTri: "Phòng Hành chính - Quản trị",
      nguongTyLePhanHoiGoiY: 70,
  },
  {
      maMauPhieu: "MP-GV-LD",
      tenMauPhieu: "03. CBCNV đánh giá lãnh đạo",
      thoiGianTrienKhaiTuongDoi: "Cuối học kỳ; Trước kỳ nghỉ hè",
      loaiPhieu: "03. CBCNV đánh giá lãnh đạo",
      donViChuTri: "Phòng Tổ chức Cán bộ",
      nguongTyLePhanHoiGoiY: 60,
  },
  {
      maMauPhieu: "MP-CB-TRUONG",
      tenMauPhieu: "08. CBCNV đánh giá trường",
      thoiGianTrienKhaiTuongDoi: "Giữa học kỳ 2",
      loaiPhieu: "08. CBCNV đánh giá trường",
      donViChuTri: "Phòng Tổ chức Cán bộ",
      nguongTyLePhanHoiGoiY: 55,
  },
  {
      maMauPhieu: "MP-SV-CTDT",
      tenMauPhieu: "06. Sinh viên đánh giá CTDT",
      thoiGianTrienKhaiTuongDoi: "Sau khi hoàn thành 50% tín chỉ chương trình",
      loaiPhieu: "06. Sinh viên đánh giá CTDT",
      donViChuTri: "Khoa CNTT, Khoa KTQT",
      nguongTyLePhanHoiGoiY: 75,
  },
]

export const selectTenPhieu: string[] = Array.from(
  new Set(
    mockDataAttachedSurveyForm
      .filter(item => item.tenMauPhieu !== undefined)
      .map(item => item.tenMauPhieu as string)
  )
);