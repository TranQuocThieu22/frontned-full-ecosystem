import { Category } from "./Interfaces/IQAEduViewModel";

export const infrastructure: Category = {
  id: "3",
  name: "Cơ sở vật chất",
  criteria: [
    {
      id: "3.1",
      title: "Diện tích đất bình quân trên một người học",
      description: "Diện tích đất bình quân trên một người học (tối thiểu 25m²)",
      type: "area",
      value: 27,
      unit: "m²/người",
      threshold: 25,
      thresholdType: "max",
      pass: 27 >= 25
    },
    {
      id: "3.2.1",
      title: "Diện tích sàn xây dựng phục vụ đào tạo",
      description: "Diện tích sàn xây dựng phục vụ đào tạo (tối thiểu 2.8m²)",
      type: "area",
      value: 3.0,
      unit: "m²/người",
      threshold: 2.8,
      thresholdType: "min",
      pass: 3.0 >= 2.8
    },
    {
      id: "3.2.2",
      title: "Giảng viên toàn thời gian được bố trí chỗ làm việc riêng biệt",
      description: "Tối thiểu 70% giảng viên toàn thời gian có chỗ làm việc riêng",
      type: "ratio",
      value: 72,
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      pass: 72 >= 70
    },
    {
      id: "3.3.1",
      title: "Số đầu sách giáo trình, chuyên khảo bình quân mỗi ngành ở mỗi trình độ",
      description: "Tối thiểu 40 đầu sách/ngành/trình độ",
      type: "count",
      value: 45,
      unit: "đầu sách/ngành",
      threshold: 40,
      thresholdType: "min",
      pass: 45 >= 40
    },
    {
      id: "3.3.2",
      title: "Số đầu sách giáo trình, chuyên khảo bình quân 1 người học theo trình độ đào tạo",
      description: "Tối thiểu 5 đầu sách/người học",
      type: "count",
      value: 6,
      unit: "đầu sách/người học",
      threshold: 5,
      thresholdType: "min",
      pass: 6 >= 5
    },
    {
      id: "3.4.1",
      title: "Số học phần sẵn sàng dạy trực tuyến trên tổng số học phần dạy trong năm",
      description: "Tối thiểu 10% học phần có thể dạy trực tuyến",
      type: "ratio",
      value: 12,
      unit: "%",
      threshold: 10,
      thresholdType: "min",
      pass: 12 >= 10
    },
    {
      id: "3.4.2",
      title: "Băng thông trên 1000 người học",
      description: "Băng thông trên 1000 người học không thấp hơn băng thông cố định của Việt Nam",
      type: "rule",
      pass: true // set tạm do không có số để so sánh
    }
  ]
};
