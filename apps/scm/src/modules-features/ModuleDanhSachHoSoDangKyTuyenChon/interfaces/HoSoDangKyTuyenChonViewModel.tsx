export interface HoSoDangKyTuyenChonViewModel {
    id: number;
    code: string;
    name: string;  // Tên đề tài
    duration: string;            // Thời gian thực hiện
    budget: string;              // Tổng kinh phí thực hiện
    codeField: string;               // Lĩnh vực
    leader: string;              // Chủ nhiệm đề tài
    path?: string;
}

export interface ThanhVienViewModel extends VienChucVuViewModel {
    role: string;
}

export interface VienChucVuViewModel {
    id: number;
    code: string;
    name: string;  // Tên đề tài
    birthDate: string;
    gender: string;
    department: string;
    position: string;
    email?: string;
    phone?: string;
}
