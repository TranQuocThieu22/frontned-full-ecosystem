import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const adminMenuData: I_BasicAppShell_LinkItem[] = [
    { pageId: 200, name: "Dashboard", label: "Dashboard", link: "dashboard" },
    // { pageId: 200, label: "Dashboard", link: "tx16lwup53", name: "Dashboard" },
    //kenh-phan-hoi/thuc-hien-cham-soc-khach-hang
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
            { pageId: 7, name: "Organizational regulations", label: "Văn bản - Quy định tổ chức", link: "organizationPolicyDocs" },
            { pageId: 8, name: "Workflow process", label: "Quy trình xử lý công việc", link: "workflowProcessDocs" },
            { pageId: 9, name: "Form templates", label: "Tài liệu biểu mẫu", link: "formTemplateDocs" },
        ],
    },

    {
        label: "Chương trình học",
        name: "Study Programs",
        links: [
            { pageId: 800, label: "Danh mục môn học", name: "Module List", link: "subject/subjectList" },
            { pageId: 801, label: "Danh mục chương trình học", name: "Program List", link: "programList" },
            { pageId: 802, label: "Cấu hình điểm của chương trình học", name: "Score Config", link: "scoreConfig" }
        ]
    },
    {
        label: "Khóa học",
        name: "Courses",
        links: [
            { pageId: 803, label: "Danh sách khóa học", name: "Course List", link: "course/courseList" }
        ]
    },
    {
        label: "Khóa thi",
        name: "Exams",
        links: [
            { pageId: 804, label: "Danh sách khóa thi", name: "Exam List", link: "exam/examList" }
        ]
    },
    {
        label: "Chính sách học phí",
        links: [
            { pageId: 805, label: "Khai báo đơn giá", name: "Tuition Policy", link: "priceConfig" },
        ]
    },
    {
        label: "Chính sách ưu đãi",
        name: "Discount Policies",
        links: [
            { pageId: 806, label: "Chiết khấu thanh toán", name: "Payment Discount", link: "paymentDiscount" },
            { pageId: 807, label: "Mã giảm giá", name: "Discount Codes", link: "discountCodeList" },
            { pageId: 8071, label: "Combo khuyến mãi", name: "Discount combo", link: "promotionComboList", status: "Prototype" },
            { pageId: 8072, label: "Giảm giá cá nhân", name: "", link: "personalDiscountList", status: "Prototype" }
        ]
    },
    {
        label: "Ghi danh và thu học phí/ lệ phí",
        name: "Enrollment Fees",
        links: [
            // {pageId: 216, label: "Ghi danh khóa học", name: "Course Enrollment", link: "7-1", status: "Prototype" },
            // {pageId: 217, label: "Ghi danh khóa thi", name: "Exam Enrollment", link: "7-2", status: "Prototype" },
            { pageId: 808, label: "Ghi danh và Thu phí", name: "Registration and payment", link: "registration/registrationAndPayment" },
            { pageId: 8501, label: "Công nợ học viên", name: "", link: "studentDebtList", status: "Prototype" },
            { pageId: 850, label: "Danh sách phiếu thu", name: "Receipt", link: "receiptList", status: "Prototype" },
            { pageId: 809, label: "Danh sách đăng ký khóa học", name: "Course Reg", link: "CourseRegistrationList" },
            {
                label: "Quản lý tình trạng đăng ký học",
                name: "",
                links: [
                    { pageId: 81111, label: "Xử lý dừng học", name: "", link: "manageDropouts", status: "Prototype" },
                    { pageId: 81211, label: "Xử lý học lại/ chuyển khóa", name: "", link: "studentCourseAdjustments", status: "Prototype" },
                    { pageId: 81221, label: "Danh sách quyết định khóa học", name: "", link: "courseApprovalDecisions", status: "Prototype" }
                ]
            },
            { pageId: 810, label: "Danh sách đăng ký khóa thi", name: "Exam Reg", link: "examRegister" },
            {
                label: "Quản lý tình trạng đăng ký thi",
                name: "",
                links: [
                    { pageId: 8111, label: "Xử lý dừng thi", name: "", link: "cancelExamParticipation", status: "Prototype" },
                    { pageId: 8121, label: "Xử lý ghép thi/ chuyển khóa", name: "", link: "examCourseAdjustments", status: "Prototype" },
                    { pageId: 8122, label: "Danh sách quyết định khóa thi", name: "", link: "examApprovalDecisions", status: "Prototype" }
                ]
            },
        ]
    },
    {
        label: "Học viên",
        name: "Students",
        links: [
            { pageId: 811, label: "Danh sách học viên", name: "Student List", link: "studentList" },
            { pageId: 812, label: "Hồ sơ học viên", name: "Student Profile", link: "thfkexfuki" }
        ]
    },
    {
        label: "Giảng viên",
        name: "Lecturers",
        links: [
            { pageId: 813, label: "Danh sách Giảng viên", name: "Lecturer List", link: "lecturerList" },
        ]
    },
    {
        label: "Tổ chức lớp học và xếp lịch học",
        name: "Class Scheduling",
        links: [
            { pageId: 814, label: "Xếp lớp cho học viên", name: "Class Arrangement", link: "assignStudentToCourseSection", },
            { pageId: 815, label: "Danh sách lớp", name: "View Classes", link: "courseSection/courseSectionList" },
            { pageId: 816, label: "Phân công giảng dạy cho lớp", name: "Teaching Assignment", link: "teachingAssignment", },
            { pageId: 817, label: "Gán phòng học ưu tiên cho lớp", name: "Assign Classroom", link: "assignPreferredRoom" },
            { pageId: 818, label: "Xếp lịch học", name: "Schedule Classes", link: "scheduleCourseSection" },
            { pageId: 819, label: "Xem lịch học toàn trung tâm", name: "View Schedule", link: "viewSchedule", status: "Prototype" }
        ]
    },
    {
        label: "Giám sát học tập",
        name: "Study Supervision",
        links: [
            { pageId: 820, label: "Xem lịch tuần học", name: "Weekly Schedule", link: "weeklySchedule" },
            { pageId: 821, label: "Điểm danh buổi học", name: "Check Attendance", link: "courseSectionSchedule/checkAttendance" },
            { pageId: 822, label: "Duyệt nghỉ dạy", name: "Approve Absence", link: "approveAbsence" },
            { pageId: 823, label: "Xử lý lịch nghỉ dạy", name: "Handle Absence Schedule", link: "handleAbsenceSchedule" },
            { pageId: 824, label: "Nhập điểm thành phần", name: "Enter Component Scores", link: "enterComponentScores" },
            { pageId: 825, label: "Hoàn thành giảng dạy", name: "Complete Teaching", link: "courseSection/completeCourseSection" },
        ]
    },
    {
        label: "Tổ chức kỳ thi",
        name: "Exam Organization",
        links: [
            { pageId: 826, label: "Danh sách thí sinh đăng ký", name: "Candidate List", link: "candidateList", status: "Prototype" },
            { pageId: 827, label: "Ngày thi chính thức", name: "Official exam date", link: "exam/officialExamDate" },
            { pageId: 828, label: "Phòng tổ chức thi", name: "Exam Organization Department", link: "examOrganizationDepartment" },
            { pageId: 829, label: "Tiết bắt đầu xếp lịch thi", name: "Exam Start Slot", link: "examStartSlot" },
            { pageId: 830, label: "Chia nhóm thi", name: "Divide Groups", link: "splitExamSection" },
            { pageId: 831, label: "Xếp lịch thi", name: "Schedule Exams", link: "examSection/scheduleExamSection" },
            { pageId: 832, label: "Danh sách nhóm thi", name: "Exam Candidate", link: "examSectionList" },
            { pageId: 833, label: "Nhập điểm thi", name: "Enter Scores", link: "enterExamSectionScores" },
            { pageId: 834, label: "Xem điểm thi", name: "View Scores", link: "viewScores" }
        ]
    },
    {
        label: "Xét và Cấp chứng chỉ",
        name: "Certificate Issuance",
        links: [
            // { label: "Cấu hình định dạng chứng chỉ", name: "Create Batch", link: "2wk7hz676c" },
            { pageId: 835, label: "Tạo đợt xét chứng chỉ", name: "Create Batch", link: "createCertificateReviewBatch" },
            { pageId: 836, label: "Kết quả xét chứng chỉ", name: "Certificate Result", link: "certificate/certificateResult" },
            { pageId: 837, label: "Quyết định cấp chứng chỉ", name: "Certificate Decision", link: "certificate/certificateDecision" },
            { pageId: 838, label: "Hồ sơ cấp chứng chỉ", name: "Issuance Records", link: "certificateIssuanceFiles" }
        ]
    },
    {
        label: "Kênh phản hồi",
        name: "Feedback channel",
        links: [
            { pageId: 8351, label: "Danh sách phản hồi", name: "", link: "feedbackList", status: "Prototype" },
        ]
    },
    {
        label: "Danh mục hệ thống",
        name: "System Catalog",
        links: [
            { name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
            { name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig", status: "Default" },
            { name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContentConfig" },
            { name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },
            { name: "emailTemplates", label: "Mẫu Mail thông báo tự động", link: "emailTemplates", status: "Prototype" },
            { name: "sendMailNotification", label: "Gửi Mail thông báo", link: "sendMailNotification", status: "Prototype" },
            { pageId: 839, label: "Danh mục trung tâm kỹ năng", name: "Skills Center", link: "skillCenterList" },
            { pageId: 840, label: "Danh mục chứng chỉ", name: "Certificate List", link: "certificateList" },
            { pageId: 841, label: "Danh mục chi nhánh", name: "Branch List", link: "branchCatalog" },
            { pageId: 842, label: "Danh mục tính chất phòng", name: "Room Types", link: "roomTypeList" },
            { pageId: 843, label: "Danh mục phòng học", name: "Classrooms", link: "classroomList" },
            { pageId: 845, label: "Danh mục loại thời gian", name: "Time Types", link: "timeType" },
            { pageId: 846, label: "Danh mục cụm thời gian học", name: "Time Clusters", link: "timeClusterList" },
            { pageId: 847, label: "Danh mục ngày nghỉ lễ", name: "Holidays", link: "holidayList", },
            // {pageId: 248, label: "Danh mục giảng viên", name: "Lecturers", link: "12-10" },
            { pageId: 848, label: "Cấu hình thông số xếp lịch học", name: "Schedule Config", link: "scheduleConfig" },
            { pageId: 849, label: "Danh mục bộ đếm", name: "Counters", link: "counters", status: "Prototype" },
        ]
    }
];





