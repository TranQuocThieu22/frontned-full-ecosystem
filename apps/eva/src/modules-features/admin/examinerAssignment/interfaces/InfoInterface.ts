export interface IExamScheduleInfoViewModel {
    id?: number;
    maMonHoc?: string;
    tenMonHoc?: string;
    nhomThi?: string;
    ngayThi?: string;
    gioBatDau?: string;
    thoiGianThi?: number;
    quyTacLamTronDiem?: string;
    ghiChu?: string;
    soLuong?: number;
    trangThai?: string;
    phuTrach?: string;
    soCauCanCham?: number;
    soCauDaCham?: number;
    soCauChuaCham?: number;
    giamKhao?: string;
}

export interface IStudentInfoViewModel {
    id?: number;
    maThiSinh?: string;
    hoTen?: string;
    gioiTinh?: string;
    ngaySinh?: string;
    lop?: string;
    email?: string;
    soDienThoai?: string;
}

export interface IUserInfoViewModel {
    id?: number;
    userName?: string;
    hoTen?: string;
    ngaySinh?: string;
    gioiTinh?: string;
    email?: string;
    soDienThoai?: string;
}
