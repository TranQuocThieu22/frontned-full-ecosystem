export interface ISubjectMatterContentReview {
    id: number;
    lessonCode: string; // Mã Bài giảng
    lessonName: string; // Tên Bài giảng
    councilCode: string; // Mã Hội Đồng Thẩm Định
    councilName: string; // Tên Hội Đồng Thẩm Định
    chiefAppraiser: string; // Chủ nhiệm thẩm định (nếu có)
    rawProductSubmissionDate: string; // Ngày giao nộp sản phẩm thô (YYYY-MM-DD)
    currentLessonStatus: string; // Trạng thái Bài giảng (hiện tại)
    detailedExpertComments: string; // Nhận xét chi tiết của chuyên viên
    conclusionProposal: string; // Đề xuất kết luận
    appraisalDate: string; // Ngày thẩm định (YYYY-MM-DD)
}