import { Iklfidusjgn } from "./F_klfidusjgn_Read";

export const mockDataRead: Iklfidusjgn[] = [
    {
        maHocVien: "SV000325",
        hoTen: "Tô Ngoc Lan",
        ngaySinh: "2000-01-01",
        gioiTinh: "Nam",
        maKhoaHoc: "LTW2501",
        maKhoaThi: "LTW250103",
        tieuDe: "Giáo viên đi dạy trễ",
        fileDinhKem: "de_thi_giua_ky.pdf",
        diemTraiNghiem: 4.5,
        trangThai: "Chưa phân loại",
        daTraLoi: false,
        noiDungChiTiet: "Giáo viên thường xuyên đi dạy trễ mà không có thông báo gì cho lớp ",
    }
]

export const mockTrangThai: string[] = [
    "Chưa phân loại",
    "Vấn đề",
    "Góp ý",
    "Khen ngợi",
    "Khác",
];