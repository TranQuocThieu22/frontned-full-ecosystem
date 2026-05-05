// ======================
// Common
// ======================
export interface CriterionEvaluation {
  criterionId: string;       // ví dụ: "2.1", "2.2", "2.3"
  description: string;       // mô tả ngắn gọn
  calculatedValue: number;   // giá trị tính được
  threshold: number;         // ngưỡng quy định (40%, 70%, 20%...)
  condition: "<=" | ">=";    // điều kiện so sánh
  isMet: boolean;            // đạt / không đạt
}

// ======================
// 2.1 Tỷ lệ người học quy đổi
// ======================
export type TrainingLevel = "Đại học" | "Cao học" | "Tiến sĩ" | "Khác";
export type TrainingMode = "Chính quy" | "Vừa học vừa làm" | "Đào tạo từ xa" | "Khác";

export interface StudentGroup {
  id: string;
  level: TrainingLevel;  // Trình độ
  field: string;         // Lĩnh vực
  mode: TrainingMode;    // Hình thức đào tạo
  count: number;         // Số lượng người học
  coefficient: number;   // Hệ số quy đổi
}

export interface FacultyStudentRatio {
  academicYear: string;
  fullTimeFaculty: number;
  studentGroups: StudentGroup[];
}

// ======================
// 2.2 Giảng viên cơ hữu trong độ tuổi lao động
// ======================
export interface FacultyAgeStructure {
  academicYear: string;
  fullTimeFaculty: number;       // Tổng giảng viên toàn thời gian
  workingAgeFaculty: number;     // Giảng viên cơ hữu trong độ tuổi lao động
}

// ======================
// 2.3 Giảng viên có trình độ tiến sĩ
// ======================
export interface FacultyQualification {
  academicYear: string;
  fullTimeFaculty: number;
  phdFaculty: number;            // Giảng viên có trình độ tiến sĩ
}

// ======================
// Tổng hợp cho phần 2. Giảng viên
// ======================
export interface FacultyCriteria {
  ratioCriterion: FacultyStudentRatio;        // 2.1
  ageCriterion: FacultyAgeStructure;          // 2.2
  qualificationCriterion: FacultyQualification; // 2.3
  evaluations: CriterionEvaluation[];         // Kết quả đánh giá
}
