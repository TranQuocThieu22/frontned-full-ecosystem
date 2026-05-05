import { Category } from "./IqmesViewModel";

export const tuyen_sinh_va_dao_tao: Category = {
  id: 5,
  code: "5",
  name: "Tuyển sinh và đào tạo",
  criteria: [
    {
      id: 51,
      code: "5.1.1",
      title: "Tỷ lệ nhập học trên chi tiêu công bố trung bình 3 năm gần nhất (tối thiểu 50%)",
      unit: "%",
      threshold: 50,
      thresholdType: "min",
      type: "ratio",
      value: 56,
      pass: true,
      details: [
        { id: 511, code: "Q1-2024", value: 55, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 1 năm 2024", type: "ratio" },
        { id: 512, code: "Q2-2024", value: 57, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 2 năm 2024", type: "ratio" },
        { id: 513, code: "Q3-2024", value: 56, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 3 năm 2024", type: "ratio" },
        { id: 514, code: "Q4-2024", value: 56, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 4 năm 2024", type: "ratio" }
      ]
    },
    {
      id: 52,
      code: "5.1.2",
      title: "Quy mô đào tạo sụt giảm so với trung bình 3 năm trước (tối đa 30%)",
      unit: "%",
      threshold: 30,
      thresholdType: "max",
      type: "ratio",
      value: 26,
      pass: true,
      details: [
        { id: 521, code: "Q1-2024", value: 25, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 1 năm 2024", type: "ratio" },
        { id: 522, code: "Q2-2024", value: 27, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 2 năm 2024", type: "ratio" },
        { id: 523, code: "Q3-2024", value: 26, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 3 năm 2024", type: "ratio" },
        { id: 524, code: "Q4-2024", value: 26, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 4 năm 2024", type: "ratio" }
      ]
    },
    {
      id: 53,
      code: "5.2.1",
      title: "Tỷ lệ thôi học hàng năm (tối đa 10%)",
      unit: "%",
      threshold: 10,
      thresholdType: "max",
      type: "ratio",
      value: 8,
      pass: true,
      details: [
        { id: 531, code: "Q1-2024", value: 8, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 1 năm 2024", type: "ratio" },
        { id: 532, code: "Q2-2024", value: 7, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 2 năm 2024", type: "ratio" },
        { id: 533, code: "Q3-2024", value: 9, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 3 năm 2024", type: "ratio" },
        { id: 534, code: "Q4-2024", value: 8, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 4 năm 2024", type: "ratio" }
      ]
    },
    {
      id: 54,
      code: "5.2.2",
      title: "Tỷ lệ thôi học năm đầu (tối đa 15%)",
      unit: "%",
      threshold: 15,
      thresholdType: "max",
      type: "ratio",
      value: 12,
      pass: true,
      details: [
        { id: 541, code: "Q1-2024", value: 12, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 1 năm 2024", type: "ratio" },
        { id: 542, code: "Q2-2024", value: 11, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 2 năm 2024", type: "ratio" },
        { id: 543, code: "Q3-2024", value: 13, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 3 năm 2024", type: "ratio" },
        { id: 544, code: "Q4-2024", value: 12, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo quý 4 năm 2024", type: "ratio" }
      ]
    },
    {
      id: 55,
      code: "5.3.1",
      title: "Tỷ lệ tốt nghiệp đúng hạn (tối thiểu 40%)",
      unit: "%",
      threshold: 40,
      thresholdType: "min",
      type: "ratio",
      value: 65,
      pass: true,
      details: [
        { id: 551, code: "2024", value: 65, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo năm 2024", type: "ratio" }
      ]
    },
    {
      id: 56,
      code: "5.3.2",
      title: "Tỷ lệ tốt nghiệp không chậm hơn 2 năm so với kế hoạch chuẩn (tối thiểu 60%)",
      unit: "%",
      threshold: 60,
      thresholdType: "min",
      type: "ratio",
      value: 70,
      pass: true,
      details: [
        { id: 561, code: "2024", value: 70, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Báo cáo năm 2024", type: "ratio" }
      ]
    },
    {
      id: 57,
      code: "5.4.1",
      title: "Tỷ lệ người học hài lòng với giảng viên về chất lượng và hiệu quả giảng dạy (tối thiểu 70%)",
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      type: "ratio",
      value: 75,
      pass: true,
      details: [
        { id: 571, code: "2024", value: 75, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Khảo thí & Đảm bảo chất lượng", published: true, description: "Khảo sát học viên năm 2024", type: "ratio" }
      ]
    },
    {
      id: 58,
      code: "5.4.2",
      title: "Tỷ lệ người học hài lòng với tổng thể quá trình học tập và trải nghiệm (tối thiểu 70%)",
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      type: "ratio",
      value: 72,
      pass: true,
      details: [
        { id: 581, code: "2024", value: 72, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Khảo thí & Đảm bảo chất lượng", published: true, description: "Khảo sát học viên năm 2024", type: "ratio" }
      ]
    },
    {
      id: 59,
      code: "5.5",
      title: "Tỷ lệ người học tốt nghiệp đại học có việc làm phù hợp chuyên môn, tự tạo việc làm, học cao hơn trong 12 tháng sau tốt nghiệp (tối thiểu 70%)",
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      type: "ratio",
      value: 74,
      pass: true,
      details: [
        { id: 591, code: "2024", value: 74, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Quan hệ doanh nghiệp & Cựu sinh viên", published: true, description: "Theo dõi việc làm sinh viên tốt nghiệp 2024", type: "ratio" }
      ]
    }
  ]
};
