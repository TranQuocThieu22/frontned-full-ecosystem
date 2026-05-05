import { Category } from "./IqmesViewModel";

export const to_chuc_va_quan_tri: Category = {
  id: 1,
  code: "1",
  name: "Tổ chức và quản trị",
  criteria: [
    {
      id: 11,
      code: "1.1",
      title: "Thời gian khuyết đồng thời 2 lãnh đạo chủ chốt không quá 6 tháng",
      description: "Đo lường thời gian khuyết lãnh đạo chủ chốt để đảm bảo hoạt động liên tục.",
      unit: "tháng",
      threshold: 6,
      thresholdType: "max",
      type: "rule",
      value: 4,
      pass: true,
      details: [
        { id: 111, code: "Q1-2024", value: 1, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Hiệu trưởng", published: true, description: "Thời gian khuyết lãnh đạo Q1-2024 kéo dài 1 tháng.", type: "rule" },
        { id: 112, code: "Q2-2024", value: 1, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Thời gian khuyết lãnh đạo Q2-2024 kéo dài 1 tháng.", type: "rule" },
        { id: 113, code: "Q3-2024", value: 1, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Ban Giám hiệu", published: true, description: "Thời gian khuyết lãnh đạo Q3-2024 kéo dài 1 tháng.", type: "rule" },
        { id: 114, code: "Q4-2024", value: 1, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Trưởng phòng Tổ chức - Hành chính", published: true, description: "Thời gian khuyết lãnh đạo Q4-2024 kéo dài 1 tháng.", type: "rule" }
      ]
    },
    {
      id: 12,
      code: "1.2",
      title: "Văn bản quy chế, quy định đã được ban hành đầy đủ",
      description: "Đảm bảo tất cả văn bản nội quy, quy chế được ban hành kịp thời.",
      threshold: 100,
      thresholdType: "min",
      type: "rule",
      value: 100,
      pass: true,
      details: [
        { id: 121, code: "Q1-2024", value: 25, startDate: new Date(2024,0,1), endDate: new Date(2024,2,31), decisionAuthority: "Phòng Tổ chức - Hành chính", published: true, description: "25% văn bản quy chế được ban hành trong Q1-2024.", type: "rule" },
        { id: 122, code: "Q2-2024", value: 25, startDate: new Date(2024,3,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "25% văn bản quy chế được ban hành trong Q2-2024.", type: "rule" },
        { id: 123, code: "Q3-2024", value: 25, startDate: new Date(2024,6,1), endDate: new Date(2024,8,30), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "25% văn bản quy chế được ban hành trong Q3-2024.", type: "rule" },
        { id: 124, code: "Q4-2024", value: 25, startDate: new Date(2024,9,1), endDate: new Date(2024,11,31), decisionAuthority: "Ban Giám hiệu", published: true, description: "25% văn bản quy chế được ban hành trong Q4-2024.", type: "rule" }
      ]
    },
    {
      id: 13,
      code: "1.3",
      title: "Cải thiện chiến lược, kế hoạch phát triển hàng năm (ít nhất 50%)",
      description: "Theo dõi mức độ cải thiện chiến lược và kế hoạch phát triển theo từng nửa năm.",
      unit: "%",
      threshold: 50,
      thresholdType: "min",
      type: "area",
      value: 60,
      pass: true,
      details: [
        { id: 131, code: "H1-2024", value: 30, startDate: new Date(2024,0,1), endDate: new Date(2024,5,30), decisionAuthority: "Hiệu trưởng", published: true, description: "Cải thiện chiến lược H1-2024 đạt 30%.", type: "area" },
        { id: 132, code: "H2-2024", value: 30, startDate: new Date(2024,6,1), endDate: new Date(2024,11,31), decisionAuthority: "Phó Hiệu trưởng", published: true, description: "Cải thiện chiến lược H2-2024 đạt 30%.", type: "area" }
      ]
    },
    {
      id: 14,
      code: "1.4",
      title: "Dữ liệu đảm bảo chất lượng cơ sở giáo dục được kết nối, cập nhật đầy đủ lên HEMIS",
      description: "Đảm bảo dữ liệu cơ sở giáo dục được kết nối và cập nhật kịp thời lên hệ thống HEMIS.",
      threshold: 100,
      thresholdType: "min",
      type: "survey",
      value: 90,
      pass: false,
      details: [
        { id: 141, code: "H1-2024", value: 45, startDate: new Date(2024,0,1), endDate: new Date(2024,5,30), decisionAuthority: "Phòng CNTT", published: true, description: "Cập nhật dữ liệu HEMIS H1-2024 đạt 45%.", type: "survey" },
        { id: 142, code: "H2-2024", value: 45, startDate: new Date(2024,6,1), endDate: new Date(2024,11,31), decisionAuthority: "Trưởng phòng CNTT", published: true, description: "Cập nhật dữ liệu HEMIS H2-2024 đạt 45%.", type: "survey" }
      ]
    }
  ]
};
