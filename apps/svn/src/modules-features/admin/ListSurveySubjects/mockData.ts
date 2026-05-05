import { IListSurveySubjectsInfoViewModel } from "./ListSurveySubjectsRead";

export const mockData: IListSurveySubjectsInfoViewModel[] = [
  {
    maDoiTuong: "SV2023001",
    tenDoiTuong: "Nguyễn Thị A",
    email: "nguyenthia@sv.edu.vn",
    soDienThoai: "0912345678",
    loaiDoiTuong: "Sinh viên",
    namHoc: "2025-2026",
    hocKy: "1",
    donViChuQuan: "CNTT",
    lop: "IT2023-01",
    khoaPhienBan: "K2023"
  },
  {
    maDoiTuong: "SV2023002",
    tenDoiTuong: "Trần Văn B",
    email: "tranvanb@sv.edu.vn",
    soDienThoai: "0912345679",
    loaiDoiTuong: "Sinh viên",
    namHoc: "2025-2026",
    hocKy: "1",
    donViChuQuan: "KTQT",
    lop: "KTQT2023-02",
    khoaPhienBan: "K2023"
  },
  {
    maDoiTuong: "GV001",
    tenDoiTuong: "Lê Thị C",
    email: "lethic@gv.edu.vn",
    soDienThoai: "0987654321",
    loaiDoiTuong: "Giảng viên",
    donViChuQuan: "KTQT",
    boMon: "Kế toán",
    chucDanh: "Giảng viên chính",
    khoaPhienBan: "GVCN"
  },
  {
    maDoiTuong: "GV002",
    tenDoiTuong: "Phạm Văn D",
    email: "phamvand@gv.edu.vn",
    soDienThoai: "0987654322",
    loaiDoiTuong: "Giảng viên",
    donViChuQuan: "CNTT",
    boMon: "Phát triển phần mềm",
    chucDanh: "Giảng viên cơ hữu",
    khoaPhienBan: "GVCN"
  },
  {
    maDoiTuong: "CB001",
    tenDoiTuong: "Nguyễn Văn E",
    email: "nguyenvane@cb.edu.vn",
    soDienThoai: "0909887766",
    loaiDoiTuong: "Cán bộ",
    donViChuQuan: "Phòng Đào tạo",
    chucDanh: "Chuyên viên"
  },
  {
    maDoiTuong: "CB002",
    tenDoiTuong: "Đỗ Thị G",
    email: "dothig@cb.edu.vn",
    soDienThoai: "0909887767",
    loaiDoiTuong: "Cán bộ",
    donViChuQuan: "Phòng Tổ chức Cán bộ",
    chucDanh: "Trưởng phòng"
  },
  {
    maDoiTuong: "CTDT-CNTT-K2023",
    tenDoiTuong: "Chương trình Đào tạo CNTT K2023",
    loaiDoiTuong: "Chương trình Đào tạo",
    donViChuQuan: "CNTT",
    khoaPhienBan: "K2023",
    moTaChiTiet: "Đại học; Phiên bản 3.0"
  },
  {
    maDoiTuong: "CTDT-KTQT-K2024",
    tenDoiTuong: "Chương trình Đào tạo KTQT K2024",
    loaiDoiTuong: "Chương trình Đào tạo",
    donViChuQuan: "KTQT",
    khoaPhienBan: "K2024",
    moTaChiTiet: "Đại học; Phiên bản 2.0"
  },
  {
    maDoiTuong: "MON-IT401",
    tenDoiTuong: "Môn học Cơ sở Dữ liệu",
    loaiDoiTuong: "Môn học",
    donViChuQuan: "CNTT",
    lop: "IT401",
    moTaChiTiet: "3 tín chỉ; HK1 2025-2026"
  },
  {
    maDoiTuong: "MON-KT302",
    tenDoiTuong: "Môn học Kế toán Tài chính",
    loaiDoiTuong: "Môn học",
    donViChuQuan: "KTQT",
    lop: "KT302",
    moTaChiTiet: "4 tín chỉ; HK1 2025-2026"
  },
  {
    maDoiTuong: "CSVC-PH-A201",
    tenDoiTuong: "Phòng học A201",
    loaiDoiTuong: "Cơ sở Vật chất",
    moTaChiTiet: "Diện tích: 50m2; Sức chứa: 40; Loại: Phòng học",
    diaDiemViTri: "Tòa nhà A; Tầng 2"
  },
  {
    maDoiTuong: "CSVC-PTN-B101",
    tenDoiTuong: "Phòng thí nghiệm B101",
    loaiDoiTuong: "Cơ sở Vật chất",
    moTaChiTiet: "Loại: Phòng thí nghiệm; Chuyên ngành: Hóa học",
    diaDiemViTri: "Tòa nhà B; Tầng 1"
  },
  {
    maDoiTuong: "CSVC-TV-TT",
    tenDoiTuong: "Thư viện Trung tâm",
    loaiDoiTuong: "Cơ sở Vật chất",
    moTaChiTiet: "Loại: Thư viện; Diện tích: 1000m2",
    diaDiemViTri: "Khu Trung tâm"
  },
  {
    maDoiTuong: "CSVC-KYTUCXA-1",
    tenDoiTuong: "Ký túc xá Số 1",
    loaiDoiTuong: "Cơ sở Vật chất",
    moTaChiTiet: "Loại: Ký túc xá; Sức chứa: 1500 sinh viên",
    diaDiemViTri: "Khu Ký túc xá"
  },
  {
    maDoiTuong: "CSVC-NHAAN-1",
    tenDoiTuong: "Nhà ăn Số 1",
    loaiDoiTuong: "Cơ sở Vật chất",
    moTaChiTiet: "Loại: Nhà ăn; Sức chứa: 500 người",
    diaDiemViTri: "Khu dịch vụ"
  },
  {
    maDoiTuong: "CHINHSACH-HP2025",
    tenDoiTuong: "Chính sách Học phí 2025-2026",
    loaiDoiTuong: "Chính sách/Quy định",
    moTaChiTiet: "Mã VB: QĐ/2025/HP; Áp dụng từ HK1 2025-2026"
  },
  {
    maDoiTuong: "CHINHSACH-NCSK",
    tenDoiTuong: "Quy định Nghiên cứu Khoa học",
    loaiDoiTuong: "Chính sách/Quy định",
    moTaChiTiet: "Mã VB: QĐ/2024/NCKH; Quy định về hỗ trợ NCKH"
  },
  {
    maDoiTuong: "DVHT-HANHCHINH",
    tenDoiTuong: "Dịch vụ Hành chính SV",
    loaiDoiTuong: "Dịch vụ Hỗ trợ",
    donViChuQuan: "Phòng Công tác Sinh viên",
    moTaChiTiet: "Hỗ trợ thủ tục hành chính cho sinh viên"
  },
  {
    maDoiTuong: "DVHT-YTE",
    tenDoiTuong: "Dịch vụ Y tế",
    loaiDoiTuong: "Dịch vụ Hỗ trợ",
    donViChuQuan: "Trạm Y tế",
    moTaChiTiet: "Cung cấp dịch vụ chăm sóc sức khỏe ban đầu"
  },
  {
    maDoiTuong: "DONVI-PDT",
    tenDoiTuong: "Phòng Đào tạo",
    loaiDoiTuong: "Đơn vị/Phòng ban",
    donViChuQuan: "Phòng Đào tạo",
    moTaChiTiet: "Chức năng chính: Quản lý đào tạo"
  },
  {
    maDoiTuong: "DONVI-PQLKH",
    tenDoiTuong: "Phòng Quản lý Khoa học",
    loaiDoiTuong: "Đơn vị/Phòng ban",
    donViChuQuan: "Phòng Quản lý Khoa học",
    moTaChiTiet: "Chức năng chính: Quản lý NCKH"
  },
  {
    maDoiTuong: "HD-NCKH-001",
    tenDoiTuong: 'Dự án NCKH "Ứng dụng AI"',
    loaiDoiTuong: "Hoạt động Nghiên cứu Khoa học",
    donViChuQuan: "Khoa CNTT",
    moTaChiTiet: "Mã DA: DA-AI-2025; Thời gian: 2025-2026"
  },
  {
    maDoiTuong: "HD-TS-TV2025",
    tenDoiTuong: "Tư vấn Tuyển sinh 2025",
    loaiDoiTuong: "Hoạt động Tuyển sinh/Sự kiện Tuyển sinh",
    donViChuQuan: "Phòng CTSV",
    moTaChiTiet: "Sự kiện tư vấn trực tuyến"
  },
  {
    maDoiTuong: "HD-DL-CLBVL",
    tenDoiTuong: "Câu lạc bộ Văn học",
    loaiDoiTuong: "Hoạt động Đoàn thể/Ngoại khóa",
    donViChuQuan: "Phòng Công tác Sinh viên",
    moTaChiTiet: "Mục tiêu: Phát triển kỹ năng viết và đọc"
  },
  {
    maDoiTuong: "HD-HTQT-CLBQT",
    tenDoiTuong: "Chương trình Liên kết Quốc tế",
    loaiDoiTuong: "Chương trình/Dự án Hợp tác Quốc tế",
    donViChuQuan: "Phòng Hợp tác Quốc tế",
    moTaChiTiet: "Đối tác: Đại học Quốc tế ABC; Thời gian: 2025-2030"
  }
];


export const selectLoaiDoiTuong: string[] = [
  "Sinh viên",
  "Giảng viên",
  "Cán bộ",
  "Chương trình Đào tạo",
  "Môn học",
  "Cơ sở Vật chất",
  "Chính sách/Quy định",
  "Dịch vụ Hỗ trợ",
  "Đơn vị/Phòng ban",
  "Hoạt động Nghiên cứu Khoa học",
  "Hoạt động Chuyển giao Công nghệ",
  "Hoạt động Tuyển sinh/Sự kiện Tuyển sinh",
  "Ngành nghề/Lĩnh vực đào tạo",
  "Lãnh đạo",
  "Hoạt động Đoàn thể/Ngoại khóa",
  "Chương trình/Dự án Hợp tác Quốc tế",
  "Đối tác Quốc tế"
];

export const selectKhoaDonViChuQuan: string[] = Array.from(
  new Set(
    mockData
      .filter(item => item.donViChuQuan !== undefined)
      .map(item => item.donViChuQuan as string)
  )
);

export const selectLop: string[] = Array.from(
  new Set(
    mockData
      .filter(item => item.lop !== undefined)
      .map(item => item.lop as string)
  )
);