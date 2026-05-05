import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const menuData: I_BasicAppShell_LinkItem[] = [
  {
    label: "Dashboard",
    link: "dashboard"
  },
  {
    label: "Danh mục hệ thống",
    link: "menu/system",
  },
  {
    label: "Quản lí hệ thống",
    links: [
      { pageId: 1, name: "Account management", label: "Quản lí tài khoản", link: "accountManagement" },
      { pageId: 2, name: "Access control level", label: "Phân quyền cấp đơn vị", link: "accessControlLevel" },
      { pageId: 3, name: "Access control", label: "Phân quyền sử dụng", link: "accessControl" },
      { pageId: 4, name: "Security regulations", label: "Quy định an toàn/ bảo mật thông tin", link: "securityPolicyDocs" },
      { pageId: 5, name: "System updates", label: "Thông tin xây dựng, cải tiến, bảo trì hệ thống", link: "systemUpdateDocs" },
      { pageId: 6, name: "User guide", label: "Tài liệu hướng dẫn sử dụng", link: "userGuideDocs" },
    ],
  },
  {
    label: "Văn bản - Quy định",
    links: [
      { pageId: 7, name: "Organizational regulations", label: "Văn bản - Quy định tổ chức", link: "core26965" },
      { pageId: 8, name: "Workflow process", label: "Quy trình xử lý công việc", link: "core27311" },
      { pageId: 9, name: "Form templates", label: "Tài liệu biểu mẫu", link: "core12196" },
    ],
  },

  {
    label: "Quản lý chương trình đào tạo",
    links: [
      { label: "Định nghĩa dữ liệu Chương trình đào tạo", link: "menu/grade-subject" },
      { pageId: 618, name: "Training program", label: "Chương trình đào tạo", link: "hlnya90qi9" },
      {
        label: "Chuẩn đầu ra chương trình đào tạo",
        links: [
          { pageId: 619, name: "Program Learning Outcomes", label: "Chuẩn đầu ra chương trình đào tạo (PLO)", link: "lz8rrabyws" },
          { pageId: 501, name: "Course AMRI", label: "Ma trân quan hệ AMRI giữa môn học và PI", link: "curriculum/AMRI" },
          { pageId: 620, name: "Course Learning Outcomes", label: "Chuẩn đầu ra môn học (CLO)", link: "upgwbnmsn8" },
          { pageId: 620, name: "CLO PI relation matrix", label: "Ma trận quan hệ CLO và PI", link: "CLOPIRelationMatrix" },
          { pageId: 621, name: "CLO PIs relation", label: "Ma trận tỷ trọng CLO và PI", link: "hxrvhadcfm" },
        ],
      },
    ],
  },
  // {
  //   //cũ
  //   label: "Quản lý chương trình đào tạo ",
  //   links: [
  //     {
  //       label: "Định nghĩa dữ liệu",
  //       links: [
  //         { pageId: 609, name: "Training Level Catalog", label: "Danh mục bậc đào tạo", link: "vf2cwmibmh" },
  //         { pageId: 610, name: "Training systems Catalog", label: "Danh mục hệ đào tạo", link: "4hi65qkj5n" },
  //         { pageId: 611, name: "Regulation Catalog", label: "Danh mục quy chế", link: "j9ul1u9c2n" },
  //         { pageId: 612, name: "Degree levels Catalog", label: "Danh mục bậc hệ", link: "zvib1md6z9" },
  //         { pageId: 613, name: "Program Catalog", label: "Danh mục chương trình", link: "h7op7f4nav" },
  //         { pageId: 614, name: "Grade Catalog", label: "Danh mục Khóa", link: "ukagvjhxgy" },
  //         { pageId: 615, name: "Subject group Catalog", label: "Danh mục nhóm môn học", link: "zudcgcvda8" },
  //         { pageId: 616, name: "Subject Catalog", label: "Danh mục môn học", link: "rdrmqcfvux" },
  //         { pageId: 617, name: "Subject group MIT", label: "Quan hệ nhóm môn học và thang MIT", link: "subjectGroup/subjectGroupMIT" },
  //       ],
  //     },
  //     {
  //       label: "Chương trình đào tạo",
  //       links: [
  //         { pageId: 618, name: "Training program", label: "Chương trình đào tạo", link: "hlnya90qi9" },
  //         { pageId: 619, name: "Program Learning Outcomes", label: "Chuẩn đầu ra chương trình đào tạo (PLO)", link: "lz8rrabyws" },
  //         { pageId: 501, name: "Course AMRI", label: "Ma trân quan hệ AMRI giữa môn học và PI", link: "curriculum/AMRI" },
  //         { pageId: 502, name: "MIT and PIs Measurement Matrix", label: "Ma trận mức độ đo MIT và Pis", link: "MitPiMatrix", },
  //         { pageId: 620, name: "Course Learning Outcomes", label: "Chuẩn đầu ra môn học (CLO)", link: "upgwbnmsn8" },
  //         { pageId: 620, name: "CLO PI relation matrix", label: "Ma trận quan hệ CLO và PI", link: "CLOPIRelationMatrix" },
  //         { pageId: 621, name: "CLO PIs relation", label: "Ma trận tỷ trọng CLO và PI", link: "hxrvhadcfm" },
  //       ],
  //     },
  //   ],
  // },
  {
    label: "Khung đo lường CĐR CTĐT ",
    links: [
      { pageId: 623, name: "Core courses measuring PLOs", label: "Danh mục môn học cốt lõi đo lường CĐR CTĐT", link: "t5sip6yyka" },
      { pageId: 624, name: "PLO measurement framework", label: "Khung đo lường CĐR CTĐT", link: "PLOFramework/PLOCoreSubject" },
      { pageId: 503, name: "Evaluation unit assignment", label: "Phân công đơn vị đánh giá", link: "rb55trm19d", status: "Prototype" },

      {
        pageId: 625, name: "PLO measurement by CLOs", label: "Đo lường CĐR CTĐT theo CĐR môn học", link: "PLOFramework/coreSubject/createCourseSection"
      },
      { pageId: 646, name: "CLO Formula", label: "Công thức tính CLO thành phần theo Khóa", link: "CLOFormulaByGrade" },
    ],
  },
  {
    label: "Xây dựng kế hoạch đo lường CĐR CTĐT ",
    links: [
      { pageId: 626, name: "Unit PLO assessment plan", label: "Kế hoạch đo chuẩn đầu ra theo đơn vị", link: "afqdc7uf8b" },
      { pageId: 627, name: "Program PLO assessment plan", label: "Kế hoạch đo chuẩn đầu ra theo CTĐT", link: "g2", status: "Menu" },
    ],
  },
  {
    label: "Đánh giá kết quả học tập môn học ",
    links: [
      {
        label: "Đánh giá CLO môn học ",
        links: [
          // { pageId: 628, name: "Course required competencies", label: "Năng lực yêu cầu của môn học", link: "licl7ube7d" },
          { pageId: 629, name: "CLO assessment methods", label: "Phương pháp đánh giá CLO", link: "subjectAssessment/CLOAssessment/config" },
          { pageId: 630, name: "Exam structure", label: "Cấu trúc đề thi", link: "vq720hj9jx" },
        ],
      },
      {
        label: "Dữ liệu điểm sinh viên đánh giá ",
        links: [
          { pageId: 631, name: "Student database", label: "Cơ sở dữ liệu sinh viên", link: "4ltk4f68a8" },
          { pageId: 504, name: "Course sections", label: "Danh sách nhóm học", link: "subjectAssessment/studentAssessmentData/courseSectionList" },
          { pageId: 632, name: "Student course registration", label: "Sinh viên đăng ký môn học", link: "nugmpmukta" },
          { pageId: 517, name: "Distribute CourseSection CLO point", label: "Tách điểm CLO thành phần theo nhóm học", link: "subjectAssessment/studentAssessmentData/CLO-point-distribution" },
          { pageId: 633, name: "CourseSection CLO point record", label: "Nhập điểm CLO theo nhóm học", link: "subjectAssessment/studentAssessmentData/courseSectionPointRecord" },
          { pageId: 634, name: "Student point record", label: "Nhập điểm theo từng sinh viên", link: "subjectAssessment/studentAssessmentData/studentPointRecord" },
        ],
      },
      {
        label: "Tổng hợp điểm CLO môn học ",
        links: [
          { pageId: 505, name: "Class CLO grade summary", label: "Tổng hợp điểm CLO môn học", link: "0idfgkxsu8" },
          { pageId: 635, name: "Class CLO grade summary Class", label: "Tổng hợp điểm CLO môn học theo lớp", link: "fgmpowiqop" },
          // { pageId: 636, name: "Course wide CLO chart", label: "Biểu đồ CLO toàn môn học", link: "6cnw99q4zo", status: "Prototype" },
          { pageId: 0, name: "", label: "Kết quả đo lường CLO từng sinh viên", link: "CLOResultByStudentReport" },
          { pageId: 0, name: "", label: "Kết quả đo lường CLO từng lớp", link: "CLOResultByClassReport" },
          { pageId: 0, name: "", label: "Kết quả đo lường CLO sinh viên - lớp", link: "CLOResultByStudentClassReport" },
        ],
      },
    ],
  },

  { label: "Triển khai kế hoạch đo lường CĐR CTĐT ", link: "zz2", status: "Menu" },
  {
    label: "Kết quả thực hiện đo lường CĐR CTĐT ",
    link: "8",
    links: [
      { pageId: 0, name: "", label: "Kết quả đo lường PLO từng sinh viên", link: "PLOResultByStudentReport" },
      { pageId: 0, name: "", label: "Kết quả đo lường PLO từng lớp", link: "PLOResultByClassReport" },
      { pageId: 0, name: "", label: "Kết quả đo lường PLO sinh viên - Lớp", link: "PLO-result/class/student-report" },
      { pageId: 0, name: "", label: "Kết quả đo lường PLO từng Khóa", link: "PLO-result/grade/gradeReport" },
      { pageId: 0, name: "", label: "Kết quả đo lường PLO sinh viên - Khóa", link: "PLO-result/grade/student-report" },




      // { pageId: 637, name: "Program wide PLO summary", label: "Tổng hợp PLO toàn khóa", link: "5bmex2c6in", status: "Prototype" },
      // { pageId: 638, name: "PLO achievement report", label: "Báo cáo kết quả đo lường mức độ đạt CĐR CTĐT", link: "jsnsipqfgt", status: "Prototype" },
      // { pageId: 639, name: "Unit PLO achievement report", label: "Báo cáo kết quả đo lường mức độ đạt CĐR Đơn vị", link: "qgpxxmcfjh", status: "Prototype" },
    ],
  },
  {
    label: "Phiếu điểm sinh viên",
    links: [
      { pageId: 509, name: "", label: "Phiếu điểm CLO thành phần", link: "CLOAssessmentReport", linkPrototype: "q3x55ki7tf", },
      { pageId: 510, name: "", label: "Phiếu điểm CLO môn học", link: "CLOSubjectReports" },
      { pageId: 511, name: "", label: "Phiếu điểm CLO học kỳ", link: "CLOSemesterReports" },
      { pageId: 512, name: "", label: "Phiếu điểm CLO năm học", link: "CLOSchoolYearReports" },
      { pageId: 513, name: "", label: "Phiếu điểm CLO toàn khóa", link: "CLOScoreReportByGrade", linkPrototype: "87t6bafsy3" },
    ]
  },
  { pageId: 514, label: "Báo cáo và đề xuất cải tiến ", link: "i1", status: "Menu", },
  { pageId: 515, label: "Họp hội đồng đo lường CĐR CTĐT ", link: "j1", status: "Menu", },
  // {
  //   label: "Danh mục hệ thống (cũ)",
  //   links: [
  //     { name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
  //     { name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig", status: "Default" },
  //     { name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContentConfig" },
  //     { name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },
  //     { pageId: 640, name: "Unit list", label: "Danh mục đơn vị", link: "14w3vwnnfy" },
  //     { pageId: 506, name: "", label: "Công thức tính CLO thành phần theo Khóa", link: "z70ague3oa" },
  //     { pageId: 641, name: "MIT scale", label: "Thang đo MIT", link: "umg0mq7o3x" },
  //     { pageId: 642, name: "Rubric scale", label: "Thang đo Rubrics", link: "fmc2n1ftq1" },
  //     { pageId: 643, name: "PLO ranking table", label: "Bảng xếp loại PLO", link: "f0oia066vb", },
  //     { pageId: 644, name: "Academic year list", label: "Danh mục năm học", link: "omhcfkliwa" },
  //     { pageId: 645, name: "Academic year semester list", label: "Danh mục năm học học kỳ", link: "cw38zkpvg4" },
  //     { pageId: 645, name: "Human Resources", label: "Danh mục nhân sự", link: "StaffCategory" },],
  // },
  {
    label: "Cấu hình hệ thống",
    links: [
      { name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
      { name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig", status: "Default" },
      { name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContentConfig" },
      { name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },
      { label: "Danh mục hệ thống", link: "menu/system" },
    ],
  },
];
