import { I_BasicAppShell_LinkItem } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/types"

export const menuData: I_BasicAppShell_LinkItem[] = [
    {
        label: "Điều hướng chính",
        links: [
            // { label: "Dashboard", link: "dashboard" },
            { label: "Quản lý Tổ chức (Tenant)", link: "tenants" },
            { label: "Quản lý Người dùng", link: "users" },
            { label: "Vai trò & Quyền (RBAC)", link: "roles" },
            // { label: "Phạm vi dữ liệu (Scopes)", link: "accessPolicy" },
        ],
    },
    {
        label: "Vận hành & bảo mật",
        links: [
            { label: "Giám sát & Kiểm toán (Audit)", link: "auditAndLogs" },
            { label: "Tích hợp (IdP / M2M)", link: "integrationIdPM2M" },
            { label: "Cấu hình Hệ thống & Bảo mật", link: "systemConfiguration" },
        ],
    },
]
