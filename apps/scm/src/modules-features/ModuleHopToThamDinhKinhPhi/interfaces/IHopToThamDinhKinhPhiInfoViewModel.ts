export interface IHopToThamDinhKinhPhiInfoViewModel {
  id?: number;
  maDangKy?: string;
  tenDeTai?: string;
  maToThamDinh?: string;
  tenToThamDinh?: string;
  danhGiaChung?: string;
  phuongThucKhoan?: string;
  kienNghiChung?: string;
  filePath?: string;
  fileDetail?: {
    fileName?: string;
    fileExtension?: string;
    fileBase64String?: string;
  };
}
