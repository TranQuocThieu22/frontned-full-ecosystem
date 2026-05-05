export interface ITechnicalQualityControl {
    id: number;
    lessonCode: string; // Mã BG
    lessonName: string; // Tên Bài giảng
    compilerName: string; // Tên Biên soạn
    submissionDate: string; // Ngày sản phẩm được giao nộp (YYYY-MM-DD)
    currentLessonStatus: string; // Trạng thái Bài giảng (hiện tại)
    technicalChecker: string; // Chuyên viên Kiểm tra Kỹ thuật
    detailedCheckResult: string; // Kết quả kiểm tra chi tiết
    technicalConclusionProposal: string; // Đề xuất kết luận kỹ thuật
    checkDate: string; // Ngày Kiểm tra (YYYY-MM-DD)
}