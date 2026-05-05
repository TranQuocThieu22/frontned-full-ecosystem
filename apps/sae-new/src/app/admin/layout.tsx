"use client";
import CustomAppShell, { CustomAppShellMenuItem } from "@/shared/components/CustomAppShell";
import {
    IconClipboardList,
    IconLayoutDashboard,
    IconShieldCheck,
    IconUsers,
    IconUserShield
} from "@tabler/icons-react";
import { ReactNode } from "react";

/**
 * SAE Admin Menu - Sprint 1
 * Theo FRD SAE DAV.md - Sprint 1 (US-A-01, US-A-04, US-O-01)
 *
 * Phân hệ MFE-ADMIN (System Admin) & MFE-OPERATION (CTSV):
 * - Dashboard (Tổng quan)
 * - IAM (US-A-04): Quản lý tài khoản, vai trò, gán vai trò
 * - Kế hoạch năm học (US-O-01): Năm học, Học kỳ
 * - Cấu hình Khung điểm ĐRL (US-A-01): Version khung điểm, tiêu chí
 * - Hoạt động (US-P-01 + US-O-05): Xem danh sách hoạt động, ghi nhận/công nhận điểm
 */

const menu: CustomAppShellMenuItem[] = [
    // ===== Dashboard =====
    {
        label: "Tổng quan",
        icon: <IconLayoutDashboard size={16} />,
        link: "/admin/dashboard",
    },

    // ===== IAM - US-A-04 (MFE-ADMIN) =====
    {
        label: "IAM",
        icon: <IconShieldCheck size={16} />,
        items: [
            {
                label: "Tài khoản",
                icon: <IconUsers size={16} />,
                link: "/admin/users",
                description: "Quản lý tài khoản người dùng hệ thống",
            },
            {
                label: "Vai trò",
                icon: <IconUserShield size={16} />,
                link: "/admin/roles",
                description: "Định nghĩa vai trò và quyền hạn",
            },
        ],
    },
    // {
    //     label: "Xem danh sách hoạt động",
    //     icon: <IconView360 size={16} />,
    //     link: "/admin/activityView",
    //     description: "Xem danh sách và thông tin chi tiết các hoạt động ngoại khóa",
    // },

    // Cấu hình Khung điểm ĐRL - Sprint 1 (US-A-01)

    {
        label: " Cấu hình Khung điểm ĐRL",
        icon: <IconClipboardList size={16} />,
        link: "/admin/scoreFrameworkVersion",
    },

];

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <CustomAppShell menu={menu}>
            {children}
        </CustomAppShell>
    );
}
