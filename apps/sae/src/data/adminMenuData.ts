import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";

export const menuData: I_BasicAppShell_LinkItem[] = [
    {
        pageId: 67, name: "Dashboard", label: "Dashboard", link: "dashboard"
    },
    {
        label: "Quản lý hệ thống",
        links: [
            { pageId: 1, name: "Account management", label: "Quản lý tài khoản", link: "accountManagement" },
            { pageId: 100009, name: "Role management", label: "Quản lý nhóm tài khoản", link: "roleManagement" },
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
        label: "Quản lý khung điểm đánh giá",
        links: [
            { pageId: 10, name: "Standard", label: "Khung điểm đánh giá", link: "evaluation-score", },
            { pageId: 11, name: "EventRequired", label: "Danh mục hoạt động bắt buộc", link: "mandatory-activity-catalog", }
        ]
    },
    {
        label: "Xây dựng kế hoạch ngoại khóa & rèn luyện",
        links: [
            {
                label: "Lập kế hoạch năm mới",
                links: [
                    { pageId: 69, name: "Register Extracurricular Activity Plan", label: "Đăng ký kế hoạch tổ chức hoạt động ngoại khóa", link: "annual-planning/extracurricular-plan-register", },
                    { pageId: 55, name: "AnnualPlan-PlanApproval", label: "Duyệt đăng ký kế hoạch tổ chức hoạt động ngoại khóa", link: "annual-planning/plan-approval", },
                    { pageId: 12, name: "AnnualPlan-StudentAffair", label: "Phòng Công tác sinh viên", link: "annual-planning/student-affairs", },
                    // { pageId: 52, name: "AnnualPlan-StudentAffair", label: "Phòng Công tác sinh viên", link: "annual-planning/student-affairs", },
                    // { pageId: 53, name: "AnnualPlan-YouthUnion", label: "Đoàn hội", link: "annual-planning/youth-union", },
                    // { pageId: 54, name: "AnnualPlan-MandatoryActivities", label: "Hoạt động bắt buộc cấp Trường", link: "annual-planning/mandatory-activities", },
                ]
            },
            {
                label: 'Triển khai kế hoạch',
                links: [
                    { pageId: 56, name: "ExecutePlan-Notify", label: "Gửi thông báo", link: "plan-deployment/send-notification" },
                    // { pageId: 57, name: "ExecutePlan-ActivityApproval", label: "Duyệt đăng ký tổ chức hoạt động ngoại khóa", link: "plan-deployment/activity-approval", status: "Prototype" },
                    { pageId: 58, name: "ExecutePlan-ConfigRegistration", label: "Cấu hình thời gian sinh viên đăng ký theo lớp", link: "plan-deployment/config-registration", },
                    { pageId: 13, name: "CurrentPlan", label: "Triển khai kế hoạch", link: "plan-deployment/deployment-deploy", }
                ]
            }
        ]
    },
    {
        label: "Ghi nhận điểm tham gia",
        links: [
            { pageId: 16, name: "PointRecord", label: "Phòng Công tác sinh viên", link: "student-affairs-participation", },
            // { pageId: 31, name: "PointRecord-YouthUnion", label: "Đoàn - Hội", link: "youth-union-participation", },
            // { pageId: 33, name: "PointRecord-MandatoryActivities", label: "Hoạt động bắt buộc cấp Trường", link: "mandatory-activities-participation", }
        ]
    },
    {
        label: "Công nhận điểm tham gia",
        links: [
            { pageId: 29, name: "PointApprove-StudentAffair", label: "Phòng Công tác sinh viên", link: "student-affairs-office", },
            // { pageId: 35, name: "PointApprove-YouthUnion", label: "Đoàn - Hội", link: "union-association", },
            // { pageId: 37, name: "PointApprove-MandatoryActivities", label: "Hoạt động bắt buộc cấp Trường", link: "school-mandatory-activities", }
        ]
    },
    {
        label: "Quản lý xử lý khiếu nại",
        links: [
            { pageId: 30, name: "Handle complaint", label: "Xử lý khiếu nại", link: "handle-complaint", },
            { pageId: 48, name: "Resolved complaints", label: "Khiếu nại đã xử lý", link: "resolved-complaints", }
        ]
    },
    {
        label: "Giám sát hoạt động ngoại khóa & rèn luyện",
        links: [
            { pageId: 14, name: "MonitorEventOfStudent", label: "Giám sát sinh viên tham gia hoạt động ngoại khóa & rèn luyện", link: "participation-monitoring", status: "Default" },
            { pageId: 15, name: "MonitorEvent", label: "Giám sát triển khai hoạt động ngoại khóa & rèn luyện", link: "implementation-monitoring", }
        ]
    }, {
        label: "Cố vấn học tập",
        links: [
            { pageId: 59, name: "AcademicAdvisor-Participation monitor", label: "Giám sát sinh viên tham gia hoạt động ngoại khóa & rèn luyện", link: "student-advisor/monitor-student", },
            { pageId: 60, name: "AcademicAdvisor-Activity monitor", label: "Giám sát hoạt động ngoại khóa sinh viên tham gia", link: "student-advisor/monitor-activity", }
        ]
    },
    {
        label: "Chủ nhiệm lớp",
        links: [
            { pageId: 61, name: "ClassAdvisor-Participation monitor", label: "Giám sát sinh viên tham gia hoạt động ngoại khóa & rèn luyện", link: "homeroom-teacher/monitor-student", status: "Default" },
            { pageId: 62, name: "ClassAdvisor-Activity monitor", label: "Giám sát hoạt động ngoại khóa sinh viên tham gia", link: "homeroom-teacher/monitor-activity", status: "Default" }
        ]
    },
    {
        label: "Hội đồng đánh giá kết quả rèn luyện",
        links: [
            { pageId: 21, label: "Hội đồng đánh giá kết quả rèn luyện cấp Khoa", link: "faculty-evaluation-council", },
            { pageId: 22, label: "Hội đồng đánh giá kết quả rèn luyện cấp Trường", link: "school-evaluation-council", }
        ]
    },
    // {
    //     label: "Hệ thống đánh giá kết quả rèn luyện", link: "", status: "Menu"
    // },
    {
        label: "Công cụ hỗ trợ",
        links: [
            {
                label: "Đồng bộ dữ liệu học tập",
                links: [
                    { pageId: 63, name: "Academic Grading Scale", label: "Thang đo điểm học tập và quy đổi điểm rèn luyện", link: "sync-data-leaning/conversion-scale-list" },
                    { pageId: 64, name: "Academic Score Conversion", label: "Quy đổi điểm học tập sang điểm rèn luyện", link: "sync-data-leaning/convert-academic-to-activity-score", },
                ]
            },
            {
                label: "Điểm danh hoạt động",
                links: [
                    { pageId: 65, name: "Activity attendance", label: "Điểm danh hoạt động", link: "activity-attendance" },
                ]
            },
            // {
            //     label: "Xét duyệt minh chứng và ghi nhận điểm",
            //     links: [
            //         { pageId: 66, name: "Evidence approve", label: "Duyệt minh chứng hoạt động ngoại khóa", link: "evidence-approve", status: "Prototype" },
            //     ]
            // },
        ]
    },
    {
        label: "Tra cứu kết quả đánh giá rèn luyện",
        links: [
            { pageId: 19, name: "PointResult", label: "Kết quả đánh giá rèn luyện hiện tại", link: "current-evaluation-result", },
            { pageId: 20, name: "HistoryPointresult", label: "Tổng hợp kết quả đánh giá rèn luyện theo quá trình", link: "evaluation-summary", },
        ]
    },
    {
        label: "Thống kê – Báo cáo",
        links: [
            { pageId: 17, name: "FacultyReport", label: "Báo cáo tổng hợp kết quả đánh giá rèn luyện cấp Khoa", link: "faculty-statistics-report", },
            { pageId: 18, name: "SchoolReport", label: "Báo cáo tổng hợp kết quả đánh giá rèn luyện cấp Trường", link: "school-statistics-report", }
        ]
    },
    {
        label: "Cấu hình hệ thống",
        links: [
            { pageId: 100001, name: "Document categories", label: "Danh mục loại văn bản", link: "document-categories" },
            { pageId: 100002, name: "MailConfig", label: "Danh mục cấu hình mail", link: "mail-config", },
            { pageId: 100010, name: "Email Template", label: "Mẫu Mail thông báo", link: "email-template" },
            { pageId: 100003, name: "Page Content Config", label: "Danh mục Page Content", link: "pageContent" },
            { pageId: 100004, name: "Module Config", label: "Cấu hình thông tin chủ quản", link: "module-config" },
            { pageId: 26, name: "Academic year", label: "Danh mục năm học – học kỳ", link: "academic-year", },
            { pageId: 100011, name: "Code formula", label: "Danh mục bộ đếm", link: "code-formula", },
            { pageId: 70, name: "Academic year", label: "Danh sách sinh viên học kỳ", link: "semester-student-list", },
            { pageId: 100006, name: "Department list", label: "Danh mục đơn vị", link: "departmentList" },
            // { pageId: 24, name: "Organizing unit", label: "Danh mục đơn vị tổ chức", link: "organizing-unit", },
            // { pageId: 25, name: "Working unit department", label: "Danh mục đơn vị công nhận điểm", link: "working-unit-department", },
            // { pageId: 27, name: "Address inside school", label: "Địa điểm tổ chức trong Trường", link: "address-inside-school", },
            // { pageId: 28, name: "Address outside school", label: "Địa điểm tổ chức ngoài Trường", link: "address-outside-school", },
            { pageId: 47, name: "Event group", label: "Danh mục nhóm hoạt động", link: "event-group", },
            { pageId: 68, name: "Sync data history", label: "Danh mục hệ thống", link: "system-categories", }
        ]
    },

];

