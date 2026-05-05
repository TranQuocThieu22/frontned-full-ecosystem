
import { IconChalkboard } from "@tabler/icons-react";
import {
  FacultyAgeStructure,
  FacultyQualification,
  FacultyStudentRatio,
} from "./Interfaces/ILecturerVIewModel";
import { Category } from "./Interfaces/IQAEduViewModel";

// Hàm helper để check pass/fail
function checkPass(value: number, threshold: number, type: "min" | "max") {
  if (type === "max") {
    return value <= threshold;
  }
  return value >= threshold;
}

// Mock menuData cho Mục 2: Giảng viên
export const lecturer: Category = {
  id: "2",
  name: "Giảng viên",
  criteria: [
    // 2.1 Tỷ lệ người học quy đổi / giảng viên toàn thời gian (≤ 40%)
    {
      id: "2.1",
      title:
        "Tỷ lệ người học quy đổi theo trình độ, lĩnh vực và hình thức đào tạo trên giảng viên toàn thời gian",
      type: "ratio",
      unit: "%",
      threshold: 40,
      thresholdType: "max",
      value: 35, // giả sử tính ra 35%
      pass: checkPass(35, 40, "max"),
      details: {
        academicYear: "2024-2025",
        fullTimeFaculty: 70,
        studentGroups: [
          {
            id: "SG1",
            level: "Đại học",
            field: "Công nghệ thông tin",
            mode: "Chính quy",
            count: 2000,
            coefficient: 1,
          },
          {
            id: "SG2",
            level: "Cao học",
            field: "Kinh tế",
            mode: "Chính quy",
            count: 300,
            coefficient: 1.5,
          },
        ],
      } as FacultyStudentRatio,
      description:
        "Tỷ lệ người học quy đổi trên giảng viên toàn thời gian không vượt quá 40%.",
    },

    // 2.2 Giảng viên cơ hữu trong độ tuổi lao động (≥ 70%)
    {
      id: "2.2",
      title:
        "Giảng viên cơ hữu trong độ tuổi lao động trên giảng viên toàn thời gian",
      type: "ratio",
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      value: 78.6,
      pass: checkPass(78.6, 70, "min"),
      details: {
        academicYear: "2024-2025",
        fullTimeFaculty: 70,
        workingAgeFaculty: 55,
      } as FacultyAgeStructure,
      description:
        "Tỷ lệ giảng viên cơ hữu trong độ tuổi lao động trên tổng số giảng viên toàn thời gian tối thiểu 70%.",
    },

    // 2.3 Tỷ lệ giảng viên toàn thời gian có trình độ tiến sĩ (≥ 20%)
    {
      id: "2.3",
      title: "Tỷ lệ giảng viên toàn thời gian có trình độ tiến sĩ",
      type: "ratio",
      unit: "%",
      threshold: 20,
      thresholdType: "min",
      value: 21.4,
      pass: checkPass(21.4, 20, "min"),
      details: {
        academicYear: "2024-2025",
        fullTimeFaculty: 70,
        phdFaculty: 15,
      } as FacultyQualification,
      description:
        "Tỷ lệ giảng viên toàn thời gian có trình độ tiến sĩ tối thiểu 20%.",
    },
  ],
  icon: typeof IconChalkboard,
};
