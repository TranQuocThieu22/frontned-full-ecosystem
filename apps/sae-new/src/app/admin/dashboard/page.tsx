"use client";

import { DashboardQuickActions } from "@/features/admin/dashboard/DashboardQuickActions";
import { DashboardRecentActivity } from "@/features/admin/dashboard/DashboardRecentActivity";
import { DashboardRoleDistribution } from "@/features/admin/dashboard/DashboardRoleDistribution";
import { DashboardStatsCards } from "@/features/admin/dashboard/DashboardStatsCards";
import { DashboardSystemStatus } from "@/features/admin/dashboard/DashboardSystemStatus";
import { SimpleGrid } from "@mantine/core";

export default function DashboardPage() {
    return (
        <>
            <DashboardStatsCards />
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <DashboardRoleDistribution />
                <DashboardRecentActivity />
                <DashboardQuickActions />
                <DashboardSystemStatus />
            </SimpleGrid>
        </>
    );
}
