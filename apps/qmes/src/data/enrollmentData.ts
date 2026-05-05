import { Category } from "./Interfaces/IQAEduViewModel";

export const enrollment: Category = {
  id: "5",
  name: "Tuyển sinh và đào tạo",
  criteria: [
    {
      id: "5.1.1",
      title: "Tỷ lệ nhập học trên chi tiêu công bố trung bình 3 năm gần nhất",
      description: "Tỷ lệ nhập học tối thiểu 50%",
      type: "ratio",
      value: 55,
      unit: "%",
      threshold: 50,
      thresholdType: "min",
      pass: 55 >= 50
    },
    {
      id: "5.1.2",
      title: "Quy mô đào tạo sụt giảm so với trung bình 3 năm trước",
      description: "Tối đa 30% giảm so với trung bình 3 năm trước",
      type: "ratio",
      value: 20,
      unit: "%",
      threshold: 30,
      thresholdType: "max",
      pass: 20 <= 30
    },
    {
      id: "5.2.1",
      title: "Tỷ lệ thôi học hàng năm",
      description: "Tỷ lệ thôi học hàng năm tối đa 10%",
      type: "ratio",
      value: 8,
      unit: "%",
      threshold: 10,
      thresholdType: "max",
      pass: 8 <= 10
    },
    {
      id: "5.2.2",
      title: "Tỷ lệ thôi học năm đầu",
      description: "Tỷ lệ thôi học năm đầu tối đa 15%",
      type: "ratio",
      value: 12,
      unit: "%",
      threshold: 15,
      thresholdType: "max",
      pass: 12 <= 15
    },
    {
      id: "5.3.1",
      title: "Tỷ lệ tốt nghiệp đúng hạn",
      description: "Tối thiểu 40%",
      type: "ratio",
      value: 45,
      unit: "%",
      threshold: 40,
      thresholdType: "min",
      pass: 45 >= 40
    },
    {
      id: "5.3.2",
      title: "Tỷ lệ tốt nghiệp không chậm hơn 2 năm so với kế hoạch chuẩn",
      description: "Tối thiểu 60%",
      type: "ratio",
      value: 70,
      unit: "%",
      threshold: 60,
      thresholdType: "min",
      pass: 70 >= 60
    },
    {
      id: "5.4.1",
      title: "Tỷ lệ người học hài lòng với giảng viên về chất lượng và hiệu quả giảng dạy",
      description: "Tối thiểu 70%",
      type: "ratio",
      value: 75,
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      pass: 75 >= 70
    },
    {
      id: "5.4.2",
      title: "Tỷ lệ người học hài lòng với tổng thể quá trình học tập và trải nghiệm",
      description: "Tối thiểu 70%",
      type: "ratio",
      value: 72,
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      pass: 72 >= 70
    },
    {
      id: "5.5",
      title: "Tỷ lệ người học tốt nghiệp đại học có việc làm phù hợp chuyên môn, tự tạo việc làm, học cao hơn trong 12 tháng sau tốt nghiệp",
      description: "Tối thiểu 70%",
      type: "ratio",
      value: 68,
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      pass: 68 >= 70
    }
  ]
};
