import {
  SchoolRegulationAssessment,
  AnnualStrategyImprovement,
  SchoolHEMISRecord,
  SchoolLeadershipVacancy,
  LeadershipOverlapRule
} from "./Interfaces/IOrganizationAndAdministrationViewModel";
import { Category } from "./Interfaces/IQAEduViewModel";
import { IconSitemap } from "@tabler/icons-react";

// Mock menuData cho Mục 1: Tổ chức và quản trị
export const organizationAndAdministration: Category = {
  id: "1",
  name: "Tổ chức và quản trị",
  criteria: [
    // 1.1 Thời gian khuyết đồng thời 2 lãnh đạo chủ chốt
    {
      id: "1.1",
      title: "Thời gian khuyết đồng thời 2 lãnh đạo chủ chốt ",
      type: "rule",
      unit: "tháng",
      threshold: 6,
      value: 4,
      thresholdType: "max",
      description:
        "Quy định thời gian tối đa khuyết 2 vị trí lãnh đạo chủ chốt cùng lúc.",
      pass: 4 <= 6,
      details: {
        vacancies: [
          {
            id: "2024-01",
            vacantPositions: ["Hiệu trưởng"],
            startDate: new Date("2024-01-15"),
            expectedFillDate: new Date("2024-12-01"),
            decisionAuthority: "Bộ GDĐT",
            notes: "Hiệu trưởng nghỉ hưu, đang bổ nhiệm người thay thế.",
          },
          {
            id: "2024-02",
            vacantPositions: ["Phó Hiệu trưởng", "Trưởng phòng Đào tạo"], // 2 vị trí cùng lúc
            startDate: new Date("2024-05-10"),
            expectedFillDate: new Date("2024-08-01"),
            decisionAuthority: "Hội đồng trường",
            notes: "Khuyết đồng thời 2 vị trí do một người nghỉ hưu và một người chuyển công tác.",
          },
          {
            id: "2024-03",
            vacantPositions: ["Chủ tịch Hội đồng trường"],
            startDate: new Date("2024-09-01"),
            expectedFillDate: new Date("2024-11-15"),
            decisionAuthority: "UBND tỉnh",
            notes: "Chủ tịch HĐT được điều động sang vị trí khác.",
          },
          {
            id: "2024-04",
            vacantPositions: ["Bí thư Đảng ủy"],
            startDate: new Date("2024-12-01"),
            expectedFillDate: undefined, // chưa có dự kiến
            decisionAuthority: "Ban Thường vụ Đảng ủy Khối",
            notes: "Chưa có ứng viên chính thức, tạm thời do Phó Bí thư phụ trách.",
          },
          {
            id: "2025-01",
            vacantPositions: ["Trưởng phòng Tổ chức - Hành chính"],
            startDate: new Date("2025-02-01"),
            expectedFillDate: new Date("2025-04-20"),
            decisionAuthority: "Hiệu trưởng",
            notes: "Trưởng phòng TCHC nghỉ hưu, đang lấy ý kiến bổ nhiệm nội bộ.",
          },
          {
            id: "2025-02",
            vacantPositions: ["Hiệu trưởng", "Chủ tịch Hội đồng trường"], // 2 vị trí chủ chốt cùng khuyết
            startDate: new Date("2025-05-01"),
            expectedFillDate: new Date("2025-09-01"),
            decisionAuthority: "Bộ GDĐT & UBND tỉnh",
            notes: "Cả Hiệu trưởng và Chủ tịch HĐT đồng thời nghỉ công tác; Hội đồng trường đã đề xuất nhân sự thay thế.",
          },
          {
            id: "2025-03",
            vacantPositions: ["Phó Hiệu trưởng"],
            startDate: new Date("2025-07-15"),
            expectedFillDate: new Date("2025-10-01"),
            decisionAuthority: "Hội đồng trường",
            notes: "Một Phó Hiệu trưởng được bổ nhiệm làm Hiệu trưởng, nên để trống vị trí này.",
          },
          {
            id: "2025-04",
            vacantPositions: ["Trưởng phòng Đào tạo", "Trưởng phòng Tổ chức - Hành chính", "Bí thư Đảng ủy"], // 3 vị trí cùng lúc
            startDate: new Date("2025-08-01"),
            expectedFillDate: new Date("2025-12-31"),
            decisionAuthority: "Ban Thường vụ Đảng ủy Khối & Hiệu trưởng",
            notes: "Biến động nhân sự lớn do một số cán bộ chuyển công tác và nghỉ hưu cùng thời điểm.",
          },
          {
            id: "2025-05",
            vacantPositions: ["Khác"],
            startDate: new Date("2025-09-10"),
            expectedFillDate: undefined, // chưa xác định
            decisionAuthority: "Hội đồng trường",
            notes: "Vị trí Trưởng ban Thanh tra nhân dân bị khuyết, đang lấy ý kiến tập thể.",
          }

        ]
      } as LeadershipOverlapRule
    },

    // 1.2 Văn bản quy chế, quy định
    {
      id: "1.2",
      title: "Văn bản quy chế, quy định đã được ban hành đầy đủ",
      type: "rule",
      unit: "văn bản",
      threshold: 8,
      value: 7,
      details: {
        missingTypes: ["Quy định nghiên cứu khoa học"], // vẫn còn thiếu
        documents: [
          {
            id: "DOC001",
            title: "Quy chế tổ chức và hoạt động",
            type: "Quy chế tổ chức và hoạt động",
            issuedDate: new Date("2023-03-01"),
            issuedBy: "Hội đồng trường",
            published: true
          },
          {
            id: "DOC002",
            title: "Quy định đào tạo",
            type: "Quy định đào tạo",
            issuedDate: new Date("2023-05-10"),
            issuedBy: "Hiệu trưởng",
            published: true
          },
          {
            id: "DOC003",
            title: "Quy định công tác sinh viên",
            type: "Quy định công tác sinh viên",
            issuedDate: new Date("2023-06-15"),
            issuedBy: "Hiệu trưởng",
            published: true
          },
          {
            id: "DOC004",
            title: "Quy định tài chính - cơ sở vật chất",
            type: "Quy định tài chính - cơ sở vật chất",
            issuedDate: new Date("2023-07-01"),
            issuedBy: "Hội đồng trường",
            published: true
          },
          {
            id: "DOC005",
            title: "Quy định về hợp tác quốc tế",
            type: "Quy định hợp tác quốc tế",
            issuedDate: new Date("2023-08-20"),
            issuedBy: "Hiệu trưởng",
            published: true
          },
          {
            id: "DOC006",
            title: "Quy định về nhân sự và lao động",
            type: "Quy định nhân sự",
            issuedDate: new Date("2023-09-05"),
            issuedBy: "Phòng Tổ chức - Hành chính",
            published: true
          },
          {
            id: "DOC007",
            title: "Quy định về công tác khảo thí và đảm bảo chất lượng",
            type: "Quy định khảo thí & đảm bảo chất lượng",
            issuedDate: new Date("2023-10-12"),
            issuedBy: "Phòng Khảo thí & ĐBCL",
            published: true
          }
        ]
      } as SchoolRegulationAssessment,
      description:
        "Trường cần ban hành đầy đủ tất cả các quy chế, quy định theo danh mục Bộ GDĐT.",
      pass: false // vì vẫn thiếu "Quy định nghiên cứu khoa học"
    },

    // 1.3 Cải thiện chiến lược, kế hoạch phát triển hàng năm
    {
      id: "1.3",
      title: "Cải thiện chiến lược, kế hoạch phát triển hàng năm",
      type: "ratio",
      unit: "%",
      threshold: 50,
      value: 75,
      details: {
        documents: [
          {
            area: "Cơ sở vật chất",
            description: "Nâng cấp 5 phòng học thông minh và thư viện số.",
            improved: true
          },
          {
            area: "Phương pháp giảng dạy",
            description: "Triển khai blended learning cho 30% học phần.",
            improved: true
          },
          {
            area: "Nghiên cứu khoa học",
            description: "Tăng 20% số lượng công bố quốc tế so với năm trước.",
            improved: true
          },
          {
            area: "Hợp tác quốc tế",
            description: "Ký kết 3 biên bản ghi nhớ hợp tác mới với đại học nước ngoài.",
            improved: true
          },
          {
            area: "Quản lý & điều hành",
            description: "Triển khai hệ thống quản lý nhân sự trực tuyến HRM.",
            improved: false
          },
          {
            area: "Học sinh/Sinh viên & hỗ trợ",
            description: "Mở rộng học bổng toàn phần cho sinh viên xuất sắc.",
            improved: false
          },
          {
            area: "Chuyển đổi số",
            description: "Triển khai hệ thống e-learning và ứng dụng di động cho sinh viên.",
            improved: true
          },
          {
            area: "Khác",
            description: "Tổ chức khảo sát ý kiến sinh viên định kỳ mỗi học kỳ.",
            improved: true
          }
        ]
      } as AnnualStrategyImprovement,
      pass: 75 >= 50
    },

    // 1.4 Dữ liệu HEMIS
    {
      id: "1.4",
      title:
        "Dữ liệu đảm bảo chất lượng cơ sở giáo dục được kết nối, cập nhật đầy đủ lên HEMIS",
      type: "rule",
      unit: "%",
      threshold: 100,
      value: 90,
      details: {
        id: "HEMIS001",
        schoolName: "Trường Đại học ABC",
        connected: true,
        lastSyncDate: new Date("2025-05-15"),
        responsibleUnit: "Phòng Khảo thí & ĐBCLGD",
        overallCompleteness: 90,
        dataStatusList: [
          {
            category: "Chương trình đào tạo",
            lastUpdated: new Date("2025-04-20"),
            isComplete: true
          },
          {
            category: "Đội ngũ giảng viên",
            lastUpdated: new Date("2025-04-25"),
            isComplete: true
          },
          {
            category: "Sinh viên",
            lastUpdated: new Date("2025-05-01"),
            isComplete: false,
            notes: "Thiếu dữ liệu tuyển sinh năm 2024"
          },
          {
            category: "Cơ sở vật chất",
            lastUpdated: new Date("2025-05-10"),
            isComplete: true
          }
        ],
        comments: "Đã kết nối HEMIS, cần bổ sung dữ liệu sinh viên."
      } as SchoolHEMISRecord,
      pass: 90 >= 100
    }
  ],
  icon: typeof IconSitemap
};
