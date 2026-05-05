export interface ICustomerFeedbackRequestInfoViewModal {
    id?: number;
    requestId?: string;           // ID yêu cầu (CSKH_YYYYMMDD_XXX)
    receiveChannel?: string;      // Kênh tiếp nhận
    receiver?: string;            // Người tiếp nhận
    studentCode?: string;         // Mã học sinh
    studentName?: string;         // Tên học sinh
    phoneNumber?: string;         // Số điện thoại liên hệ
    requestContent?: string;      // Tiêu đề/Tóm tắt yêu cầu
    requestType?: string;         // Loại yêu cầu
    priorityLevel?: string;       // Mức độ ưu tiên
    detailContent?: string;       // Nội dung chi tiết
    createdAt?: string;          // Ngày tạo
    department?: string;          // Bộ phận xử lý
    assignedTo?: string;         // Người được phân công
    processingDeadline?: Date; // Ngày & hạn xử lý
    status?: number;             // Trạng thái
    processingNote?: string;     // Ghi chú/Biện pháp xử lý
    lastUpdatedAt?: string;      // Ngày cập nhật cuối cùng
    completedAt?: Date;        // Ngày hoàn thành
    attachmentFile?: string;     // File đính kèm
}