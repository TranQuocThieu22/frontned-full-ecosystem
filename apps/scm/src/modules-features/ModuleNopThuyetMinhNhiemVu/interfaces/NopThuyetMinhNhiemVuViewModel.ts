export interface NopThuyetMinhNhiemVuViewModel {
  id: number;
  code: string;
  name: string;
  thoiGianThucHien: string;
  capQuanLy: string;
  tongKinhPhi: number;
  phuongThucKhoanChi: string;
  loaiHinhDeTai: string;
  linhVuc: string;
  chuNhiemDeTai: string;
  toChucChuTriDeTai: string;
  tinhTrangDeTai: EnumTinhTrangDeTai;
  fileThuyetMinh: string;
  donViChuTri?: string;
  donViQuanLy?: string;
  loaiDeTai?: EnumLoaiDeTai;
  thanhVienNghienCuu: NhomNghienCuuViewModel[];
}

export interface NhomNghienCuuViewModel {
  id: number;
  code: string;
  name: string;
  ngaySinh: Date;
  gioiTinh: EnumGioiTinh;
  donVi: string;
  chucVu: string;
  vaiTro: string;
  email?: string;
  soDienThoai?: string;
}

export interface DanhSachVienChucViewModel {
  id: number;
  code: string;
  name: string;
  ngaySinh: Date;
  gioiTinh: EnumGioiTinh;
  donVi: string;
  chucVu: string;
  email: string;
  soDienThoai: string;
}

export enum EnumTinhTrangDeTai {
  MOI = "Mới",
  KE_TIEP_HUONG_NGHIEN_CUU_CHINH_NHOM_TAC_GIA = "Kế tiếp hướng nghiên cứu chính nhóm tác giả",
  KE_TIEP_NGHIEN_CUU_CUA_NGUOI_KHAC = "Kế tiếp nghiên cứu của người khác",
}

export enum EnumLoaiDeTai {
  NGHIEN_CUU_CO_BAN = "Nghiên cứu cơ bản",
  NGHIEN_CUU_UNG_DUNG = "Nghiên cứu ứng dụng",
  TRIEN_KHAI_THUC_NGHIEM = "Triển khai thực nghiệm",
}

export enum EnumGioiTinh {
  NAM = "Nam",
  NU = "Nữ",
}

export enum EnumVaiTro {
  CHU_NHIEM_DE_TAI = "Chủ nhiệm đề tài",
  THANH_VIEN_NGHIEN_CUU = "Thành viên nghiên cứu",
  THANH_VIEN_KY_THUAT = "Thành viên kỹ thuật",
}
