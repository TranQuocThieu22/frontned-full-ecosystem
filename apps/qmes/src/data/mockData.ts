export interface Criteria {
  id: number;
  type: number; // 1 = "bắt buộc", 0 = "không bắt buộc"
  /**Có vượt qua kiểm tra hay không ? hoàn thành hay chưa hoàn thành */
  isPass: boolean;
  /** Title */
  title: string;
  /** Nội dung */
  content: string;
  /** Tiến độ của criteria */
  criteriaProgress: number;
  /** Ngày bắt đầu thanh tra */
  dateStart: Date | null;
  /** Ngày kết thúc thanh tra */
  dateEnd: Date | null;
  /** Đối tượng kiểm tra (Khoa)*/
  targetDepartment: string[];
  /** Đối tượng kiểm tra (Khóa học  || Chương trình đào tạo || Bậc đào tạo)*/
  targetCurriculum: string[];
  /** Người kiểm tra */
  inspectors: string[];
  totalTitle?: string;
  countTitle?: string;
  dateComplete: Date | null;
  criteriaDetails?: CriteriaDetail[];

  chartType?: number;
}
export interface qmesDashboardData {
  id: number;
  categoryCode: number;
  criteria: Criteria[];
}
export interface progressHistory {
  date: Date;
  type: number;
  // 1: value chỉ có phần trăm
  // 2: có total và value
  total?: number;
  value: number;
  /** chứa targetDepartment */
  content: string;
}

//categoryCode
//     1| "Chương trình đào tạo"
//     2| "Phương pháp giảng dạy"
//     3| "Nghiên cứu khoa học"
//     4| "Cơ sở vật chất"
//     5| "Công nghệ thông tin"
//     6| "Hợp tác quốc tế"
//     7| "Quản lý & điều hành"
//     8| "Học sinh/Sinh viên & hỗ trợ"
//     9| "Khác";

export interface CriteriaDetail {
  id: number;
  type: number;
  // loại tiêu chí:
  // 1: đo không ngưỡng
  // 2: đo có ngưỡng
  // 3: đạt/không đạt;
  name: string;
  description: string;
  value: number | null;
  threshold: number | null;
  isPass: boolean | null;
  date?: Date;
  /** tổng số đối tượng (chỉ tiêu công bố hoặc tổng SV) */
  total?: number;
  /** số lượng đạt (nhập học) hoặc không đạt (thôi học) */
  count?: number;
  progressHistory?: progressHistory[];
}

export const mockData: qmesDashboardData[] = [
  {
    id: 7,
    categoryCode: 7,
    criteria: [
      {
        id: 1,
        type: 1,
        isPass: true,
        chartType: 2,
        title: "Tỉ lệ nhập học trên chỉ tiêu công bố của 3 năm gần nhất",
        content: `Thống kê tỷ lệ nhập học của 3 năm gần nhất dựa trên các hình thức: 
        1. Kỳ Thi tốt nghiệp THPT 
        2. Thi ĐGNL do ĐH Quốc gia TPHCM tổ chức 
        3. Xét tuyển học bạ. Thống kê tỷ lệ nhập học của 3 năm gần nhất dựa trên các hình thức: 
        1. Kỳ Thi tốt nghiệp THPT 
        2. Thi ĐGNL do ĐH Quốc gia TPHCM tổ chức 
        3. Xét tuyển học bạ. Thống kê tỷ lệ nhập học của 3 năm gần nhất dựa trên các hình thức: 
        1. Kỳ Thi tốt nghiệp THPT 
        2. Thi ĐGNL do ĐH Quốc gia TPHCM tổ chức 
        3. Xét tuyển học bạ.`,
        criteriaProgress: 100,
        dateStart: new Date("2023-08-01"),
        dateEnd: new Date("2023-08-31"),
        dateComplete: new Date("2023-08-31"),
        targetDepartment: [
          "Khoa Công nghệ thông tin",
          "Khoa Quản trị kinh doanh",
          "Khoa Điện - Điện tử",
          "Khoa Cơ khí",
          "Khoa Xây dựng",
          "Khoa Ngoại ngữ",
          "Khoa Kinh tế",
          "Khoa Luật",
          "Khoa Y Dược",
          "Khoa Môi trường",
          "Khoa Khoa học xã hội và Nhân văn",
          "Khoa Du lịch",
        ],
        targetCurriculum: ["Chương trình 1", "Chương trình 2"],
        inspectors: ["Bộ GDĐT TPHCM", "Hiệu trưởng nhà trường"],
        totalTitle: "Chỉ tiêu công bố",
        countTitle: "Nhập học thực tế",
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ nhập học Năm 2023",
            description: "Tỉ lệ nhập học Năm 2023 lấy từ CSDL của trường",
            total: 500,
            count: 189,
            value: (489 / 500) * 100,
            date: new Date("2023-01-01"),
            threshold: 90,
            isPass: true,
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ nhập học Năm 2024",
            description: "Tỉ lệ nhập học Năm 2024 lấy từ CSDL của trường",
            total: 520,
            count: 442,
            value: (442 / 520) * 100,
            date: new Date("2024-01-01"),
            threshold: 80,
            isPass: true,
          },
          {
            id: 3,
            type: 2,
            name: "Tỉ lệ nhập học Năm 2025",
            description: "Tỉ lệ nhập học Năm 2025 lấy từ CSDL của trường",
            total: 550,
            count: 514,
            value: (514 / 550) * 100,
            date: new Date("2025-01-01"),
            threshold: 90,
            isPass: true,
          },
        ],
      },
      {
        id: 2,
        type: 1,
        isPass: true,
        chartType: 2,
        title: "Tỉ lệ thôi học của 3 năm gần nhất",
        content: `Thống kê tỷ lệ thôi học của 3 năm gần nhất của từng khoa.`,
        criteriaProgress: 100,
        dateStart: new Date("2023-08-01"),
        dateEnd: new Date("2023-08-07"),
        dateComplete: new Date("2023-08-07"),
        targetDepartment: [
          "Khoa Công nghệ thông tin",
          "Khoa Quản trị kinh doanh",
          "Khoa Điện - Điện tử",
          "Khoa Cơ khí",
          "Khoa Xây dựng",
          "Khoa Ngoại ngữ",
          "Khoa Kinh tế",
          "Khoa Luật",
          "Khoa Y Dược",
          "Khoa Môi trường",
          "Khoa Khoa học xã hội và Nhân văn",
          "Khoa Du lịch",
        ],
        targetCurriculum: ["Chương trình 1", "Chương trình 2"],
        inspectors: ["Bộ GDĐT TPHCM", "Hiệu trưởng nhà trường"],
        totalTitle: "Số học sinh nhập học",
        countTitle: "Số học sinh thôi học",
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ thôi học Năm 2023",
            description:
              "Tỉ lệ thôi học Năm 2023 theo báo cáo của phòng Đào tạo",
            value: 5.3,
            threshold: 10,
            isPass: true,
            date: new Date("2023-12-31"),
            total: 2000, // tổng số sinh viên
            count: 106, // số thôi học thực tế
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ thôi học Năm 2024",
            description:
              "Tỉ lệ thôi học Năm 2024 theo báo cáo của phòng Đào tạo",
            value: 6.8,
            threshold: 10,
            isPass: true,
            date: new Date("2024-12-31"),
            total: 2100,
            count: 143,
          },
          {
            id: 3,
            type: 2,
            name: "Tỉ lệ thôi học Năm 2025",
            description:
              "Tỉ lệ thôi học Năm 2025 theo báo cáo của phòng Đào tạo",
            value: 4.2,
            threshold: 10,
            isPass: true,
            date: new Date("2025-12-31"),
            total: 2200,
            count: 92,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    categoryCode: 1,
    criteria: [
      {
        id: 3,
        type: 1,
        isPass: false,
        chartType: 1,
        title: "Chương trình đào tạo được đánh giá và cập nhật định kỳ",
        content:
          "Đánh giá việc rà soát và cập nhật chương trình đào tạo theo chu kỳ 2 năm/lần",
        criteriaProgress: 87,
        dateStart: new Date("2023-07-01"),
        dateEnd: new Date("2023-08-15"),
        dateComplete: null,
        targetDepartment: [
          "Khoa Công nghệ thông tin",
          "Khoa Quản trị kinh doanh",
          "Khoa Điện - Điện tử",
          "Khoa Ngoại ngữ",
          "Khoa Kinh tế",
        ],
        targetCurriculum: ["Đại học", "Cao học"],
        inspectors: ["Hội đồng Khoa học Đào tạo", "Phòng Đào tạo"],
        totalTitle: "tổng số môn học",
        countTitle: "số môn đã cập nhật",
        criteriaDetails: [
          {
            id: 1,
            type: 3,
            name: "Quy trình cập nhật CTĐT",
            description: "Có quy trình rõ ràng và được thực hiện",
            value: 76,
            threshold: 80,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-01-31"),
                type: 1,
                value: 55,
                content: "Khoa Công nghệ thông tin",
              },
              {
                date: new Date("2023-05-31"),
                type: 1,
                value: 75,
                content: "Khoa Công nghệ thông tin",
              },
              {
                date: new Date("2023-12-31"),
                type: 1,
                value: 85,
                content: "Khoa Công nghệ thông tin",
              },

              {
                date: new Date("2023-01-31"),
                type: 1,
                value: 40,
                content: "Khoa Quản trị kinh doanh",
              },
              {
                date: new Date("2023-05-31"),
                type: 1,
                value: 60,
                content: "Khoa Quản trị kinh doanh",
              },
              {
                date: new Date("2023-12-31"),
                type: 1,
                value: 70,
                content: "Khoa Quản trị kinh doanh",
              },

              {
                date: new Date("2023-01-31"),
                type: 1,
                value: 65,
                content: "Khoa Điện - Điện tử",
              },
              {
                date: new Date("2023-05-31"),
                type: 1,
                value: 68,
                content: "Khoa Điện - Điện tử",
              },
              {
                date: new Date("2023-12-31"),
                type: 1,
                value: 78,
                content: "Khoa Điện - Điện tử",
              },
            ],
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ môn học được cập nhật",
            description: "Tỉ lệ môn học được cập nhật nội dung",
            value: 72.5,
            threshold: 80,
            isPass: false,
            progressHistory: [
              // CNTT (55%, 75%, 85%)
              {
                date: new Date("2023-01-31"),
                type: 2,
                total: 200,
                value: 110,
                content: "Khoa Công nghệ thông tin",
              }, // 110/200 = 55%
              {
                date: new Date("2023-05-31"),
                type: 2,
                total: 120,
                value: 90,
                content: "Khoa Công nghệ thông tin",
              }, // 90/120 = 75%
              {
                date: new Date("2023-12-31"),
                type: 2,
                total: 400,
                value: 340,
                content: "Khoa Công nghệ thông tin",
              }, // 340/400 = 85%

              // QTKD (40%, 60%, 70%)
              {
                date: new Date("2023-01-31"),
                type: 2,
                total: 150,
                value: 60,
                content: "Khoa Quản trị kinh doanh",
              }, // 60/150 = 40%
              {
                date: new Date("2023-05-31"),
                type: 2,
                total: 200,
                value: 120,
                content: "Khoa Quản trị kinh doanh",
              }, // 120/200 = 60%
              {
                date: new Date("2023-12-31"),
                type: 2,
                total: 250,
                value: 175,
                content: "Khoa Quản trị kinh doanh",
              }, // 175/250 = 70%

              // Điện - Điện tử (65%, 68%, 78%)
              {
                date: new Date("2023-01-31"),
                type: 2,
                total: 80,
                value: 52,
                content: "Khoa Điện - Điện tử",
              }, // 52/80 = 65%
              {
                date: new Date("2023-05-31"),
                type: 2,
                total: 150,
                value: 102,
                content: "Khoa Điện - Điện tử",
              }, // 102/150 = 68%
              {
                date: new Date("2023-12-31"),
                type: 2,
                total: 90,
                value: 70,
                content: "Khoa Điện - Điện tử",
              }, // 70/90 ≈ 77.8% ~ 78%
            ],
          },
        ],
      },
    ],
  },

  {
    id: 2,
    categoryCode: 2,
    criteria: [
      {
        id: 5,
        type: 1,
        isPass: true,
        chartType: 1,
        title: "Áp dụng phương pháp giảng dạy tích cực",
        content:
          "Đánh giá mức độ áp dụng phương pháp giảng dạy tích cực của giảng viên",
        criteriaProgress: 100,
        dateStart: new Date("2023-08-15"),
        dateEnd: new Date("2023-09-15"),
        dateComplete: new Date("2023-09-16"),
        targetDepartment: ["Tất cả các khoa"],
        targetCurriculum: ["Đại học", "Cao học"],
        inspectors: ["Phòng Đào tạo", "Trung tâm Đảm bảo chất lượng"],
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ GV áp dụng phương pháp tích cực",
            description:
              "Tỉ lệ giảng viên áp dụng ít nhất 2 phương pháp giảng dạy tích cực",
            value: 83.5,
            threshold: 70,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-31"),
                type: 3,
                total: 120,
                value: 90,
                content: "Khoa Công nghệ thông tin",
              }, // 75%
              {
                date: new Date("2023-06-30"),
                type: 3,
                total: 150,
                value: 120,
                content: "Khoa Công nghệ thông tin",
              }, // 80%
              {
                date: new Date("2023-12-31"),
                type: 3,
                total: 160,
                value: 135,
                content: "Khoa Công nghệ thông tin",
              }, // 84%

              {
                date: new Date("2023-01-31"),
                type: 3,
                total: 100,
                value: 65,
                content: "Khoa Quản trị kinh doanh",
              }, // 65%
              {
                date: new Date("2023-06-30"),
                type: 3,
                total: 120,
                value: 95,
                content: "Khoa Quản trị kinh doanh",
              }, // 79%
              {
                date: new Date("2023-12-31"),
                type: 3,
                total: 130,
                value: 110,
                content: "Khoa Quản trị kinh doanh",
              }, // 84.6%
            ],
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ môn học có hoạt động thực hành",
            description: "Tỉ lệ môn học có tối thiểu 30% thời lượng thực hành",
            value: 75.2,
            threshold: 60,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-31"),
                type: 3,
                total: 80,
                value: 50,
                content: "Khoa Điện - Điện tử",
              }, // 62.5%
              {
                date: new Date("2023-06-30"),
                type: 3,
                total: 100,
                value: 72,
                content: "Khoa Điện - Điện tử",
              }, // 72%
              {
                date: new Date("2023-12-31"),
                type: 3,
                total: 110,
                value: 85,
                content: "Khoa Điện - Điện tử",
              }, // 77%

              {
                date: new Date("2023-01-31"),
                type: 3,
                total: 90,
                value: 50,
                content: "Khoa Ngoại ngữ",
              }, // 55.5%
              {
                date: new Date("2023-06-30"),
                type: 3,
                total: 100,
                value: 70,
                content: "Khoa Ngoại ngữ",
              }, // 70%
              {
                date: new Date("2023-12-31"),
                type: 3,
                total: 120,
                value: 95,
                content: "Khoa Ngoại ngữ",
              }, // 79%
            ],
          },
        ],
      },
      {
        id: 6,
        type: 1,
        isPass: false,
        chartType: 1,
        title: "Ứng dụng công nghệ trong dạy học",
        content: "Đánh giá việc ứng dụng công nghệ số trong dạy học",
        criteriaProgress: 62,
        dateStart: new Date("2023-07-01"),
        dateEnd: new Date("2023-08-31"),
        dateComplete: null,
        targetDepartment: ["Tất cả các khoa"],
        targetCurriculum: ["Đại học", "Cao học"],
        inspectors: ["Phòng Đào tạo", "Trung tâm E-learning"],
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ môn học có tài liệu số",
            description:
              "Tỉ lệ môn học có đầy đủ tài liệu số trên hệ thống LMS",
            value: 56.8,
            threshold: 85,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-01-31"),
                type: 3,
                total: 50,
                value: 20,
                content: "Khoa CNTT",
              }, // 40%
              {
                date: new Date("2023-06-30"),
                type: 3,
                total: 70,
                value: 40,
                content: "Khoa CNTT",
              }, // 57%
              {
                date: new Date("2023-12-31"),
                type: 3,
                total: 100,
                value: 65,
                content: "Khoa CNTT",
              }, // 65%

              {
                date: new Date("2023-01-31"),
                type: 3,
                total: 40,
                value: 15,
                content: "Khoa Kinh tế",
              }, // 37.5%
              {
                date: new Date("2023-06-30"),
                type: 3,
                total: 60,
                value: 30,
                content: "Khoa Kinh tế",
              }, // 50%
              {
                date: new Date("2023-12-31"),
                type: 3,
                total: 90,
                value: 55,
                content: "Khoa Kinh tế",
              }, // 61%
            ],
          },
        ],
      },
    ],
  },

  {
    id: 3,
    categoryCode: 3,
    criteria: [
      {
        id: 7,
        type: 1,
        isPass: false,
        title: "Số lượng bài báo quốc tế",
        content:
          "Thống kê số lượng bài báo quốc tế được công bố trong các tạp chí thuộc danh mục ISI/Scopus",
        criteriaProgress: 45,
        dateStart: new Date("2023-01-01"),
        dateEnd: new Date("2023-12-31"),
        dateComplete: null,
        targetDepartment: ["Tất cả các khoa"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Phòng Khoa học Công nghệ", "Ban Giám hiệu"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 3,
            name: "Số bài báo ISI/Scopus Q1-Q2",
            description:
              "Số lượng bài báo được công bố trong các tạp chí Q1-Q2",
            value: 42,
            threshold: 60,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-03-31"),
                type: 2,
                total: 60,
                value: 10,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-06-30"),
                type: 2,
                total: 60,
                value: 22,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-09-30"),
                type: 2,
                total: 60,
                value: 35,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-12-25"),
                type: 2,
                total: 60,
                value: 42,
                content: "Tất cả các khoa",
              },
            ],
          },
          {
            id: 2,
            type: 1,
            name: "Số bài báo bình quân/giảng viên",
            description: "Số bài báo quốc tế bình quân/giảng viên/năm",
            value: 0.18,
            threshold: 0.25,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-03-31"),
                type: 1,
                value: 0.05,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-06-30"),
                type: 1,
                value: 0.1,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-09-30"),
                type: 1,
                value: 0.15,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-12-25"),
                type: 1,
                value: 0.18,
                content: "Tất cả các khoa",
              },
            ],
          },
        ],
      },
      {
        id: 8,
        type: 1,
        isPass: true,
        title: "Số lượng đề tài NCKH các cấp",
        content:
          "Thống kê số lượng đề tài nghiên cứu khoa học các cấp được phê duyệt và nghiệm thu",
        criteriaProgress: 100,
        dateStart: new Date("2023-01-01"),
        dateEnd: new Date("2023-12-31"),
        dateComplete: new Date("2023-12-29"),
        targetDepartment: ["Tất cả các khoa"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Phòng Khoa học Công nghệ", "Bộ GD&ĐT"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 3,
            name: "Số đề tài cấp Nhà nước",
            description: "Số đề tài cấp Nhà nước đang thực hiện",
            value: 5,
            threshold: 3,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-03-31"),
                type: 2,
                total: 3,
                value: 2,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-06-30"),
                type: 2,
                total: 3,
                value: 3,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-12-29"),
                type: 2,
                total: 5,
                value: 2,
                content: "Tất cả các khoa",
              },
            ],
          },
          {
            id: 2,
            type: 3,
            name: "Số đề tài cấp Bộ/Tỉnh",
            description: "Số đề tài cấp Bộ/Tỉnh đang thực hiện",
            value: 18,
            threshold: 15,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-03-31"),
                type: 2,
                total: 15,
                value: 10,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-06-30"),
                type: 2,
                total: 15,
                value: 14,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-09-30"),
                type: 2,
                total: 17,
                value: 16,
                content: "Tất cả các khoa",
              },
              {
                date: new Date("2023-12-29"),
                type: 2,
                total: 20,
                value: 18,
                content: "Tất cả các khoa",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    categoryCode: 4,
    criteria: [
      {
        id: 9,
        type: 1,
        isPass: true,
        title: "Đánh giá cơ sở vật chất phục vụ đào tạo",
        content:
          "Đánh giá mức độ đáp ứng của cơ sở vật chất phục vụ đào tạo theo tiêu chuẩn kiểm định",
        criteriaProgress: 100,
        dateStart: new Date("2023-06-01"),
        dateEnd: new Date("2023-07-15"),
        dateComplete: new Date("2023-07-17"),
        targetDepartment: ["Ban Quản lý cơ sở vật chất", "Các Khoa"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Trung tâm Đảm bảo chất lượng", "Ban Giám hiệu"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Diện tích học tập/sinh viên",
            description:
              "Diện tích sàn xây dựng trực tiếp phục vụ đào tạo/sinh viên",
            value: 5.8,
            threshold: 5.5,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-06-15"),
                type: 2,
                total: 5.5,
                value: 5.2,
                content: "Ban Quản lý cơ sở vật chất",
              },
              {
                date: new Date("2023-06-30"),
                type: 2,
                total: 5.5,
                value: 5.4,
                content: "Ban Quản lý cơ sở vật chất",
              },
              {
                date: new Date("2023-07-15"),
                type: 2,
                total: 5.5,
                value: 5.6,
                content: "Ban Quản lý cơ sở vật chất",
              },
              {
                date: new Date("2023-07-17"),
                type: 2,
                total: 5.5,
                value: 5.8,
                content: "Ban Quản lý cơ sở vật chất",
              },
            ],
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ phòng học có trang thiết bị hiện đại",
            description:
              "Tỉ lệ phòng học được trang bị máy chiếu, âm thanh hiện đại",
            value: 92.5,
            threshold: 85,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-06-15"),
                type: 2,
                total: 100,
                value: 80,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-06-30"),
                type: 2,
                total: 100,
                value: 85,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-07-15"),
                type: 2,
                total: 100,
                value: 90,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-07-17"),
                type: 2,
                total: 100,
                value: 92.5,
                content: "Các Khoa",
              },
            ],
          },
        ],
      },
      {
        id: 10,
        type: 1,
        isPass: false,
        title: "Thư viện và học liệu",
        content:
          "Đánh giá mức độ đáp ứng của thư viện và học liệu phục vụ đào tạo và nghiên cứu",
        criteriaProgress: 72,
        dateStart: new Date("2023-06-01"),
        dateEnd: new Date("2023-07-31"),
        dateComplete: null,
        targetDepartment: ["Thư viện", "Các Khoa"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Trung tâm Thư viện", "Trung tâm Đảm bảo chất lượng"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ đầu sách/sinh viên",
            description: "Số đầu sách bình quân/sinh viên",
            value: 8.2,
            threshold: 10,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-06-15"),
                type: 2,
                total: 10,
                value: 7,
                content: "Thư viện",
              },
              {
                date: new Date("2023-06-30"),
                type: 2,
                total: 10,
                value: 7.5,
                content: "Thư viện",
              },
              {
                date: new Date("2023-07-15"),
                type: 2,
                total: 10,
                value: 8,
                content: "Thư viện",
              },
              {
                date: new Date("2023-07-29"),
                type: 2,
                total: 10,
                value: 8.2,
                content: "Thư viện",
              },
            ],
          },
          {
            id: 2,
            type: 4,
            name: "Cơ sở dữ liệu học thuật quốc tế",
            description: "Có ít nhất 3 CSDL học thuật quốc tế được đăng ký",
            value: 1,
            threshold: 1,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-06-15"),
                type: 2,
                total: 3,
                value: 0,
                content: "Thư viện",
              },
              {
                date: new Date("2023-06-30"),
                type: 2,
                total: 3,
                value: 1,
                content: "Thư viện",
              },
              {
                date: new Date("2023-07-29"),
                type: 2,
                total: 3,
                value: 1,
                content: "Thư viện",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    categoryCode: 5,
    criteria: [
      {
        id: 11,
        type: 1,
        isPass: false,
        title: "Hệ thống CNTT phục vụ quản lý",
        content:
          "Đánh giá hiệu quả của hệ thống CNTT phục vụ quản lý đào tạo và nghiên cứu",
        criteriaProgress: 95,
        dateStart: new Date("2023-05-01"),
        dateEnd: new Date("2023-06-30"),
        dateComplete: null,
        targetDepartment: ["Trung tâm CNTT", "Các đơn vị quản lý"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Giám hiệu", "Chuyên gia CNTT"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 4,
            name: "Phần mềm quản lý đào tạo tích hợp",
            description:
              "Có phần mềm quản lý đào tạo tích hợp đầy đủ các chức năng",
            value: 1,
            threshold: 2,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-05-01"),
                type: 2,
                total: 1,
                value: 0,
                content: "Trung tâm CNTT",
              },
              {
                date: new Date("2023-05-15"),
                type: 2,
                total: 1,
                value: 0.5,
                content: "Trung tâm CNTT",
              },
              {
                date: new Date("2023-06-15"),
                type: 2,
                total: 1,
                value: 1,
                content: "Trung tâm CNTT",
              },
              {
                date: new Date("2023-07-01"),
                type: 2,
                total: 1,
                value: 1,
                content: "Trung tâm CNTT",
              },
            ],
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ quy trình được số hóa",
            description: "Tỉ lệ quy trình hành chính được số hóa",
            value: 68.5,
            threshold: 70,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-05-01"),
                type: 3,
                total: 100,
                value: 50,
                content: "Các đơn vị quản lý",
              },
              {
                date: new Date("2023-05-15"),
                type: 3,
                total: 100,
                value: 65,
                content: "Các đơn vị quản lý",
              },
              {
                date: new Date("2023-06-15"),
                type: 3,
                total: 100,
                value: 80,
                content: "Các đơn vị quản lý",
              },
              {
                date: new Date("2023-07-01"),
                type: 3,
                total: 100,
                value: 88.5,
                content: "Các đơn vị quản lý",
              },
            ],
          },
        ],
      },
      {
        id: 12,
        type: 1,
        isPass: false,
        title: "Chuyển đổi số trong giáo dục",
        content:
          "Đánh giá mức độ chuyển đổi số trong hoạt động đào tạo và nghiên cứu",
        criteriaProgress: 60,
        dateStart: new Date("2023-04-01"),
        dateEnd: new Date("2023-09-30"),
        dateComplete: null,
        targetDepartment: ["Tất cả đơn vị"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Chuyển đổi số", "Bộ GD&ĐT"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ học liệu số",
            description:
              "Tỉ lệ học liệu được số hóa và đưa lên nền tảng trực tuyến",
            value: 65.2,
            threshold: 80,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-04-01"),
                type: 3,
                total: 100,
                value: 40,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-06-01"),
                type: 3,
                total: 100,
                value: 55,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-08-01"),
                type: 3,
                total: 100,
                value: 62,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-10-01"),
                type: 3,
                total: 100,
                value: 65.2,
                content: "Tất cả đơn vị",
              },
            ],
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ khóa học trực tuyến",
            description: "Tỉ lệ khóa học có hỗ trợ học tập trực tuyến",
            value: 72.8,
            threshold: 90,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-04-01"),
                type: 3,
                total: 100,
                value: 45,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-06-01"),
                type: 3,
                total: 100,
                value: 55,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-08-01"),
                type: 3,
                total: 100,
                value: 65,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-10-01"),
                type: 3,
                total: 100,
                value: 72.8,
                content: "Tất cả đơn vị",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    categoryCode: 6,
    criteria: [
      {
        id: 13,
        type: 1,
        isPass: true,
        title: "Hợp tác quốc tế trong đào tạo",
        content: "Đánh giá hiệu quả hoạt động hợp tác quốc tế trong đào tạo",
        criteriaProgress: 100,
        dateStart: new Date("2023-01-01"),
        dateEnd: new Date("2023-12-31"),
        dateComplete: new Date("2023-12-28"),
        targetDepartment: ["Phòng Hợp tác quốc tế", "Các Khoa"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Giám hiệu", "Bộ GD&ĐT"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 3,
            name: "Số chương trình liên kết quốc tế",
            description: "Số chương trình đào tạo liên kết với đối tác quốc tế",
            value: 8,
            threshold: 5,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 2,
                total: 5,
                value: 2,
                content: "Phòng Hợp tác quốc tế",
              },
              {
                date: new Date("2023-04-01"),
                type: 2,
                total: 5,
                value: 4,
                content: "Phòng Hợp tác quốc tế",
              },
              {
                date: new Date("2023-08-01"),
                type: 2,
                total: 5,
                value: 6,
                content: "Phòng Hợp tác quốc tế",
              },
              {
                date: new Date("2023-12-28"),
                type: 2,
                total: 5,
                value: 8,
                content: "Phòng Hợp tác quốc tế",
              },
            ],
          },
          {
            id: 2,
            type: 3,
            name: "Số lượng sinh viên trao đổi",
            description:
              "Số lượng sinh viên tham gia chương trình trao đổi quốc tế",
            value: 145,
            threshold: 100,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 3,
                total: 100,
                value: 50,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-04-01"),
                type: 3,
                total: 100,
                value: 90,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-08-01"),
                type: 3,
                total: 100,
                value: 120,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-12-28"),
                type: 3,
                total: 100,
                value: 145,
                content: "Các Khoa",
              },
            ],
          },
        ],
      },
      {
        id: 14,
        type: 1,
        isPass: false,
        title: "Hợp tác quốc tế trong nghiên cứu",
        content:
          "Đánh giá hiệu quả hoạt động hợp tác quốc tế trong nghiên cứu khoa học",
        criteriaProgress: 100,
        dateStart: new Date("2023-01-01"),
        dateEnd: new Date("2023-12-31"),
        dateComplete: new Date("2023-12-30"),
        targetDepartment: ["Phòng Hợp tác quốc tế", "Phòng KHCN"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Giám hiệu", "Bộ GD&ĐT"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 3,
            name: "Số dự án nghiên cứu quốc tế",
            description: "Số dự án nghiên cứu hợp tác quốc tế đang triển khai",
            value: 4,
            threshold: 8,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 2,
                total: 8,
                value: 1,
                content: "Phòng Hợp tác quốc tế",
              },
              {
                date: new Date("2023-04-01"),
                type: 2,
                total: 8,
                value: 2,
                content: "Phòng Hợp tác quốc tế",
              },
              {
                date: new Date("2023-08-01"),
                type: 2,
                total: 8,
                value: 3,
                content: "Phòng Hợp tác quốc tế",
              },
              {
                date: new Date("2023-12-30"),
                type: 2,
                total: 8,
                value: 4,
                content: "Phòng Hợp tác quốc tế",
              },
            ],
          },
          {
            id: 2,
            type: 3,
            name: "Số bài báo đồng tác giả quốc tế",
            description: "Số bài báo có đồng tác giả quốc tế",
            value: 28,
            threshold: 40,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 3,
                total: 40,
                value: 10,
                content: "Phòng KHCN",
              },
              {
                date: new Date("2023-04-01"),
                type: 3,
                total: 40,
                value: 18,
                content: "Phòng KHCN",
              },
              {
                date: new Date("2023-08-01"),
                type: 3,
                total: 40,
                value: 25,
                content: "Phòng KHCN",
              },
              {
                date: new Date("2023-12-30"),
                type: 3,
                total: 40,
                value: 28,
                content: "Phòng KHCN",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    categoryCode: 8,
    criteria: [
      {
        id: 15,
        type: 1,
        isPass: true,
        title: "Hoạt động hỗ trợ sinh viên",
        content: "Đánh giá hiệu quả của các hoạt động hỗ trợ sinh viên",
        criteriaProgress: 100,
        dateStart: new Date("2023-07-01"),
        dateEnd: new Date("2023-08-31"),
        dateComplete: new Date("2023-08-29"),
        targetDepartment: [
          "Phòng Công tác Sinh viên",
          "Đoàn Thanh niên",
          "Hội Sinh viên",
        ],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Giám hiệu", "Đoàn Thanh niên"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ sinh viên tham gia hoạt động ngoại khóa",
            description:
              "Tỉ lệ sinh viên tham gia ít nhất 1 hoạt động ngoại khóa/năm",
            value: 78.5,
            threshold: 70,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-06-01"),
                type: 1,
                value: 60,
                content: "Phòng Công tác Sinh viên",
              },
              {
                date: new Date("2023-07-01"),
                type: 1,
                value: 68,
                content: "Phòng Công tác Sinh viên",
              },
              {
                date: new Date("2023-08-15"),
                type: 1,
                value: 75,
                content: "Phòng Công tác Sinh viên",
              },
              {
                date: new Date("2023-09-29"),
                type: 1,
                value: 78.5,
                content: "Phòng Công tác Sinh viên",
              },
            ],
          },
          {
            id: 2,
            type: 3,
            name: "Số câu lạc bộ sinh viên",
            description:
              "Số lượng câu lạc bộ sinh viên đang hoạt động hiệu quả",
            value: 25,
            threshold: 20,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-06-01"),
                type: 3,
                total: 20,
                value: 18,
                content: "Đoàn Thanh niên",
              },
              {
                date: new Date("2023-07-15"),
                type: 3,
                total: 20,
                value: 20,
                content: "Đoàn Thanh niên",
              },
              {
                date: new Date("2023-08-15"),
                type: 3,
                total: 20,
                value: 22,
                content: "Đoàn Thanh niên",
              },
              {
                date: new Date("2023-09-29"),
                type: 3,
                total: 25,
                value: 20,
                content: "Đoàn Thanh niên",
              },
            ],
          },
        ],
      },
      {
        id: 16,
        type: 1,
        isPass: true,
        title: "Hoạt động tư vấn và hỗ trợ việc làm",
        content:
          "Đánh giá hiệu quả hoạt động tư vấn và hỗ trợ việc làm cho sinh viên",
        criteriaProgress: 100,
        dateStart: new Date("2023-01-01"),
        dateEnd: new Date("2023-12-31"),
        dateComplete: new Date("2023-6-31"),
        targetDepartment: ["Trung tâm Hỗ trợ việc làm", "Các Khoa"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Giám hiệu", "Hội Cựu sinh viên"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 2,
            name: "Tỉ lệ sinh viên có việc làm sau 6 tháng tốt nghiệp",
            description: "Tỉ lệ sinh viên có việc làm sau 6 tháng tốt nghiệp",
            value: 92.8,
            threshold: 85,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 3,
                total: 85,
                value: 70,
                content: "Trung tâm Hỗ trợ việc làm",
              },
              {
                date: new Date("2023-04-01"),
                type: 3,
                total: 85,
                value: 80,
                content: "Trung tâm Hỗ trợ việc làm",
              },
              {
                date: new Date("2023-08-01"),
                type: 3,
                total: 85,
                value: 88,
                content: "Trung tâm Hỗ trợ việc làm",
              },
              {
                date: new Date("2023-12-30"),
                type: 3,
                total: 85,
                value: 92.8,
                content: "Trung tâm Hỗ trợ việc làm",
              },
            ],
          },
          {
            id: 2,
            type: 3,
            name: "Số doanh nghiệp tham gia ngày hội việc làm",
            description: "Số lượng doanh nghiệp tham gia ngày hội việc làm",
            value: 85,
            threshold: 70,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 3,
                total: 70,
                value: 60,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-04-01"),
                type: 3,
                total: 70,
                value: 70,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-08-01"),
                type: 3,
                total: 70,
                value: 75,
                content: "Các Khoa",
              },
              {
                date: new Date("2023-12-30"),
                type: 3,
                total: 70,
                value: 85,
                content: "Các Khoa",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    categoryCode: 9,
    criteria: [
      {
        id: 17,
        type: 1,
        isPass: true,
        title: "Trách nhiệm xã hội",
        content:
          "Đánh giá các hoạt động thể hiện trách nhiệm xã hội của nhà trường",
        criteriaProgress: 100,
        dateStart: new Date("2023-01-01"),
        dateEnd: new Date("2023-12-31"),
        dateComplete: new Date("2023-12-15"),
        targetDepartment: ["Tất cả đơn vị"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Giám hiệu", "Công đoàn"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 3,
            name: "Số hoạt động cộng đồng",
            description: "Số hoạt động phục vụ cộng đồng được tổ chức",
            value: 18,
            threshold: 15,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 3,
                total: 15,
                value: 10,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-04-01"),
                type: 3,
                total: 15,
                value: 13,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-08-01"),
                type: 3,
                total: 15,
                value: 15,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-12-30"),
                type: 3,
                total: 18,
                value: 18,
                content: "Tất cả đơn vị",
              },
            ],
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ sinh viên tham gia hoạt động tình nguyện",
            description:
              "Tỉ lệ sinh viên tham gia ít nhất 1 hoạt động tình nguyện/năm",
            value: 68.5,
            threshold: 60,
            isPass: true,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 1,
                value: 50,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-04-01"),
                type: 1,
                value: 55,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-08-01"),
                type: 1,
                value: 60,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-12-30"),
                type: 1,
                value: 68.5,
                content: "Tất cả đơn vị",
              },
            ],
          },
        ],
      },
      {
        id: 18,
        type: 1,
        isPass: false,
        title: "Phát triển bền vững",
        content: "Đánh giá các hoạt động phát triển bền vững của nhà trường",
        criteriaProgress: 85,
        dateStart: new Date("2023-01-01"),
        dateEnd: new Date("2023-12-31"),
        dateComplete: null,
        targetDepartment: ["Ban Quản lý cơ sở vật chất", "Tất cả đơn vị"],
        targetCurriculum: ["Tất cả các chương trình"],
        inspectors: ["Ban Giám hiệu", "Trung tâm Môi trường"],
        chartType: 1,
        criteriaDetails: [
          {
            id: 1,
            type: 4,
            name: "Chứng nhận môi trường xanh",
            description: "Có chứng nhận trường học xanh - sạch - đẹp",
            value: 1,
            threshold: 2,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 2,
                total: 1,
                value: 0,
                content: "Ban Quản lý cơ sở vật chất",
              },
              {
                date: new Date("2023-06-01"),
                type: 2,
                total: 1,
                value: 1,
                content: "Ban Quản lý cơ sở vật chất",
              },
              {
                date: new Date("2024-01-02"),
                type: 2,
                total: 1,
                value: 1,
                content: "Ban Quản lý cơ sở vật chất",
              },
            ],
          },
          {
            id: 2,
            type: 2,
            name: "Tỉ lệ tiết kiệm năng lượng",
            description: "Tỉ lệ tiết kiệm năng lượng so với năm trước",
            value: 12.5,
            threshold: 13,
            isPass: false,
            progressHistory: [
              {
                date: new Date("2023-01-01"),
                type: 1,
                value: 5,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-04-01"),
                type: 1,
                value: 7,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2023-08-01"),
                type: 1,
                value: 10,
                content: "Tất cả đơn vị",
              },
              {
                date: new Date("2024-01-02"),
                type: 1,
                value: 12.5,
                content: "Tất cả đơn vị",
              },
            ],
          },
        ],
      },
    ],
  },
];
