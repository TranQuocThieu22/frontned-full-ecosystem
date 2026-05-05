import { 
  NopThuyetMinhNhiemVuViewModel, 
  NhomNghienCuuViewModel, 
  DanhSachVienChucViewModel,
  EnumTinhTrangDeTai,
  EnumLoaiDeTai,
  EnumGioiTinh
} from "./NopThuyetMinhNhiemVuViewModel";

// Mock data cho đề tài nghiên cứu
export const mockNopThuyetMinhNhiemVu: NopThuyetMinhNhiemVuViewModel[] = [
  {
    id: 1,
    code: "DKNCKH2025001",
    name: "Nghiên cứu ứng dụng Blockchain trong quản lý tài sản số",
    thoiGianThucHien: "12 tháng",
    capQuanLy: "Cấp trường",
    tongKinhPhi: 150000000,
    phuongThucKhoanChi: "Khoán đến sản phẩm cuối cùng",
    loaiHinhDeTai: "Nghiên cứu ứng dụng",
    linhVuc: "Công nghệ thông tin",
    chuNhiemDeTai: "Nguyễn Văn A",
    toChucChuTriDeTai: "Khoa Công nghệ phần mềm",
    tinhTrangDeTai: EnumTinhTrangDeTai.MOI,
    fileThuyetMinh: "blockchain-proposal.pdf",
    donViChuTri: "Khoa Công nghệ phần mềm",
    donViQuanLy: "Phòng Khoa học Công nghệ",
    loaiDeTai: EnumLoaiDeTai.NGHIEN_CUU_UNG_DUNG,
    thanhVienNghienCuu: [
      {
        id: 1,
        code: "NV001",
        name: "Trần Văn Khang",
        ngaySinh: new Date("1988-05-20"),
        gioiTinh: EnumGioiTinh.NAM,
        donVi: "Khoa Công nghệ thông tin",
        chucVu: "Giảng viên chính",
        vaiTro: "Chủ nhiệm đề tài",
        email: "khang.tv@example.edu.vn",
        soDienThoai: "0901234567"
      },
      {
        id: 2,
        code: "NV002",
        name: "Lê Thị Minh Nguyệt",
        ngaySinh: new Date("1990-11-12"),
        gioiTinh: EnumGioiTinh.NU,
        donVi: "Khoa Công nghệ thông tin",
        chucVu: "Giảng viên",
        vaiTro: "Thành viên nghiên cứu",
        email: "nguyet.ltm@example.edu.vn",
        soDienThoai: "0987654321"
      },
      {
        id: 3,
        code: "NV003",
        name: "Phạm Gia Bảo",
        ngaySinh: new Date("1992-02-03"),
        gioiTinh: EnumGioiTinh.NAM,
        donVi: "Phòng Thí nghiệm AI",
        chucVu: "Nghiên cứu viên",
        vaiTro: "Thành viên kỹ thuật",
        email: "bao.pg@example.edu.vn",
        soDienThoai: "0912345678"
      }
    ]
  },
  {
    id: 2,
    code: "DKNCKH2025002",
    name: "Phát triển hệ thống IoT giám sát chất lượng không khí đô thị thông minh",
    thoiGianThucHien: "18 tháng",
    capQuanLy: "Cấp Bộ GD&ĐT",
    tongKinhPhi: 500000000,
    phuongThucKhoanChi: "Khoán từng phần",
    loaiHinhDeTai: "Triển khai thực nghiệm",
    linhVuc: "Khoa học môi trường; Kỹ thuật điện tử",
    chuNhiemDeTai: "Trần Thị B",
    toChucChuTriDeTai: "Viện Khoa học & Công nghệ",
    tinhTrangDeTai: EnumTinhTrangDeTai.MOI,
    fileThuyetMinh: "iot-air-quality.pdf",
    donViChuTri: "Viện Khoa học & Công nghệ",
    donViQuanLy: "Phòng Khoa học Công nghệ",
    loaiDeTai: EnumLoaiDeTai.TRIEN_KHAI_THUC_NGHIEM,
    thanhVienNghienCuu: []
  },
  {
    id: 3,
    code: "DKNCKH2025003",
    name: "Nghiên cứu tác động của biến đổi khí hậu đến đa dạng sinh học tại khu vực Tây Nguyên",
    thoiGianThucHien: "24 tháng",
    capQuanLy: "Cấp bộ GD&ĐT",
    tongKinhPhi: 350000000,
    phuongThucKhoanChi: "Khoán đến sản phẩm cuối cùng",
    loaiHinhDeTai: "Nghiên cứu cơ bản",
    linhVuc: "Khoa học môi trường; Sinh học",
    chuNhiemDeTai: "Lê Thị C",
    toChucChuTriDeTai: "Khoa Môi trường & Tài nguyên",
    tinhTrangDeTai: EnumTinhTrangDeTai.MOI,
    fileThuyetMinh: "climate-change-biodiversity.pdf",
    donViChuTri: "Khoa Môi trường & Tài nguyên",
    donViQuanLy: "Phòng Khoa học Công nghệ",
    loaiDeTai: EnumLoaiDeTai.NGHIEN_CUU_CO_BAN,
    thanhVienNghienCuu: []
  }
];

// Mock data cho danh sách viên chức từ ảnh đính kèm
export const mockDanhSachVienChuc: DanhSachVienChucViewModel[] = [
  {
    id: 1,
    code: "VC001",
    name: "Nguyễn Thị Thảo",
    ngaySinh: new Date("1980-03-15"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Khoa Công nghệ thông tin",
    chucVu: "Giảng viên chính",
    email: "thaont@example.edu.vn",
    soDienThoai: "0901234567"
  },
  {
    id: 2,
    code: "VC002",
    name: "Lê Văn Hùng",
    ngaySinh: new Date("1975-11-22"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Phòng Tổ chức Cán bộ",
    chucVu: "Trưởng phòng",
    email: "hunglv@example.edu.vn",
    soDienThoai: "0987654321"
  },
  {
    id: 3,
    code: "VC003",
    name: "Phạm Thu Lan",
    ngaySinh: new Date("1988-07-05"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Khoa Kinh tế",
    chucVu: "Chuyên viên",
    email: "lanpt@example.edu.vn",
    soDienThoai: "0919876543"
  },
  {
    id: 4,
    code: "VC004",
    name: "Trần Đình Nam",
    ngaySinh: new Date("1970-01-10"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Vật lý",
    chucVu: "Giảng viên cao cấp",
    email: "namtd@example.edu.vn",
    soDienThoai: "0978123456"
  },
  {
    id: 5,
    code: "VC005",
    name: "Đỗ Minh Anh",
    ngaySinh: new Date("1992-09-20"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Phòng Đào tạo",
    chucVu: "Chuyên viên",
    email: "anhdn@example.edu.vn",
    soDienThoai: "0945678901"
  },
  {
    id: 6,
    code: "VC006",
    name: "Hoàng Văn Kiên",
    ngaySinh: new Date("1983-01-03"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Khoa học Tự nhiên",
    chucVu: "Giảng viên",
    email: "kienhv@example.edu.vn",
    soDienThoai: "0932109876"
  },
  {
    id: 7,
    code: "VC007",
    name: "Vũ Thị Mai",
    ngaySinh: new Date("1977-04-12"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Phòng Kế hoạch Tài chính",
    chucVu: "Kế toán trưởng",
    email: "maivt@example.edu.vn",
    soDienThoai: "0967890123"
  },
  {
    id: 8,
    code: "VC008",
    name: "Nguyễn Đức Bình",
    ngaySinh: new Date("1985-06-25"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Ngoại ngữ",
    chucVu: "Giảng viên",
    email: "binhnd@example.edu.vn",
    soDienThoai: "0912345678"
  },
  {
    id: 9,
    code: "VC009",
    name: "Đặng Thị Hoa",
    ngaySinh: new Date("1990-08-08"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Thư viện",
    chucVu: "Thủ thư",
    email: "hoadt@example.edu.vn",
    soDienThoai: "0943210987"
  },
  {
    id: 10,
    code: "VC010",
    name: "Phan Anh Tú",
    ngaySinh: new Date("1982-02-17"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Xã hội học",
    chucVu: "Giảng viên",
    email: "tupo@example.edu.vn",
    soDienThoai: "0934567890"
  },
  {
    id: 11,
    code: "VC011",
    name: "Lý Thị Hương",
    ngaySinh: new Date("1979-05-29"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Phòng Quan hệ Quốc tế",
    chucVu: "Chuyên viên",
    email: "huonglt@example.edu.vn",
    soDienThoai: "0965432109"
  },
  {
    id: 12,
    code: "VC012",
    name: "Ngô Quang Vinh",
    ngaySinh: new Date("1986-10-14"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Môi trường",
    chucVu: "Giảng viên",
    email: "vinhnq@example.edu.vn",
    soDienThoai: "0918765432"
  },
  {
    id: 13,
    code: "VC013",
    name: "Bùi Thị Thanh",
    ngaySinh: new Date("1991-01-01"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Phòng Công tác Sinh viên",
    chucVu: "Chuyên viên",
    email: "thanhbt@example.edu.vn",
    soDienThoai: "0976543210"
  },
  {
    id: 14,
    code: "VC014",
    name: "Trịnh Duy Khang",
    ngaySinh: new Date("1984-07-19"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Cơ khí",
    chucVu: "Giảng viên",
    email: "khangtd@example.edu.vn",
    soDienThoai: "0937890123"
  },
  {
    id: 15,
    code: "VC015",
    name: "Lương Thị Ngọc",
    ngaySinh: new Date("1973-12-07"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Phòng Quản lý Khoa học",
    chucVu: "Trưởng phòng",
    email: "ngoclt@example.edu.vn",
    soDienThoai: "0961234567"
  },
  {
    id: 16,
    code: "VC016",
    name: "Đào Minh Quân",
    ngaySinh: new Date("1989-03-11"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Kiến trúc",
    chucVu: "Giảng viên",
    email: "quandm@example.edu.vn",
    soDienThoai: "0915678901"
  },
  {
    id: 17,
    code: "VC017",
    name: "Chu Thị Lan Hương",
    ngaySinh: new Date("1981-08-28"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Phòng Khảo thí & Đảm bảo CLGD",
    chucVu: "Chuyên viên",
    email: "huongctl@example.edu.vn",
    soDienThoai: "0948765432"
  },
  {
    id: 18,
    code: "VC018",
    name: "Nguyễn Việt Hùng",
    ngaySinh: new Date("1976-09-04"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Điện",
    chucVu: "Giảng viên chính",
    email: "hungnv@example.edu.vn",
    soDienThoai: "0939012345"
  },
  {
    id: 19,
    code: "VC019",
    name: "Tô Thị Mai Anh",
    ngaySinh: new Date("1993-02-23"),
    gioiTinh: EnumGioiTinh.NU,
    donVi: "Trung tâm CNTT",
    chucVu: "Chuyên viên",
    email: "anhttm@example.edu.vn",
    soDienThoai: "0962345678"
  },
  {
    id: 20,
    code: "VC020",
    name: "Phùng Quốc Đạt",
    ngaySinh: new Date("1987-05-09"),
    gioiTinh: EnumGioiTinh.NAM,
    donVi: "Khoa Toán-Tin",
    chucVu: "Giảng viên",
    email: "datpq@example.edu.vn",
    soDienThoai: "0917890123"
  }
]; 