export interface ICustomerFeedbackRequestViewModal {
    receiveChannel?: string;      // Kênh tiếp nhận
    receiver?: string;            // Người tiếp nhận
    studentCode?: string;         // Mã học sinh
    studentName?: string;         // Tên học sinh
    requestContent?: string;      // Tiêu đề/Tóm tắt yêu cầu
    requestType?: string;         // Loại yêu cầu
    priorityLevel?: string;       // Mức độ ưu tiên
    processingNote?: string;     // Ghi chú/Biện pháp xử lý
}