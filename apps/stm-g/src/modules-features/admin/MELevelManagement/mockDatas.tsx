import { I_Level } from "./interfaces";

export const mockDataLevel: I_Level[] = [
  {
    code: "TOAN_K7_A",
    name: "Toán Khối 7 - Cấp độ A",
    programCode: "TOAN_K7",
    levelDescription:
      "Nắm vững kiến thức nền tảng Đại số và Hình học lớp 7, giải các bài tập cơ bản.",
    levelOrder: 1,
    totalLessons: 90,
    totalHours: 135,
    suggestedFeeNote: "Test đầu vào Toán 7 >= 50% hoặc hoàn thành Chương trình Toán 6.",
    finalTestCode: "TOAN_K7_A_Final",
    isActive: true,
  },
  {
    code: "TOAN_K7_B",
    name: "Toán Khối 7 - Cấp độ B",
    programCode: "TOAN_K7",
    levelDescription:
      "Chuẩn bị cho kiến thức trọng tâm học kỳ 1 và các kỳ thi giữa kỳ. Nâng cao kiến thức; vận dụng linh hoạt các dạng bài tập khó; luyện tư duy sáng tạo.",
    levelOrder: 2,
    totalLessons: 90,
    totalHours: 135,
    suggestedFeeNote: "Đạt Cấp độ A (Điểm thi cuối cấp độ >= 70%) hoặc Test đầu vào Toán 7 >= 70%.",
    finalTestCode: "TOAN_K7_B_Final",
    isActive: true,
  },
  {
    code: "TOAN_K7_C",
    name: "Toán Khối 7 - Cấp độ C",
    programCode: "TOAN_K7",
    levelDescription:
      "Chuẩn bị cho học kỳ 2 và thi giữa/cuối kỳ. Chuyên sâu giải các bài toán khó; luyện đề thi học sinh giỏi; phát triển khả năng tự học và nghiên cứu chuyên sâu.",
    levelOrder: 3,
    totalLessons: 90,
    totalHours: 135,
    suggestedFeeNote: "Đạt Cấp độ B (Điểm thi cuối cấp độ >= 80%) hoặc Test đầu vào Toán 7 >= 85%.",
    finalTestCode: "TOAN_K7_C_Final",
    isActive: true,
  },
];
