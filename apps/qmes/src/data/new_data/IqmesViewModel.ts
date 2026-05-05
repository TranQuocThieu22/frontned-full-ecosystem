export interface CriterionDetail {
  id: number;                // id số duy nhất
  code: string;              // ví dụ "2022", "2023-Q1"
  value: number;             // giá trị tại thời điểm/khoảng thời gian đó
  description?: string;      // mô tả / ghi chú thêm
  startDate?: Date;        // ngày bắt đầu (ISO: "2023-01-01")
  endDate?: Date;          // ngày kết thúc (ISO: "2023-12-31")
  decisionAuthority?: string;// ai xác nhận / phê duyệt dữ liệu
  published?: boolean;       // đã công bố hay chưa
  type: "rule" | "ratio" | "area" | "finance" | "survey" | "count" | "other"; // phân loại
}

export interface Criterion {
  id: number;                     
  code: string;                   // ví dụ "1.1", "5.4.2"
  title: string;                  
  description?: string;           
  unit?: string;                  // đơn vị (%, m2, công bố/giảng viên…)
  threshold?: number;             
  type: "rule" | "ratio" | "area" | "finance" | "survey" | "count" | "other"; // phân loại
  thresholdType?: "min" | "max";  
  value?: number;                 
  pass?: boolean;                 
  details?: CriterionDetail[];    
}

export interface Category {
  id: number;             
  code: string;           
  name: string;           
  criteria: Criterion[];  
}

export interface Circular {
  id: number;
  name: string;
  issueDate: Date;
  qaCategories: Category[];
  totalCriteria?: number;
  totalCriteriaPass?: number;
}