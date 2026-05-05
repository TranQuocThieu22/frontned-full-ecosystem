import { Category, Criterion } from "./Interfaces/IQAEduViewModel";

export const finance: Category = {
  id: "4",
  name: "Tài chính",
  criteria: [
    {
      id: "4.1",
      title: "Chênh lệch thu chi / tổng thu của 3 năm gần nhất",
      description: "Chênh lệch thu chi / tổng thu trong 3 năm gần nhất (từ 0, tối đa 30%)",
      type: "ratio",
      value: 25,      // giá trị thực tế (%)
      unit: "%",
      threshold: 30,
      thresholdType: "max",
      pass: 25 <= 30
    },
    {
      id: "4.2",
      title: "Chỉ số tăng trưởng bền vững trong 3 năm gần nhất",
      description: "Chỉ số tăng trưởng bền vững trong 3 năm gần nhất không âm",
      type: "ratio",
      value: 2.5,     // giá trị thực tế (%)
      unit: "%",
      threshold: 0,
      thresholdType: "min",
      pass: 2.5 >= 0
    }
  ]
};
