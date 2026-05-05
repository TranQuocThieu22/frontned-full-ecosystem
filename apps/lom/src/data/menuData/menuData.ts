import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";
import { menuDataObject } from "@aq-fe/core-ui/shared/consts/object/menuDataObject";
import { AppPage } from "../enum/app-page.enum";

export const menuData: I_BasicAppShell_LinkItem[] | any = [
  {
    name: "Dashboard", label: "Dashboard", link: "admin-dashboard",
    pageId: AppPage.LOMAdminDashboard, pageEnum: AppPage[AppPage.LOMAdminDashboard], route: "admin-dashboard", nameVI: "Dashboard", nameEN: "Dashboard",
  },
  {
    name: "COE System configuration menu", label: "Danh mục hệ thống", link: "menu/lom-system-data",
    pageId: AppPage.LOMSystemDataMenuList, pageEnum: AppPage[AppPage.LOMSystemDataMenuList],
    route: "menu/lom-system-data",
    nameVI: "Danh mục hệ thống", nameEN: "LOM Data Menu List",
  },
  menuDataObject.managementSystem(),
  menuDataObject.documentManagement(),
  {
    label: "Quản lý chương trình đào tạo",
    links: [
      {
        name: "Define Training Program Data", label: "Định nghĩa dữ liệu Chương trình đào tạo", link: "menu/curriculum-predefined-data",
        pageId: AppPage.CurriculumpPredefinedDataMenuList, pageEnum: AppPage[AppPage.CurriculumpPredefinedDataMenuList],
        route: "menu/curriculum-predefined-data",
        nameVI: "Định nghĩa dữ liệu Chương trình đào tạo", nameEN: "Define curriculum master data"
      },
      {
        name: "Training Program", label: "Chương trình đào tạo", link: "curriculum/setup",
        pageId: AppPage.CurriculumSetup, pageEnum: AppPage[AppPage.CurriculumSetup],
        route: "curriculum/setup",
        nameVI: "Chương trình đào tạo", nameEN: "Setup curriculum",
      },
      {
        name: "Training Program", label: "Phân quyền quản lý CĐR chương trình", link: "curriculum/delegate",
        pageId: AppPage.PLODelegate, pageEnum: AppPage[AppPage.PLODelegate],
        route: "curriculum/delegate",
        nameVI: "Phân quyền quản lý CĐR chương trình", nameEN: "Delegate PLO management",
      },
      {
        label: "Chuẩn đầu ra chương trình đào tạo",
        links: [
          {
            name: "Program Learning Outcomes", label: "Chuẩn đầu ra chương trình đào tạo (PLO)", link: "PLO-assessment/PLO",
            pageId: AppPage.PLOData, pageEnum: AppPage[AppPage.PLOData],
            route: "PLO-assessment/PLO",
            nameVI: "Chuẩn đầu ra chương trình đào tạo", nameEN: "Manage PLO data",
          },
          {
            name: "Course AIRM", label: "Ma trân quan hệ IRM giữa môn học và PI", link: "PLO-assessment/AIRM",
            pageId: AppPage.SubjectPIAIRMMatrix, pageEnum: AppPage[AppPage.SubjectPIAIRMMatrix],
            route: "PLO-assessment/AIRM",
            nameVI: "Ma trận quan hệ IRM giữa môn học và PI", nameEN: "Subject PI AIRM Matrix",
          },
          {
            name: "Course Learning Outcomes", label: "Chuẩn đầu ra môn học (CLO)", link: "CLO-assessment/CLO",
            pageId: AppPage.CLOData, pageEnum: AppPage[AppPage.CLOData],
            route: "CLO-assessment/CLO",
            nameVI: "Chuẩn đầu ra môn học (CLO)", nameEN: "Manage CLO data",
          },
          {
            name: "CLO PI Relation Matrix", label: "Ma trận quan hệ CLO và PI", link: "CLO-assessment/CLO-PI-matrix",
            pageId: AppPage.CLOPIMatrix, pageEnum: AppPage[AppPage.CLOPIMatrix],
            route: "CLO-assessment/CLO-PI-matrix",
            nameVI: "Ma trận quan hệ CLO và PI", nameEN: "CLO PI Matrix",
          },
          {
            name: "CLO PIs Relation", label: "Ma trận tỷ trọng CLO và PI", link: "CLO-assessment/CLO-PI-proportion-matrix",
            pageId: AppPage.CLOPIProportionMatrix, pageEnum: AppPage[AppPage.CLOPIProportionMatrix],
            route: "CLO-assessment/CLO-PI-proportion-matrix",
            nameVI: "Ma trận tỷ trọng CLO và PI", nameEN: "CLO PI Proportion Matrix",
          },
        ],
      },
    ],
  },
  {
    label: "Khung đo lường CĐR CTĐT ",
    links: [
      {
        name: "Core Courses Measuring PLOs", label: "Danh mục môn học cốt lõi đo lường CĐR CTĐT", link: "CLO-assessment/core-subject",
        pageId: AppPage.CoreSubjectData, pageEnum: AppPage[AppPage.CoreSubjectData],
        route: "CLO-assessment/core-subject",
        nameVI: "Danh mục môn học cốt lõi đo lường CĐR CTĐT", nameEN: "Manage core subject data",
      },
      {
        name: "PLO Measurement Framework", label: "Khung đo lường CĐR CTĐT", link: "CLO-assessment/CLO-PI-proportion-matrix/review",
        pageId: AppPage.ReviewCLOPIProportionMatrix, pageEnum: AppPage[AppPage.ReviewCLOPIProportionMatrix],
        route: "CLO-assessment/CLO-PI-proportion-matrix/review",
        nameVI: "Khung đo lường CĐR CTĐT", nameEN: "Review CLO PI proportion matrix",

      },
      {
        name: "Evaluation Unit Assignment", label: "Phân công đơn vị đánh giá", link: "CLO-assessment/assign-evaluation-unit",
        pageId: AppPage.AssignEvaluationUnit, pageEnum: AppPage[AppPage.AssignEvaluationUnit],
        route: "CLO-assessment/assign-evaluation-unit",
        nameVI: "Phân công đơn vị đánh giá", nameEN: "Assign evaluation unit",
      },
      // {
      //   //old name: Đo lường CĐR CTĐT theo CĐR môn học
      //   name: "PLO Measurement By CLOs", label: "Tạo danh sách nhóm học", link: "course-section/create-multiple",
      //   pageId: AppPage.CreateMultipleCourseSections, pageEnum: AppPage[AppPage.CreateMultipleCourseSections], route: "course-section/create-multiple", nameVI: "Tạo danh sách nhóm học", nameEN: "Create multiple course sections",
      // },
      {
        name: "CLO Formula", label: "Công thức tính CLO thành phần theo Khóa", link: "PLO-assessment/CLO-formula-setting",
        pageId: AppPage.CLOFormulaSetting, pageEnum: AppPage[AppPage.CLOFormulaSetting],
        route: "PLO-assessment/CLO-formula-setting",
        nameVI: "Công thức tính CLO thành phần theo Khóa", nameEN: "CLO Formula Setting",
      },
    ],
  },
  // {
  //   label: "Xây dựng kế hoạch đo lường CĐR CTĐT",
  //   links: [
  //     {
  //       name: "Unit PLO Assessment Plan", label: "Kế hoạch đo chuẩn đầu ra theo đơn vị", link: "PLO-assessment/PLO-assessment-plan",
  //       pageId: AppPage.PLOAssessmentPlan, pageEnum: AppPage[AppPage.PLOAssessmentPlan],
  //       route: "PLO-assessment/PLO-assessment-plan",
  //       nameVI: "Kế hoạch đo chuẩn đầu ra theo đơn vị", nameEN: "PLO assessment plan",
  //     },
  //   ],
  // },
  {
    label: "Đánh giá kết quả học tập môn học ",
    links: [
      {
        label: "Đánh giá CLO môn học ",
        links: [
          {
            name: "CLO Assessment Methods", label: "Phương pháp đánh giá CLO", link: "CLO-assessment/CLO-configuration/config",
            pageId: AppPage.CLOConfiguration, pageEnum: AppPage[AppPage.CLOConfiguration],
            route: "CLO-assessment/CLO-configuration/config",
            nameVI: "Phương pháp đánh giá CLO", nameEN: "CLO Configuration",
          },
          {
            name: "Exam Structure", label: "Cấu trúc đề thi", link: "CLO-assessment/CLO-configuration/review",
            pageId: AppPage.ReviewCLOConfiguration, pageEnum: AppPage[AppPage.ReviewCLOConfiguration],
            route: "CLO-assessment/CLO-configuration/review",
            nameVI: "Cấu trúc đề thi", nameEN: "Review CLO Configuration",
          },
        ],
      },
      {
        label: "Dữ liệu điểm sinh viên đánh giá ",
        links: [
          {
            name: "Student Database", label: "Danh mục lớp", link: "classes",
            pageId: AppPage.ClassData, pageEnum: AppPage[AppPage.ClassData],
            route: "classes",
            nameVI: "Danh mục lớp", nameEN: "Manage class data",
          },
          {
            name: "Class Activity Plan Database", label: "Danh sách lớp học kỳ", link: "class-activity-plans",
            pageId: AppPage.ClassData, pageEnum: AppPage[AppPage.ClassData],
            route: "classes",
            nameVI: "Danh sách lớp học kỳ", nameEN: "Manage activity plan class data",
          },
          // {
          //   //old name: Đo lường CĐR CTĐT theo CĐR môn học
          //   name: "PLO Measurement By CLOs", label: "Tạo danh sách nhóm học", link: "course-section/create-multiple",
          //   pageId: AppPage.CreateMultipleCourseSections, pageEnum: AppPage[AppPage.CreateMultipleCourseSections],
          //   route: "course-section/create-multiple",
          //   nameVI: "Tạo danh sách nhóm học", nameEN: "Create multiple course sections",
          // },
          {
            name: "Course Sections", label: "Danh sách nhóm học", link: "course-section",
            pageId: AppPage.CourseSectionData, pageEnum: AppPage[AppPage.CourseSectionData],
            route: "course-section",
            nameVI: "Danh sách nhóm học", nameEN: "Manage course section data",
          },
          {
            name: "Student Course Registration", label: "Sinh viên đăng ký nhóm môn học", link: "course-section/registration",
            pageId: AppPage.CourseSectionRegistration, pageEnum: AppPage[AppPage.CourseSectionRegistration],
            route: "course-section/registration",
            nameVI: "Sinh viên đăng ký nhóm môn học", nameEN: "Course section registration",
          },
          {
            name: "Distribute CourseSection CLO Point", label: "Tách điểm CLO thành phần theo nhóm môn học", link: "grade/migrate",
            pageId: AppPage.MigrateGrade, pageEnum: AppPage[AppPage.MigrateGrade],
            route: "grade/migrate",
            nameVI: "Tách điểm CLO thành phần theo nhóm môn học", nameEN: "Migrate previous student grades",
          },
          {
            name: "CourseSection CLO Point Record", label: "Nhập điểm CLO theo nhóm môn học", link: "grade/course-section-CLO-grading",
            pageId: AppPage.CLOGradingForCourseSection, pageEnum: AppPage[AppPage.CLOGradingForCourseSection],
            route: "grade/course-section-CLO-grading",
            nameVI: "Nhập điểm CLO theo nhóm môn học", nameEN: "CourseSection CLO grading",
          },
          {
            name: "Student Point Record", label: "Nhập điểm theo từng sinh viên", link: "grade/student-CLO-grading",
            pageId: AppPage.CLOGradingForStudent, pageEnum: AppPage[AppPage.CLOGradingForStudent],
            route: "grade/student-CLO-grading",
            nameVI: "Nhập điểm theo từng sinh viên", nameEN: "Student CLO grading",
          },
        ],
      },
      {
        label: "Tổng hợp điểm CLO môn học ",
        links: [
          {
            name: "Class CLO Grade Summary", label: "Tổng hợp điểm CLO môn học", link: "CLO-report/point/students-per-subject",
            pageId: AppPage.ReportCLOPointOfStudentsPerSubject, pageEnum: AppPage[AppPage.ReportCLOPointOfStudentsPerSubject],
            route: "CLO-report/point/students-per-subject",
            nameVI: "Tổng hợp điểm CLO môn học", nameEN: "CLO point report for all students per subject",
          },
          {
            name: "Class CLO Grade Summary Class", label: "Tổng hợp điểm CLO môn học theo lớp", link: "CLO-report/point/students-per-class",
            pageId: AppPage.ReportCLOPointOfStudentsPerClass, pageEnum: AppPage[AppPage.ReportCLOPointOfStudentsPerClass],
            route: "CLO-report/point/students-per-class",
            nameVI: "Tổng hợp điểm CLO môn học theo lớp", nameEN: "CLO point report for all students per class",
          },
          {
            name: "CLO Result By Student Report", label: "Kết quả đo lường CLO từng sinh viên", link: "CLO-report/result/single-student",
            pageId: AppPage.ReportCLOResultPerStudent, pageEnum: AppPage[AppPage.ReportCLOResultPerStudent],
            route: "CLO-report/result/single-student",
            nameVI: "Kết quả đo lường CLO từng sinh viên", nameEN: "CLO result report per single student",
          },
          {
            name: "CLO Result By Class Report", label: "Kết quả đo lường CLO từng lớp", link: "CLO-report/result-summary/class",
            pageId: AppPage.ReportCLOResultSummaryPerClass, pageEnum: AppPage[AppPage.ReportCLOResultSummaryPerClass],
            route: "CLO-report/result-summary/class",
            nameVI: "Kết quả đo lường CLO từng lớp", nameEN: "CLO result summary report per class",
          },
          {
            name: "CLO Result By Student Class Report", label: "Kết quả đo lường CLO sinh viên - lớp", link: "CLO-report/result/students-per-class",
            pageId: AppPage.ReportCLOResultOfStudentsPerClass, pageEnum: AppPage[AppPage.ReportCLOResultOfStudentsPerClass],
            route: "CLO-report/result/students-per-class",
            nameVI: "Kết quả đo lường CLO sinh viên - lớp", nameEN: "CLO result report of students per class",
          },
        ],
      },
    ],
  },
  {
    label: "Kết quả thực hiện đo lường CĐR CTĐT",
    links: [
      {
        name: "PLO Result By Student Report", label: "Kết quả đo lường PLO từng sinh viên", link: "PLO-report/result/single-student",
        pageId: AppPage.ReportPLOResultPerStudent, pageEnum: AppPage[AppPage.ReportPLOResultPerStudent],
        route: "PLO-report/result/single-student",
        nameVI: "Kết quả đo lường PLO từng sinh viên", nameEN: "PLO result report per single student",
      },
      {
        name: "PLO Result By Class Report", label: "Kết quả đo lường PLO từng lớp", link: "PLO-report/result-summary/class",
        pageId: AppPage.ReportPLOResultSummaryPerClass, pageEnum: AppPage[AppPage.ReportPLOResultSummaryPerClass],
        route: "PLO-report/result-summary/class",
        nameVI: "Kết quả đo lường PLO từng lớp", nameEN: "PLO result summary report per class",
      },
      {
        name: "PLO Result Student Class Report", label: "Kết quả đo lường PLO sinh viên - Lớp", link: "PLO-report/result/students-per-class",
        pageId: AppPage.ReportPLOResultOfStudentsPerClass, pageEnum: AppPage[AppPage.ReportPLOResultOfStudentsPerClass],
        route: "PLO-report/result/students-per-class",
        nameVI: "Kết quả đo lường PLO sinh viên - Lớp", nameEN: "PLO result report of students per class",
      },
      {
        name: "PLO Result By Grade Report", label: "Kết quả đo lường PLO từng Khóa", link: "PLO-report/result-summary/enrollment-batch",
        pageId: AppPage.ReportPLOResultSummaryPerEnrollmentBatch, pageEnum: AppPage[AppPage.ReportPLOResultSummaryPerEnrollmentBatch],
        route: "PLO-report/result-summary/enrollment-batch",
        nameVI: "Kết quả đo lường PLO từng Khóa", nameEN: "PLO result summary report per enrollment batch",
      },
      {
        name: "PLO Result Student Grade Report", label: "Kết quả đo lường PLO sinh viên - Khóa", link: "PLO-report/result/students-per-enrollment-batch",
        pageId: AppPage.ReportPLOResultOfStudentsPerEnrollmentBatch, pageEnum: AppPage[AppPage.ReportPLOResultOfStudentsPerEnrollmentBatch],
        route: "PLO-report/result/students-per-enrollment-batch",
        nameVI: "Kết quả đo lường PLO sinh viên - Khóa", nameEN: "PLO result report of students per enrollment batch",
      },
    ],
  },
  {
    label: "Phiếu điểm sinh viên",
    links: [
      {
        name: "CLO Component Score Sheet", label: "Phiếu điểm CLO thành phần", link: "CLO-report/point/student/by-assessment-phase", linkPrototype: "q3x55ki7tf",
        pageId: AppPage.ReportCLOPointOfStudentByAssessmentPhase, pageEnum: AppPage[AppPage.ReportCLOPointOfStudentByAssessmentPhase],
        route: "CLO-report/point/student/by-assessment-phase",
        nameVI: "Phiếu điểm CLO thành phần", nameEN: "CLO point report by assessment phase",
      },
      {
        name: "CLO Subject Score Sheet", label: "Phiếu điểm CLO môn học", link: "CLO-report/point/student/by-subject",
        pageId: AppPage.ReportCLOPointOfStudentBySubject, pageEnum: AppPage[AppPage.ReportCLOPointOfStudentBySubject],
        route: "CLO-report/point/student/by-subject",
        nameVI: "Phiếu điểm CLO môn học", nameEN: "CLO point report by subject",
      },
      {
        name: "CLO Semester Score Sheet", label: "Phiếu điểm CLO học kỳ", link: "CLO-report/point/student/by-semester",
        pageId: AppPage.ReportCLOPointOfStudentBySemester, pageEnum: AppPage[AppPage.ReportCLOPointOfStudentBySemester],
        route: "CLO-report/point/student/by-semester",
        nameVI: "Phiếu điểm CLO học kỳ", nameEN: "CLO point report by semester",
      },
      {
        name: "CLO School Year Score Sheet", label: "Phiếu điểm CLO năm học", link: "CLO-report/point/student/by-academic-year",
        pageId: AppPage.ReportCLOPointOfStudentByAcademicYear, pageEnum: AppPage[AppPage.ReportCLOPointOfStudentByAcademicYear],
        route: "CLO-report/point/student/by-academic-year",
        nameVI: "Phiếu điểm CLO năm học", nameEN: "CLO point report by academic year",
      },
      {
        name: "CLO Grade Score Sheet", label: "Phiếu điểm CLO toàn khóa", link: "CLO-report/point/student/by-enrollment-batch", linkPrototype: "87t6bafsy3",
        pageId: AppPage.ReportCLOPointOfStudentByEnrollmentBatch, pageEnum: AppPage[AppPage.ReportCLOPointOfStudentByEnrollmentBatch],
        route: "CLO-report/point/student/by-enrollment-batch",
        nameVI: "Phiếu điểm CLO toàn khóa", nameEN: "CLO point report by enrollment batch",
      },
    ]
  },
  {
    label: "Cấu hình hệ thống",
    links: [
      { pageId: 100003, name: "Page Content Config", label: "Danh mục Page Content", link: "pageContent" },
      { pageId: 100004, name: "Module Config", label: "Cấu hình thông tin chủ quản", link: "module-config" },
      { pageId: 100013, name: "Academic year", label: "Danh sách sinh viên học kỳ", link: "semester-student-list", },
      { pageId: 0, name: "Academic year", label: "Danh mục sinh viên", link: "studentList" },
      { pageId: 0, name: "Academic year", label: "Đồng bộ dữ liệu nền tảng", link: "platformDataSynchronization" },
      // { pageId: 100010, name: "Email Template", label: "Mẫu Mail thông báo", link: "email-template" },
      // { pageId: 100011, name: "Code config", label: "Danh mục bộ đếm", link: "codeFormula" },

      //other menu items (currently grouped in menu "Danh mục hệ thống")
      // {
      //   pageId: 100001, link: "admin/document-categories",
      //   name: "Document categories", label: "Danh mục loại văn bản"
      // },
      // {
      //   pageId: 100008, link: "admin/mail-config",
      //   name: "System Email config", label: "Danh mục cấu hình mail server"
      // },
      // {
      //   pageId: 100007, link: "admin/academic-year",
      //   name: "Academic year list", label: "Danh mục năm học"
      // },
      // {
      //   pageId: 100012, link: "admin/semester",
      //   name: "Academic year semester list", label: "Danh mục năm học học kỳ"
      // },
      // {
      //   pageId: 100006, link: "admin/department", name: "Unit list", label: "Danh mục đơn vị",
      // },
      // {
      //   pageId: AppPage.MITRatingSchemeData, link: "admin/umg0mq7o3x", name: "MIT scale", label: "Danh mục thang đo MIT",
      // },
      // {
      //   pageId: AppPage.RubricsData, link: "admin/rubrics",
      //   name: "Rubric scale", label: "Danh mục thang đo Rubrics"
      // },
      // {
      //   pageId: AppPage.PLORankingSystemData, link: "admin/f0oia066vb",
      //   name: "PLO ranking table", label: "Danh mục bảng xếp loại PLO"
      // },
      // {
      //   pageId: AppPage.StaffData, link: "admin/staff",
      //   name: "Human Resources", label: "Danh mục nhân sự"
      // },

      //other menu items (currently grouped in menu "Định nghĩa dữ liệu CTĐT")
      // { pageId: AppPage.EducationLevelData, label: "Danh mục bậc đào tạo" },
      // { pageId: AppPage.EducationFormatData, label: "Danh mục hệ đào tạo" },
      // { pageId: AppPage.ProgramFormatData, label: "Danh mục bậc hệ đào tạo" },
      // { pageId: AppPage.ProgramData, label: "Danh mục chương trình (ngành)" },
      // { pageId: AppPage.EducationRegulationData, label: "Danh mục quy chế/thông tư" },
      // { pageId: AppPage.SubjectGroupData, label: "Danh mục nhóm môn học" },
      // { pageId: AppPage.SubjectData, label: "Danh mục môn học" },
      // { pageId: AppPage.EnrollmentBatchData, label: "Danh mục khóa đào tạo" },
    ],
  },
];
