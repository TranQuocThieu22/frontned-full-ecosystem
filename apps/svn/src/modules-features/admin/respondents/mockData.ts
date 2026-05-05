import { EnumSurveyType } from "@/enums/EnumSurveyType";
import { ISurveyDetail } from "../ManageSurveyForm/layout/SurveyQuickViewDesign";
import { IRespondentInfoViewModel } from "./interfaces/IRespondentInfoViewModel";

export const mockDataRead: IRespondentInfoViewModel[] = [
  {
      maChienDich: "SV-NH",
      tenChienDich: "Sinh viên đánh giá giảng viên giảng dạy nhóm học",
      ngayBatDau: "2025-12-05",
      ngayKetThuc: "2025-06-30",
      daKhaoSat: false,
  },
  {
      maChienDich: "C02",
      tenChienDich: "Sinh viên đánh giá CTDT",
      ngayBatDau: "2025-12-05",
      ngayKetThuc: "2025-06-30",
      daKhaoSat: true,
  },
  {
      maChienDich: "C03",
      tenChienDich: "Sinh viên đánh giá trường",
      ngayBatDau: "2025-12-05",
      ngayKetThuc: "2025-06-30",
      daKhaoSat: false,
  },
  {
      maChienDich: "C06",
      tenChienDich: "Người học đánh giá CLO IT2563",
      ngayBatDau: "2025-12-05",
      ngayKetThuc: "2025-06-30",
      daKhaoSat: false,
  },
  {
      maChienDich: "C07",
      tenChienDich: "Người học đánh giá PLO CNTT24",
      ngayBatDau: "2025-12-05",
      ngayKetThuc: "2025-06-30",
      daKhaoSat: false,
  },
]

export const mockDataSurveyDetail: ISurveyDetail = {
    id: 1,
    code: "KHAOSAT01",
    name: "Khảo sát 1",
    survayType: EnumSurveyType.StudentEvaluateLecturerSubject,
    isStopUsed: false,
    createDate: "2025-02-15T12:12:03",
    updateDate: "2025-02-18T12:11:03",
    questions: [
      {
        id: 1,
        code: "CLO1",
        title:
          "Sau khi học môn này, bạn tự đánh giá khả năng vận dụng kiến thức lập trình để xây dựng ứng dụng mobile đơn giản ở mức độ nào?",
        required: true,
        questionOptions: [
          { value: 1, label: "1.  Rất kém" },
          { value: 2, label: "2.  Kém" },
          { value: 3, label: "3.  Trung bình" },
          { value: 4, label: "4.  Khá" },
          { value: 5, label: "5.  Tốt" },
        ],
      },
      {
        id: 2,
        code: "CLO2",
        title:
          "Bạn tự tin như thế nào khi sử dụng các công cụ và framework.  ví dụ: React Native, Flutter, Android SDK) để phát triển ứng dụng mobile?",
        required: true,
        questionOptions: [
          { value: 1, label: "1.  Không tự tin" },
          { value: 2, label: "2.  Tôi nghĩ là mình có thể làm được" },
          { value: 3, label: "3.  Có thể làm được" },
          { value: 4, label: "4.  Tôi làm được" },
          { value: 5, label: "5.  Rất tự tin" },
        ],
      },
      {
        id: 3,
  
        code: "CLO3",
        title:
          "Bạn có thể áp dụng các nguyên tắc thiết kế UI/UX để tạo ra ứng dụng mobile hấp dẫn và dễ sử dụng ở mức độ nào?",
        required: true,
        questionOptions: [
          { value: 1, label: "1.  Không thể" },
          { value: 2, label: "2.  Có thể với hướng dẫn" },
          { value: 3, label: "3.  Có thể độc lập" },
          { value: 4, label: "4.  Có thể hướng dẫn người khác" },
          { value: 5, label: "5.  Có thể sáng tạo và cải tiến" },
        ],
      },
      {
        id: 4,
  
        code: "CLO4",
        title:
          "Mức độ đóng góp của môn học này vào khả năng làm việc nhóm trong dự án phát triển ứng dụng mobile của bạn là gì?",
        required: true,
        questionOptions: [
          { value: 1, label: "1.  Không đóng góp" },
          { value: 2, label: "2.  Đóng góp ít" },
          { value: 3, label: "3.  Đóng góp trung bình" },
          { value: 4, label: "4.  Đóng góp nhiều" },
          { value: 5, label: "5.  Đóng góp rất nhiều" },
        ],
      },
    ],
  };