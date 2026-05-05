"use client";

import { academicYearService } from "@/shared/APIs/academicYearServiceQT";
import CustomAppShell, { CustomAppShellMenuItem } from "@/shared/components/CustomAppShell";
import { MAIN_TENANT_ID } from "@/shared/consts/data/mainTenantId";
import { useAcademicYearStore } from "@/shared/stores/academicYearStore";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import {
    IconCalendarTime,
    IconChecklist,
    IconFileCheck,
    IconListCheck,
    IconUpload,
    IconUserCheck
} from "@tabler/icons-react";
import { useEffect, type ReactNode } from "react";

/**
 * MFE-OPERATION Layout - Sprint 1
 * Theo FRD SAE DAV.md - Sprint 1 (US-O-01, US-O-04, US-O-05, US-O-06)
 *
 * Cấu trúc menu Sprint 1:
 * - Tổng quan (Dashboard)
 * - Kế hoạch & Hoạt động (Lập KHVN, Quản lý HĐ)
 * - Ghi nhận & Duyệt điểm (Import DS, Duyệt điểm HĐ, Duyệt ĐRL cấp lớp)
 */

const menu: CustomAppShellMenuItem[] = [
    // Kế hoạch & Hoạt động
    {
        label: "Kế hoạch & Hoạt động",
        icon: <IconCalendarTime size={16} />,
        description: "Lập kế hoạch và quản lý hoạt động năm học",
        items: [
            {
                label: "Lập kế hoạch năm học",
                icon: <IconCalendarTime size={16} />,
                link: "/operation/planning",
            },
            {
                label: "Quản lý hoạt động",
                icon: <IconListCheck size={16} />,
                link: "/operation/activities",
                description: "Danh sách hoạt động bắt buộc & tự chọn",
            },
        ],
    },
    // Ghi nhận & Duyệt điểm
    {
        label: "Ghi nhận & Duyệt điểm",
        icon: <IconChecklist size={16} />,
        description: "Import danh sách và duyệt điểm hoạt động",
        items: [
            {
                label: "Import danh sách",
                icon: <IconUpload size={16} />,
                link: "/operation/importActivityPoint",
                description: "Import danh sách sinh viên tham gia hoạt động",
            },
            {
                label: " Duyệt điểm rèn luyện sinh viên",
                icon: <IconUserCheck size={16} />,
                link: "/operation/ctsv/pointReviewByClass",
            },
            {
                label: "Công nhận điểm",
                icon: <IconFileCheck size={16} />,
                link: "/operation/ctsv/pointReview",
            },
        ],
    },
];

export default function Layout({ children }: { children?: ReactNode }) {
    const academicYearStore = useAcademicYearStore();
    const query = useCustomReactQuery({
        queryKey: ['current-academic-year'],
        serviceFn: () => academicYearService.getCurrentAcademicYear({ tenantId: MAIN_TENANT_ID }),
    })
    useEffect(() => {
        if (query.data) {
            academicYearStore.setProperty("currentAcademicYear", query.data)
        }
    }, [query.data])

    return <CustomAppShell menu={menu}>{children}</CustomAppShell>;
}
