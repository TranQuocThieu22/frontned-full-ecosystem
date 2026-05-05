export interface IContentAppraisalCouncilEstablishment {
    id: number;
    councilCode: string; // Mã Hội đồng Thẩm định
    councilName: string; // Tên Hội đồng Thẩm định
    expectedStartDate: string; // Ngày bắt đầu thẩm định (dự kiến) (YYYY-MM-DD)
    expectedEndDate: string; // Ngày kết thúc thẩm định (dự kiến) (YYYY-MM-DD)
    chairman: string; // Chủ tịch hội đồng
    secretary: string; // Thư ký hội đồng
    appraisalMembers: string; // Danh sách ủy viên thẩm định
    textbooksForAppraisal: string; // Bài giảng được phân công thẩm định
    councilStatus: string; // Trạng thái Hội đồng Thẩm định
}