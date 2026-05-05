export interface IExamSessionInfoViewModel {
    id: number;
    maMonHoc: string;
    tenMonHoc: string;
    nhomThi: string;
    ngayThi: Date;
    gioBatDau: string;
    thoiGianThi: number;
    quyTacLamTronDiem: string;
    ghiChu: string;
    soLuong: number;
    trangThai: string;
    phuTrach: string;
}

export interface IExamSessionStudentInfoViewModel {
    id: number | null;
    maThiSinh: string | null;
    hoTen: string | null;
    ngaySinh: Date | null;
    gioiTinh: string | null;
    IPAdress: string | null;
    device: string | null;
    vangThi: boolean | null;
    diemTru: number | null;
    dinhChi: boolean | null;
    nhacNho: number | null;
    buGio: number | null;
    tienDo: string | null;
}