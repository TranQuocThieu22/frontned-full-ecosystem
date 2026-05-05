import { ReactNode } from "react";

// Nhóm cấp cao nhất (Category)
export interface Category {
  id: string;              // ví dụ: "1", "2", "3"
  name: string;            // tên nhóm (vd: "Tổ chức và quản trị")
  criteria: Criterion[];   // danh sách tiêu chí trong nhóm
  icon?: ReactNode;  // icon sẽ truyền vào React component
}

// Một tiêu chí chung
export interface Criterion {
  id: string;                  // Ví dụ: "1.1"
  title: string;               // "Thời gian khuyết đồng thời 2 lãnh đạo chủ chốt..."
  description?: string;        // Mô tả chi tiết
  type: "rule" | "ratio" | "area" | "finance" | "survey" | "count" | "other"; // phân loại
  value?: number | string;     // giá trị thực tế
  threshold?: number | string; // ngưỡng yêu cầu
  thresholdType?: string;      // yêu cầu vidu: "max" tối đa, "min" tối thiểu
  unit?: string;               // "tháng", "%", "m2", ...
  details?: unknown;           // có thể gắn model cụ thể như SchoolLeadershipVacancy
  pass: boolean;
}

export interface QACircular {
  id: number;
  name: string;
  issueDate: Date;
  qaCategories: Category[];
  totalCriteria?: number;
  totalCriteriaPass?: number;
}