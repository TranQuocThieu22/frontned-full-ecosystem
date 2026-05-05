// ----------------------
// Lãnh đạo chủ chốt
// ----------------------
export type SchoolLeadershipPosition =
  | "Chủ tịch Hội đồng trường"
  | "Hiệu trưởng"
  | "Phó Hiệu trưởng"
  | "Bí thư Đảng ủy"
  | "Trưởng phòng Đào tạo"
  | "Trưởng phòng Tổ chức - Hành chính"
  | "Khác";

export interface SchoolLeadershipVacancy {
  id: string;
  vacantPositions: SchoolLeadershipPosition[]; // danh sách vị trí bị khuyết
  startDate: Date;                           // ngày bắt đầu khuyết
  expectedFillDate?: Date;                   // ngày dự kiến bổ nhiệm
  decisionAuthority?: string;                  // cơ quan có thẩm quyền bổ nhiệm (Bộ GDĐT, UBND tỉnh, Hội đồng trường…)
  notes?: string;                              // ghi chú thêm
}
export interface LeadershipOverlapRule {
  vacancies: SchoolLeadershipVacancy[];
  history?: { date: Date; vacantCount: number }[]; // đổi từ string -> Date
}

// Lấy dữ liệu từ details của Criterion, chuyển unkown sang LeadershipOverlapRule
export function toLeadershipOverlapRule(obj: unknown): LeadershipOverlapRule | null {
  if (typeof obj !== "object" || obj === null) return null;

  const o = obj as LeadershipOverlapRule;

  if (!Array.isArray(o.vacancies)) return null;

  if (o.history) {
    if (
      !Array.isArray(o.history) ||
      !o.history.every(
        (h) => h.date instanceof Date && typeof h.vacantCount === "number"
      )
    ) {
      return null;
    }
  }
  return o;
}

// ---------------------------
// Văn bản quy chế, quy định
// ---------------------------
export type SchoolDocumentType =
  | "Quy chế tổ chức và hoạt động"
  | "Quy định đào tạo"
  | "Quy định nghiên cứu khoa học"
  | "Quy định công tác sinh viên"
  | "Quy định tài chính - cơ sở vật chất"
  | "Khác";

export interface SchoolRegulationDocument {
  id: string;
  title: string;                  // tên văn bản
  type: SchoolDocumentType;       // loại văn bản
  issuedDate: Date;             // ngày ban hành
  issuedBy: string;               // đơn vị ban hành (Hội đồng trường, Hiệu trưởng…)
  validity?: string;              // thời hạn áp dụng (nếu có)
  fileUrl?: string;               // link đến file văn bản
  published: boolean;             // đã công khai hay chưa
  notes?: string;                 // ghi chú
}
export interface SchoolRegulationAssessment {
  missingTypes: SchoolDocumentType[]; // loại văn bản còn thiếu
  documents: SchoolRegulationDocument[]; // danh sách chi tiết
}



// ----------------------------------
// Cải thiện chiến lược, kế hoạch
// ----------------------------------
export type EducationImprovementArea =
  | "Chương trình đào tạo"
  | "Phương pháp giảng dạy"
  | "Nghiên cứu khoa học"
  | "Cơ sở vật chất"
  | "Chuyển đổi số"
  | "Hợp tác quốc tế"
  | "Quản lý & điều hành"
  | "Học sinh/Sinh viên & hỗ trợ"
  | "Khác";

// Một mục cải thiện cụ thể
export interface ImprovementDetail {
  area: EducationImprovementArea;    // lĩnh vực cải thiện
  description: string;               // mô tả chi tiết
  evidenceUrl?: string;              // minh chứng (link tài liệu/báo cáo)
  improved: boolean;                 // đã cải thiện hay chưa
}

// Bản ghi đánh giá cải thiện chiến lược
export interface AnnualStrategyImprovement {
  documents: ImprovementDetail[]; // danh sách chi tiết
}

// -------------------------------------------
// Dữ liệu đảm bảo chất lượng theo chuẩn HEMIS
// -------------------------------------------
export type HEMISDataCategory =
  | "Chương trình đào tạo"
  | "Đội ngũ giảng viên"
  | "Sinh viên"
  | "Cơ sở vật chất"
  | "Nghiên cứu khoa học"
  | "Hợp tác quốc tế"
  | "Tài chính"
  | "Khác";

// Trạng thái cập nhật dữ liệu cho một danh mục
export interface HEMISDataStatus {
  category: HEMISDataCategory; // danh mục dữ liệu
  lastUpdated: Date;         // ngày cập nhật gần nhất (ISO string)
  isComplete: boolean;         // đã cập nhật đầy đủ chưa
  evidenceUrl?: string;        // link minh chứng (báo cáo, file)
  notes?: string;              // ghi chú thêm
}

// Bản ghi tổng thể về việc kết nối và cập nhật HEMIS
export interface SchoolHEMISRecord {
  id: string;
  schoolName: string;            // tên cơ sở giáo dục
  connected: boolean;            // đã kết nối thành công với HEMIS
  lastSyncDate?: Date;         // ngày đồng bộ gần nhất
  responsibleUnit: string;       // đơn vị phụ trách (VD: Phòng Khảo thí & ĐBCLGD)
  dataStatusList: HEMISDataStatus[]; // danh sách trạng thái theo từng danh mục
  overallCompleteness: number;   // % mức độ hoàn thành cập nhật
  comments?: string;             // nhận xét/ghi chú
}

