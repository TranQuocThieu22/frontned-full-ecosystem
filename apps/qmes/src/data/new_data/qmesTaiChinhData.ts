import { Category } from "./IqmesViewModel";

export const tai_chinh: Category = {
  id: 4,
  code: "4",
  name: "Tài chính",
  criteria: [
    {
      id: 41,
      code: "4.1",
      title: "Chênh lệch thu chi / tổng thu của 3 năm gần nhất (tối đa 30%)",
      unit: "%",
      threshold: 30,
      thresholdType: "max",
      type: "ratio",
      value: 28,
      pass: true,
      details: [
        { id: 411, code: "Q1-2024", value: 27, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Tài chính", published: true, description: "Báo cáo quý 1 năm 2024", type: "finance" },
        { id: 412, code: "Q2-2024", value: 29, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phòng Tài chính", published: true, description: "Báo cáo quý 2 năm 2024", type: "finance" },
        { id: 413, code: "Q3-2024", value: 28, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phòng Tài chính", published: true, description: "Báo cáo quý 3 năm 2024", type: "finance" },
        { id: 414, code: "Q4-2024", value: 28, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Tài chính", published: true, description: "Báo cáo quý 4 năm 2024", type: "finance" }
      ]
    },
    {
      id: 42,
      code: "4.2",
      title: "Chỉ số tăng trưởng bền vững trong 3 năm gần nhất không âm",
      threshold: 0,
      unit: "%",
      thresholdType: "min",
      type: "ratio",
      value: 6,
      pass: true,
      details: [
        { id: 421, code: "Q1-2024", value: 5, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Tài chính", published: true, description: "Chỉ số quý 1 năm 2024", type: "finance" },
        { id: 422, code: "Q2-2024", value: 6, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phòng Tài chính", published: true, description: "Chỉ số quý 2 năm 2024", type: "finance" },
        { id: 423, code: "Q3-2024", value: 7, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phòng Tài chính", published: true, description: "Chỉ số quý 3 năm 2024", type: "finance" },
        { id: 424, code: "Q4-2024", value: 6, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng Tài chính", published: true, description: "Chỉ số quý 4 năm 2024", type: "finance" }
      ]
    }
  ]
};
