import { Category } from "./IqmesViewModel";

export const nghien_cuu_va_doi_moi: Category = {
  id: 6,
  code: "6",
  name: "Nghiên cứu và đổi mới sáng tạo",
  criteria: [
    {
      id: 61,
      code: "6.1",
      title: "Tỷ trọng thu từ hoạt động khoa học công nghệ trên tổng thu của cơ sở giáo dục có đào tạo tiến sĩ trung bình 3 năm (tối thiểu 5%)",
      unit: "%",
      threshold: 5,
      thresholdType: "min",
      type: "finance",
      value: 6,
      pass: true,
      details: [
        { id: 611, code: "2024", value: 6, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng KHCN", published: true, description: "Tỷ trọng thu từ KH&CN năm 2024.", type: "finance" }
      ]
    },
    {
      id: 62,
      code: "6.2.1",
      title: "Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm (tối thiểu 0.3)",
      unit: "công bố/giảng viên",
      threshold: 0.3,
      thresholdType: "min",
      type: "count",
      value: 0.45,
      pass: true,
      details: [
        { id: 621, code: "2024", value: 0.45, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng KHCN", published: true, description: "Số công bố trung bình trên giảng viên toàn thời gian năm 2024.", type: "count" }
      ]
    },
    {
      id: 63,
      code: "6.2.2",
      title: "Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm với cơ sở không đào tạo tiến sĩ (tối thiểu 0.3)",
      unit: "công bố/giảng viên",
      threshold: 0.3,
      thresholdType: "min",
      type: "count",
      value: 0.35,
      pass: true,
      details: [
        { id: 631, code: "2024", value: 0.35, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng KHCN", published: true, description: "Công bố năm 2024 cho cơ sở không đào tạo tiến sĩ.", type: "count" }
      ]
    },
    {
      id: 64,
      code: "6.2.3",
      title: "Số lượng công bố khoa học trên một giảng viên toàn thời gian trong năm với cơ sở có đào tạo tiến sĩ (tối thiểu 0.6)",
      unit: "công bố/giảng viên",
      threshold: 0.6,
      thresholdType: "min",
      type: "count",
      value: 0.68,
      pass: true,
      details: [
        { id: 641, code: "2024", value: 0.68, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng KHCN", published: true, description: "Công bố năm 2024 cho cơ sở có đào tạo tiến sĩ.", type: "count" }
      ]
    },
    {
      id: 65,
      code: "6.2.4",
      title: "Số lượng công bố khoa học trong danh mục Web of Science trên một giảng viên toàn thời gian trong năm và cơ sở có đào tạo tiến sĩ (tối thiểu 0.3)",
      unit: "công bố/giảng viên",
      threshold: 0.3,
      thresholdType: "min",
      type: "count",
      value: 0.42,
      pass: true,
      details: [
        { id: 651, code: "2024", value: 0.42, startDate: new Date(2024,0,1), endDate: new Date(2024,11,31), decisionAuthority: "Phòng KHCN", published: true, description: "Công bố Web of Science năm 2024 cho cơ sở có đào tạo tiến sĩ.", type: "count" }
      ]
    }
  ]
};
