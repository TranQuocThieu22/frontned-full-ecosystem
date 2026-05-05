import { I_BasicAppShell_LinkItem } from "@/components"
import { IconCategory, IconFileReport, IconSettings } from "@tabler/icons-react"


export const menuDataObject = {
    managementSystem: (): I_BasicAppShell_LinkItem => {
        return {
            label: "Quản lý hệ thống",
            icon: <IconSettings />,
            links: [
                { pageId: 1, name: "Account management", label: "Quản lý tài khoản ", link: "accountManagement" },
                { pageId: 100005, name: "Account group management", label: "Quản lý nhóm tài khoản", link: "roleManagement" },
                { pageId: 2, name: "Access control level", label: "Phân quyền cấp đơn vị", link: "accessControlLevel" },
                { pageId: 3, name: "Access control", label: "Phân quyền sử dụng", link: "accessControl" },
                { pageId: 4, name: "Security regulations", label: "Quy định an toàn/ bảo mật thông tin", link: "securityPolicyDocs" },
                { pageId: 5, name: "System updates", label: "Thông tin xây dựng, cải tiến, bảo trì hệ thống", link: "systemUpdateDocs" },
                { pageId: 6, name: "User guide", label: "Tài liệu hướng dẫn sử dụng", link: "userGuideDocs" },
            ],
        } as I_BasicAppShell_LinkItem
    },
    documentManagement: (): I_BasicAppShell_LinkItem => {
        return {
            label: "Văn bản - Quy định",
            icon: <IconFileReport />,
            links: [
                { pageId: 7, name: "Organizational regulations", label: "Văn bản - Quy định tổ chức", link: "organizationPolicyDocs", },
                { pageId: 8, name: "Workflow process", label: "Quy trình xử lý công việc", link: "workflowProcessDocs", },
                { pageId: 9, name: "Form templates", label: "Tài liệu biểu mẫu", link: "formTemplateDocs", },
            ],
        } as I_BasicAppShell_LinkItem
    },

    systemCatalog: (extraMenu?: I_BasicAppShell_LinkItem[]): I_BasicAppShell_LinkItem => {
        return {
            label: "Danh mục hệ thống",
            icon: <IconCategory />,
            links: [
                // { pageId: 100008, name: "lecturerList", label: "Danh mục viên chức", link: "lecturerList" },
                { pageId: 100001, name: "Document categories", label: "Danh mục loại văn bản", link: "documentCategories" },
                { pageId: 100011, name: "Code config", label: "Danh mục bộ đếm", link: "codeFormula" },
                { pageId: 100002, name: "mailConfig", label: "Danh mục cấu hình mail", link: "mailConfig" },
                { pageId: 100010, name: "Mail template", label: "Mẫu Mail thông báo", link: "mailTemplate" },
                { pageId: 100003, name: "pageContentConfig", label: "Danh mục Page Content", link: "pageContent" },
                // { pageId: 100006, name: "Department list", label: "Danh mục đơn vị", link: "departmentList" },
                // { pageId: 100007, name: "Academic year", label: "Danh mục năm học", link: "academicYear" },
                { pageId: 100004, name: "moduleConfig", label: "Cấu hình thông tin chủ quản", link: "moduleConfig" },
                ...(extraMenu || [])
            ],
        }
    }
}

