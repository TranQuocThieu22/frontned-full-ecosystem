import { Category } from "./IqmesViewModel";

export const giang_vien: Category = {
  id: 2,
  code: "2",
  name: "Giảng viên",
  criteria: [
    {
      id: 21,
      code: "2.1",
      title: "Tỷ lệ người học quy đổi theo trình độ, lĩnh vực và hình thức đào tạo trên giảng viên toàn thời gian (tối đa 40%)",
      unit: "%",
      threshold: 40,
      thresholdType: "max",
      type: "ratio",
      value: 35,
      pass: true,
      details: [
        { id: 211, code: "2024-Q1", value: 36, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Tỷ lệ quý 1 năm 2024.", type: "ratio" },
        { id: 212, code: "2024-Q2", value: 35, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Tỷ lệ quý 2 năm 2024.", type: "ratio" },
        { id: 213, code: "2024-Q3", value: 34, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Tỷ lệ quý 3 năm 2024.", type: "ratio" },
        { id: 214, code: "2024-Q4", value: 35, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Tỷ lệ quý 4 năm 2024.", type: "ratio" }
      ]
    },
    {
      id: 22,
      code: "2.2",
      title: "Giảng viên cơ hữu trong độ tuổi lao động trên giảng viên toàn thời gian (tối thiểu 70%)",
      unit: "%",
      threshold: 70,
      thresholdType: "min",
      type: "ratio",
      value: 75,
      pass: true,
      details: [
        { id: 221, code: "2024-Q1", value: 74, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Tổ chức", published: true, description: "Tỷ lệ quý 1 năm 2024.", type: "ratio" },
        { id: 222, code: "2024-Q2", value: 76, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Tỷ lệ quý 2 năm 2024.", type: "ratio" },
        { id: 223, code: "2024-Q3", value: 75, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Tỷ lệ quý 3 năm 2024.", type: "ratio" },
        { id: 224, code: "2024-Q4", value: 75, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Tỷ lệ quý 4 năm 2024.", type: "ratio" }
      ]
    },
    {
      id: 23,
      code: "2.3",
      title: "Tỷ lệ giảng viên toàn thời gian có trình độ tiến sĩ (tối thiểu 20%)",
      unit: "%",
      threshold: 20,
      thresholdType: "min",
      type: "ratio",
      value: 22,
      pass: true,
      details: [
        { id: 231, code: "2024-Q1", value: 21, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Đào tạo", published: true, description: "Tỷ lệ quý 1 năm 2024.", type: "ratio" },
        { id: 232, code: "2024-Q2", value: 22, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Tỷ lệ quý 2 năm 2024.", type: "ratio" },
        { id: 233, code: "2024-Q3", value: 23, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Tỷ lệ quý 3 năm 2024.", type: "ratio" },
        { id: 234, code: "2024-Q4", value: 22, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "Tỷ lệ quý 4 năm 2024.", type: "ratio" }
      ]
    }
  ]
};
