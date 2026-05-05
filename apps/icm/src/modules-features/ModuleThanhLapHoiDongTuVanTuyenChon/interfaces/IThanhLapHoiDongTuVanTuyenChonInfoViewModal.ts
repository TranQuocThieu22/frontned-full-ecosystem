export interface IThanhLapHoiDongTuVanTuyenChonInfoViewModal {
    id?: number;
    code?: string;
    tenHoiDong?: string;
    ngayHop?: Date;
    thoiGianHop?: string;
    diaDiemHop?: string;
    chuTichHoiDong?: string;
    thuKyHoiDong?: string;
    danhSachThanhVien?: string;
    dangKyXetDuyet?: string;
    trangThaiHoiDong?: string;
    filePath?: string;
    fileDetail?: {
        fileName?: string;
        fileExtension?: string;
        fileBase64String?: string;
    };
    ghiChu?: string;
}