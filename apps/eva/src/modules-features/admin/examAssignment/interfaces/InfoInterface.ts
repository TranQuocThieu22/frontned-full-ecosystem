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
    maDeChuan?: string;
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

export interface IExamPaperInfoViewModel {
    id?: number;
    examPaperCode?: string;
    examPaperName?: string;
}
