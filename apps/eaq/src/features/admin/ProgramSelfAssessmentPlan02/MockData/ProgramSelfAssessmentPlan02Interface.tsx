export interface I_SelfAssessmentPlanTable {
  id:number;
  code: string;                  // Mã Kế hoạch
  name: string;                  // Tên Kế hoạch
  curriculum: string;            // Chương trình Đào tạo áp dụng
  phase: string;                 // Mã giai đoạn
  standardSet: string;           // Bộ Tiêu chuẩn áp dụng
  standardSetVersion: string;    // Phiên bản Bộ Tiêu chuẩn
  objective: string;             // Mục tiêu tự đánh giá
  scope: string;                 // Phạm vi tự đánh giá
  startDate?: string;            // Ngày Bắt đầu
  endDate?: string;              // Ngày Kết thúc
  signer: string;                // Người ký
  file?: string;                 // (chỉ dùng trong file, không hiển thị trong mock/interface/export)
  resolution: string;            // Quyết định Thành lập Hội đồng
}
