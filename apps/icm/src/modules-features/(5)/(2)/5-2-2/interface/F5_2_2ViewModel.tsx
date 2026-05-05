export interface IF5_2_2 {
    id: number;
    proposalCode: string; // Mã đề tài
    projectName: string; // Tên đề tài
    proposalFile: string; // File phiếu đề xuất ("Xem file" hoặc rỗng)
    field: string; // Lĩnh vực
    objectives: string; // Mục tiêu
    expectedTotalBudget: string; // Tổng kinh phí dự kiến (đã sửa)
    requirementsResults: string; // Yêu cầu đối với kết quả (đã sửa)
    application: string; // Dự kiến phương án ứng dụng (đã sửa)
    durationMonths: number; // Thời gian thực hiện (tháng) (đã sửa)
    registeredStaffCode: string; // Mã viên chức đăng ký (thêm mới)
    registeredStaffName: string; // Tên viên chức đăng ký (bỏ ngoặc)
    registeredUnit: string; // Đơn vị đăng ký (bỏ ngoặc)
    projectStatus: string; // Trạng thái Đề xuất (đã sửa)

}
