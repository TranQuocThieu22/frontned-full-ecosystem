import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const menuData: I_BasicAppShell_LinkItem[] = [
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
        label: "Quản lý hoạt động Tổ chức hội thảo khoa học",
        links: [
            { pageId: 721, status: "Prototype", label: "Tra cứu danh mục hội thảo khoa học", link: "8-1", name: "Look up list" },
            {
                label: "Đăng ký tổ chức hội thảo khoa học",
                name: "Register conference",
                links: [
                    { pageId: 722, status: "Prototype", label: "Phiếu đăng ký tổ chức hội thảo", link: "8-2-1", name: "Registration form" },
                    { pageId: 723, status: "Prototype", label: "Kiểm tra hồ sơ đăng ký hội thảo", link: "8-2-2", name: "Check profile" },
                    { pageId: 724, status: "Prototype", label: "Phê duyệt kế hoạch tổ chức và dự toán chi phí", link: "8-2-3", name: "Approve plan" },
                    { pageId: 725, status: "Prototype", label: "Tổng hợp danh mục hội nghị hội thảo được phê duyệt", link: "8-2-4", name: "Summary list" },
                    { pageId: 726, status: "Prototype", label: "Quyết định tổ chức hội nghị hội thảo", link: "8-2-5", name: "Decision organize" }
                ]
            },
            {
                label: "Giám sát tiến độ thực hiện hội thảo khoa học",
                name: "Monitor progress",
                links: [
                    { pageId: 727, status: "Prototype", label: "Thông báo giảng viên đăng ký tham dự hội thảo", link: "8-3-1", name: "Notify lecturers" },
                    { pageId: 728, status: "Prototype", label: "Danh sách đại biểu tham dự", link: "8-3-2", name: "List delegates" },
                    { pageId: 729, status: "Prototype", label: "Báo cáo tiến độ và kết quả tổ chức hội nghị hội thảo", link: "8-3-3", name: "Progress report" }
                ]
            },
        ]
    },
    {
        label: "Cấu hình hệ thống",
        links: [
            { name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
            { name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig", status: "Default" },
            { name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContentConfig" },
            { name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },
            { label: "Danh mục hệ thống", link: "menu/system" },
            { label: "Danh mục nhân sự ngoài trường", link: "11-2", status: "Prototype", name: "External personnel" },
            { label: "Danh mục năm học", link: "11-4", name: "School year" },
            { label: "Danh mục lĩnh vực", link: "11-5", name: "Field list" },
            { label: "Danh mục nhiệm vụ", link: "11-6", name: "Task list" },
            { label: "Danh mục cấp đề tài", link: "11-7", name: "Project levels", status: "Prototype" },
            { label: "Danh mục loại đề tài", link: "11-8", name: "Project types", status: "Prototype" },
            { label: "Danh mục loại đề tài hướng dẫn sinh viên", link: "studentGuideDocs", name: "Project types", status: "Prototype" },
            { label: "Danh mục loại biên soạn", link: "compilationType", name: "Project types", status: "Prototype" },
            { label: "Danh mục loại bài đăng", link: "postType", name: "Project types", status: "Prototype" },
            { label: "Danh mục xếp hạng giải thưởng đề tài sinh viên", link: "student-award-rankings", name: "Project types", status: "Prototype" },
            { label: "Danh mục loại giải thưởng đề tài sinh viên", link: "student-topic-awards", name: "List of student topic awards", status: "Prototype" },
            { label: "Danh mục loại nhiệm vụ nghiên cứu khoa học khác", link: "other-types-of-scientific-research", name: "Other Types Of Scientific Research", status: "Prototype" },
            { label: "Danh mục vai trò thực hiện đề tài", link: "role-implement-topic", name: "List of roles in implementing the theme", status: "Prototype" },
            { label: "Danh mục vai trò thực hiện bài đăng", link: "role-make-post", name: "List of roles that make posts", status: "Prototype" },
            { label: "Danh mục vai trò thực hiện biên soạn", link: "editorialRole", name: "Editorial Roles", status: "Prototype" },
            { label: "Danh mục vai trò tham gia hội đồng", link: "EstablishCouncilRole", name: "Establish Council Role", status: "Prototype" },
        ],
    },
];
