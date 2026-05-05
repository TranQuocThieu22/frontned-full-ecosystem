import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types";

export const menuDataVerifyInstitution: I_BasicAppShell_LinkItem[] = [
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
      { pageId: 100005, name: "Account group management", label: "Quản lí nhóm tài khoản", link: "roleManagement" },
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
      { pageId: 7, name: "Organizational regulations", label: "Văn bản - Quy định tổ chức", link: "organizationPolicyDocs", },
      { pageId: 8, name: "Workflow process", label: "Quy trình xử lý công việc", link: "workflowProcessDocs", },
      { pageId: 9, name: "Form templates", label: "Tài liệu biểu mẫu", link: "formTemplateDocs", },
    ],
  },
  {
    label: "Cấu hình hệ thống",
    links: [

      { pageId: 100001, name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
      { pageId: 100011, name: "Code config", label: "Danh mục bộ đếm", link: "codeFormula" },
      { pageId: 100002, name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig" },
      { pageId: 100010, name: "Mail template", label: "Mẫu Mail thông báo", link: "mailTemplate" },
      { pageId: 100003, name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContent" },
      { pageId: 100004, name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },


      { name: "Unit list", label: "Danh mục đơn vị", link: "unitList" },
      { label: "Danh mục hệ thống", link: "menu/system" },
    ],
  },
];
