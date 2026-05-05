import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const menuData: I_BasicAppShell_LinkItem[] = [
  {
    label: "Dashboard",
    link: "dashboard"
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
    label: "Quản lý Sở hữu trí tuệ",
    links: [
      { status: "Prototype", label: "Dasboard", link: "intellectual-property/ip-management-dashboard", name: "Intellectual Property Management Dasboard" },
      { status: "Prototype", label: "Loại tài liệu IP", link: "intellectual-property/ip-document-type", name: "IP Document Type" },
      { status: "Prototype", label: "Quy trình xử lý hồ sơ IP", link: "intellectual-property/ip-process-flow", name: "IP Process Flow" },
      { status: "Prototype", label: "Đăng ký IP", link: "intellectual-property/ip-register", name: "IP Register" },
      { status: "Prototype", label: "Hồ sơ sở hữu trí tuệ", link: "intellectual-property/intellectualPropertyProfile", name: "Intellectual property profile" },
      { status: "Prototype", label: "Phân công nhiệm vụ", link: "intellectual-property/assignmentOfTasks", name: "Assignment of tasks" },
      { status: "Prototype", label: "Thực hiện nhiệm vụ IP", link: "intellectual-property/performIPTasks", name: "Perform IP tasks" },
      { status: "Prototype", label: "Tài liệu liên quan", link: "intellectual-property/RelatedDocuments", name: "Related Documents" },
      { status: "Prototype", label: "Khai thác chuyển giao", link: "intellectual-property/exploit-transfer", name: "Exploit Transfer" },
    ],
  },
  {
    label: "Cấu hình hệ thống",
    links: [
      { label: "Danh mục hệ thống", name: "System navigator", link: "menu/system", },
      { label: "Cấu hình thông tin chủ quản", name: "moduleConfig", link: "moduleConfig" },
      { label: "Danh mục cấu hình mail", name: "mailConfig", link: "mailConfig", status: "Default" },
      { label: "Danh mục Page Content", name: "pageContentConfig", link: "pageContentConfig" },
      { label: "Danh mục đơn vị", link: "danh-muc-he-thong/danh-muc-don-vi", name: "Unit", status: "Prototype" },
      { label: "Danh mục viên chức", name: "Officer", link: "danh-muc-he-thong/danh-muc-vien-chuc", status: "Prototype" },
      { label: "Danh mục nhân sự ngoài trường", link: "danh-muc-he-thong/nhan-su-ngoai-truong", name: "External personnel", status: "Prototype" },
      { label: "Danh mục loại văn bản", name: "Document categories", link: "documentCategories" },
      { label: "Danh mục năm học", link: "danh-muc-he-thong/danh-muc-nam-hoc", name: "School year list", status: "Prototype" },
      { label: "Danh mục lĩnh vực", link: "danh-muc-he-thong/danh-muc-linh-vuc", name: "Research field list", status: "Prototype" },
      { label: "Danh mục cấp đề tài", link: "danh-muc-he-thong/danh-muc-cap-de-tai", name: "Project levels", status: "Prototype" },
      { label: "Danh mục loại đề tài", link: "danh-muc-he-thong/danh-muc-loai-de-tai", name: "Project types", status: "Prototype" },
      { label: "Danh mục loại đề tài hướng dẫn sinh viên", link: "danh-muc-he-thong/studentGuideDocs", name: "Project types", status: "Prototype" },
      { label: "Danh mục loại biên soạn", link: "danh-muc-he-thong/compilationType", name: "Compilation types", status: "Prototype" },
      { label: "Danh mục loại bài đăng", link: "danh-muc-he-thong/postTypes", name: "Post types", status: "Prototype" },
      { label: "Danh mục xếp hạng giải thưởng đề tài sinh viên", link: "danh-muc-he-thong/student-award-rankings", name: "Project types", status: "Prototype" },
      { label: "Danh mục loại giải thưởng đề tài sinh viên", link: "danh-muc-he-thong/student-topic-awards", name: "List of student topic awards", status: "Prototype" },
      { label: "Danh mục loại nhiệm vụ nghiên cứu khoa học khác", link: "danh-muc-he-thong/other-types-of-scientific-research", name: "Other Types Of Scientific Research", status: "Prototype" },
      { label: "Danh mục vai trò thực hiện đề tài", link: "danh-muc-he-thong/role-implement-topic", name: "List of roles in implementing the theme", status: "Prototype" },
      { label: "Danh mục vai trò thực hiện bài đăng", link: "danh-muc-he-thong/role-make-post", name: "List of roles that make posts", status: "Prototype" },
      { label: "Danh mục vai trò thực hiện biên soạn", link: "danh-muc-he-thong/editorialRole", name: "Editorial Roles", status: "Prototype" },
      { label: "Danh mục vai trò tham gia hội đồng", link: "danh-muc-he-thong/EstablishCouncilRole", name: "Establish Council Role", status: "Prototype" },

    ],
  },
];
