import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const menuData: I_BasicAppShell_LinkItem[] = [
    { pageId: 991, status: "Prototype", label: "Dasboard", link: "science-and-technology-cooperation-dashboard", name: "Management of Science and Technology Cooperation" },
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
        label: "Quản lý Hợp tác khoa học và công nghệ",
        name: "System list",
        links: [
            { pageId: 992, status: "Prototype", label: "Đối tác", link: "partner", name: "Partner" },
            { pageId: 993, status: "Prototype", label: "Cơ hội tiềm năng", link: "potential-opportunities", name: "Potential Opportunities" },
            { pageId: 730, label: "Nguồn tài trợ", link: "9-3", name: "Sponsors", status: "Prototype" },
            { pageId: 777, label: "Đề xuất hợp tác", link: "9-4", name: "Cooperation Proposal", status: "Prototype" },
            { pageId: 743, label: "Quan hệ đối tác", link: "9-5", name: "Partner List", status: "Prototype" },
            { pageId: 747, label: "Thỏa thuận hợp tác", link: "9-6", name: "Cooperation Agreement", status: "Prototype" },
            {
                label: "Hợp tác thực hiện dự án",
                name: "Project Cooperation",
                links: [
                    { pageId: 744, label: "Dự án hợp tác", link: "9-7-1", name: "Project Cooperation", status: "Prototype" },
                    { pageId: 746, label: "Lập kế hoạch", link: "9-7-2", name: "Cooperation Plan", status: "Prototype" },
                    { pageId: 746, label: "Theo dõi tiến độ", link: "9-7-3", name: "Track Progress", status: "Prototype" },
                    { pageId: 746, label: "Theo dõi tài chính", link: "none", name: "", status: "Menu" },
                    { pageId: 746, label: "Kết quả dự án", link: "9-7-5", name: "Project Results", status: "Prototype" },
                    { pageId: 747, label: "Đánh giá dự án", link: "9-7-6", name: "Project Evaluation", status: "Prototype" },
                ]
            },
            {
                label: "Hợp tác trao đổi",
                name: "Register conference",
                links: [
                    { pageId: 890, status: "Prototype", label: "Loại xét duyệt", name: "Review Type", link: "reviewType" },
                    { pageId: 890, status: "Prototype", label: "Chương trình trao đổi", name: "Exchange Program", link: "9-8-2" },
                    { pageId: 728, status: "Prototype", label: "Phân công xét duyệt", link: "assignmentOfApproval", name: "Assignment of approval" },
                    { pageId: 729, status: "Prototype", label: "Hồ sơ yêu cầu khi đăng ký", link: "requiredDocumentsForRegistration", name: "Required documents for registration" },
                    { pageId: 730, status: "Prototype", label: "Đăng ký trao đổi", link: "9-8-5", name: "Exchange Register" },
                    { pageId: 732, status: "Prototype", label: " Đánh giá hồ sơ ứng viên", link: "9-8-6", name: "CandpageIdate Profile Evaluation" },
                    { pageId: 733, status: "Prototype", label: "Lượt trao đổi", link: "9-8-7", name: "Exchange Session" },
                    { pageId: 734, status: "Prototype", label: "Theo dõi trao đổi", link: "9-8-8", name: "Monitor Exchange" },
                    { pageId: 735, status: "Prototype", label: "Báo cáo kết quả trao đổi", link: "9-8-9", name: "Exchange Report" },
                    { pageId: 735, status: "Prototype", label: " Tổng hợp kết quả lượt trao đổi", link: "summaryOfExchangeResults", name: "Summary of exchange results" },
                    { pageId: 800, status: "Prototype", label: " Cựu trao đổi", link: "9-8-11", name: "Exchange alumni" }
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
