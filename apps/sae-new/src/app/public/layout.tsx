"use client";
import CustomAppShell, { CustomAppShellMenuItem } from "@/shared/components/CustomAppShell";
import type { BreadcrumbItem } from "@/shared/components/CustomPageContent";
import {
    IconCalendarEvent,
    IconClipboardCheck,
    IconClipboardText,
    IconView360
} from "@tabler/icons-react";
import type { ReactNode } from "react";

/**
 * MFE-PUBLIC Layout - Sprint 1
 * Theo FRD SAE DAV.md - Sprint 1 (US-P-01, US-P-02, US-P-04)
 *
 * Cấu trúc menu Sprint 1:
 * - Tổng quan (Dashboard)
 * - Hoạt động Ngoại khóa (Danh sách HĐ, Đăng ký HĐ)
 * - Điểm Rèn luyện (Tự đánh giá, Theo dõi điểm)
 */

const breadcrumbBase: BreadcrumbItem[] = [
    { title: "MFE-PUBLIC", href: "/public/student/dashboard" },
];

const menu: CustomAppShellMenuItem[] = [
    // Tổng quan
    // {
    //     label: "Tổng quan",
    //     icon: <IconLayoutDashboard size={16} />,
    //     link: "/public/student/dashboard",
    // },
    // Hoạt động Ngoại khóa
    {
        label: "Hoạt động Ngoại khóa",
        icon: <IconCalendarEvent size={16} />,
        description: "Xem và đăng ký hoạt động ngoại khóa",
        items: [
            {
                label: "Danh sách hoạt động",
                icon: <IconView360 size={16} />,
                link: "/public/student/activityView",
                description: "Xem danh sách hoạt động theo học kỳ",
            },
        ],
    },
    // Điểm Rèn luyện
    {
        label: "Điểm Rèn luyện",
        icon: <IconClipboardCheck size={16} />,
        description: "Tự đánh giá và theo dõi điểm rèn luyện",
        items: [
            {
                label: "Tự đánh giá ĐRL",
                icon: <IconClipboardCheck size={16} />,
                link: "/public/student/self-assessment",
                description: "Sinh viên tự đánh giá điểm rèn luyện theo 5 tiêu chí",
            },
            // {
            //     label: "Theo dõi điểm",
            //     icon: <IconClipboardText size={16} />,
            //     link: "/public/student/scores",
            //     description: "Xem trạng thái điểm và tiến độ tích lũy",
            // },
        ],
    },
];

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <CustomAppShell menu={menu} breadcrumbs={breadcrumbBase}>
            {children}
        </CustomAppShell>
    );
}
