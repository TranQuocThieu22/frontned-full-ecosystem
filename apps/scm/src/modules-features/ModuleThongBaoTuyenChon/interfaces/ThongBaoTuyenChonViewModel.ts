export interface ThongBaoTuyenChonViewModel {
  id: number;
  code: string;
  name: string;
  noiDungChinh: string;
  fileDinhKem: string;
  ngayBanHanh: Date;
  guiThongBao: boolean;
  danhSachDangKyDuocChon: DanhSachDangKyDuocChonViewModel[];
}

export interface DanhSachDangKyDuocChonViewModel {
  code: string;
  name: string;
  linhVuc: string;
  chuNhiem: string;
  danhGiaPhuHop: string;
  danhGiaCuaHoiDong: string;
  kienNghi: string;
}

export interface DanhSachDangKyDuocDanhGiaPhuHopViewModel {
  code: string;
  name: string;
  linhVuc: string;
  danhGiaPhuHop: string;
  danhGiaCuaHoiDong: string;
  kienNghi: string;
}
