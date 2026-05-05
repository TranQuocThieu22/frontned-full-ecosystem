import { I_TestResult } from "./interfaces";

export const mockData_TestResult: I_TestResult[] = [
  {
    testResultCode: "KQT_T001",
    testScheduleCode: "LHT_T001",
    studentCode: "KHTN010",
    program: "Toán",
    testDate: new Date("2025-07-10"),
    overallScore: 8.5,
    detailedScores: "Đại số: 9; Hình học: 8.5",
    teacherComment: "Học sinh nắm vững kiến thức cơ bản, tư duy logic tốt; cần luyện thêm dạng bài nâng cao.",
    suggestedLevel: "Toán Khối 7 - Cấp độ B",
    evaluator: "Thầy Trần Văn Dũng",
    status: 2,
  },
  {
    testResultCode: "KQT_T002",
    testScheduleCode: "LHT_T002",
    studentCode: "KHTN011",
    program: "Toán",
    testDate: new Date("2025-07-11"),
    overallScore: 6.0,
    detailedScores: "Đại số: 6; Hình học: 6",
    teacherComment: "Kiến thức cơ bản chưa vững, cần ôn tập lại các khái niệm.",
    suggestedLevel: "Toán Khối 7 - Cấp độ A",
    evaluator: "Cô Nguyễn Thị Mai",
    status: 2,
  }
];
