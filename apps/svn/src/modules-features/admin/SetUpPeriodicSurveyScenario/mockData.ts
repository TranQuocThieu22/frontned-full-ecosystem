import { IAttachedSurveyFormInfoViewModel } from "./SetUpPeriodicSurveyScenarioCreate/AttachedSurveyFormTab/AttachedSurveyFormRead";
import { ISetUpPeriodicSurveyScenarioInfoViewModel } from "./SetUpPeriodicSurveyScenarioRead";

export const mockData: ISetUpPeriodicSurveyScenarioInfoViewModel[] = [
  {
      maKichBan: "KB-HK-CHUAN",
      tenKichBan: "Kịch bản Khảo sát Chuẩn Cuối Học kỳ",
      moTaKichBan: "Boo góm các khảo sát chất lượng giảng dạy, dịch vụ, và cơ sở vật chất định kỳ vào cuối mỗi học kỳ",
      loaiChuKyLapLai: "Theo Học kỳ",
      chiTietChuKy: "Học kỳ 1, Học kỳ 2",
      soLuongMauPhieu: 5,
  },
  {
      maKichBan: "KB-CTDT-RV",
      tenKichBan: "Kịch bản Rõ soát Chương trình Đào tạo Hàng năm",
      moTaKichBan: "Tập hợp các phiếu khảo sát dành cho việc đánh giá và rà soát định kỳ chương trình đào tạo.",
      loaiChuKyLapLai: "Theo Năm học",
      chiTietChuKy: "Cả Năm",
      soLuongMauPhieu: 3,
  },
  {
      maKichBan: "KB-TS-HV",
      tenKichBan: "Kịch bản Khảo sát Hàng năm cho Thí sinh và Cựu sinh viên",
      moTaKichBan: "Phiếu khảo sát mức độ hài lòng của thí sinh và tình hình việc làm của cựu sinh viên.",
      loaiChuKyLapLai: "Theo Năm học",
      chiTietChuKy: "Cả Năm",
      soLuongMauPhieu: 2,
  },
]

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