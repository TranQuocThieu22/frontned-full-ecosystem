import { Category } from "./Interfaces/IQAEduViewModel";

export const research: Category = {
  id: "6",
  name: "Nghiên cứu và đổi mới sáng tạo",
  criteria: [
    {
      id: "6.1",
      title: "Tỷ trọng thu từ hoạt động khoa học công nghệ trên tổng thu của cơ sở giáo dục có đào tạo tiến sĩ trung bình 3 năm",
      description: "Tối thiểu 5%",
      type: "ratio",
      value: 6,
      unit: "%",
      threshold: 5,
      thresholdType: "min",
      pass: 6 >= 5
    },
    {
      id: "6.2.1",
      title: "Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm (cơ sở không đào tạo tiến sĩ)",
      description: "Tối thiểu 0.3 công bố / giảng viên",
      type: "ratio",
      value: 0.35,
      unit: "công bố/giảng viên",
      threshold: 0.3,
      thresholdType: "min",
      pass: 0.35 >= 0.3
    },
    {
      id: "6.2.2",
      title: "Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm (cơ sở có đào tạo tiến sĩ)",
      description: "Tối thiểu 0.6 công bố / giảng viên",
      type: "ratio",
      value: 0.65,
      unit: "công bố/giảng viên",
      threshold: 0.6,
      thresholdType: "min",
      pass: 0.65 >= 0.6
    },
    {
      id: "6.2.3",
      title: "Số lượng công bố khoa học trong danh mục Web of Science trên một giảng viên toàn thời gian trong năm (cơ sở có đào tạo tiến sĩ)",
      description: "Tối thiểu 0.3 công bố / giảng viên",
      type: "ratio",
      value: 0.4,
      unit: "công bố/giảng viên",
      threshold: 0.3,
      thresholdType: "min",
      pass: 0.4 >= 0.3
    }
  ]
};
