'use client'

import { I_BasicAppShell_LinkItem } from "aq-fe-framework/components";

export const menuData: I_BasicAppShell_LinkItem[] = [
  {
    label: "Dashboard",
    link: "dashboard",
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
      { pageId: 7, name: "Organizational regulations", label: "Văn bản - Quy định tổ chức", link: "organizationPolicyDocs" },
      { pageId: 8, name: "Workflow process", label: "Quy trình xử lý công việc", link: "workflowProcessDocs" },
      { pageId: 9, name: "Form templates", label: "Tài liệu biểu mẫu", link: "formTemplateDocs" },
    ],
  },  {
    label: "Lập Kế hoạch Khảo sát",
    links: [
      { pageId: 0, name: "", label: "Thiết lập Kịch bản Khảo sát Định kỳ", link: "setUpPeriodicSurveyScenario", status: "Prototype" },
      { pageId: 0, name: "", label: "Thiết lập Kịch bản Khảo sát Năm", link: "setUpAnnualSurveyScenario", status: "Prototype" },
    ],
  },
  {
    label: "Thiết lập công việc khảo sát",
    links: [
      { pageId: 0, name: "", label: "Quản lý Nhóm Hoạt động Khảo sát", link: "surveyActivityGroup", status: "Prototype" },
      { pageId: 0, name: "", label: "Phân công Đơn vị Chịu trách nhiệm", link: "assignResponsibleUnit", status: "Prototype" },
      {
        label: "Quản lý Đối tượng Khảo sát",
        links: [
          { pageId: 0, name: "List of Survey Subjects", label: "Danh sách Đối tượng Khảo sát", link: "listSurveySubjects", status: "Prototype" },
          { pageId: 0, name: "", label: "Danh sách nhóm học", link: "courseSections", status:"Prototype" },

        ],
      },
    ],
  },
  {
    label: "Xây dựng & Rà soát Phiếu câu hỏi",
    links: [
      { pageId: 0, name: "Manage Survey Form", label: "Quản lý Mẫu Phiếu Khảo sát", link: "manageSurveyForm", status: "Prototype" },
    ],
  },
  {
    label: "Triển khai Chiến dịch Khảo sát",
    links: [
      { pageId: 0, name: "Deployment Campaign", label: "Chiến dịch triển khai", link: "deploymentCampaign", status: "Prototype" },
    ],
  },
  {
    label: "Giám sát & Quản lý Phản hồi",
    links: [
      { pageId: 0, name: "Distribution Configuration", label: "Cấu hình Phân phối", link: "distributionConfiguration", status: "Prototype" },
    ],
  },
  {
    label: "Quản lý chiến dịch khảo sát",
    links: [
      { pageId: 0, name: "", label: "Chiến dịch chuẩn", link: "standardCampaignList", status: "Prototype" },
      { pageId: 0, name: "", label: "Giám sát thực hiện chiến dịch", link: "campaignExecutionMonitoringList", status: "Prototype" }
    ]
  },
  {
    label: "Cấu hình hệ thống",
    links: [
      { pageId: 0, name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
      { pageId: 0, name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig", status: "Default" },
      { pageId: 0, name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContentConfig" },
      { pageId: 0, name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },
      { pageId: 0, name: "", label: "Danh mục năm học", link: "academicYears", status: "Prototype" },
      { pageId: 0, name: "", label: "Danh mục năm học học kỳ", link: "academicYearSemesters", status: "Prototype" },
      { pageId: 0, name: "", label: "Danh mục chương trình", link: "programs", status: "Prototype" },
      { pageId: 0, name: "", label: "Danh mục khóa", link: "courses", status: "Prototype" },
      { pageId: 0, name: "", label: "Danh mục môn học", link: "subjects", status: "Prototype" },
      { pageId: 0, name: "", label: "Danh mục đơn vị", link: "units", status: "Prototype" }
    ],
  },
];
