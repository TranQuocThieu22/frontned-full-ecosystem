"use client"

import { menuData } from "@/shared/consts/data/menuData"
import { CustomBasicAppShell } from "@aq-fe/core-ui/shared/components/layout/CustomBasicAppShell/CustomBasicAppShell"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"
import { Badge, Group, Text } from "@mantine/core"
import { ReactNode } from "react"

/** Tenant context cho header (Tenant-aware UI) */
function TenantContextBadge() {
    const currentTenant = "DAV"
    const status = "ACTIVE"
    return (
        <Group gap="xs">
            <Text size="sm" c="dimmed">
                Tenant:
            </Text>
            <Badge variant="light" color="blue" size="sm">
                {currentTenant} ({status})
            </Badge>
        </Group>
    )
}

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <CustomBasicAppShell
            menu={menuData}
            extraTopRight={<TenantContextBadge />}
            logoutRedirect="/auth/login"
            disablePageContentQuery
            disableGetAQModuleQuery
        >
            <CustomPageContent>{children}</CustomPageContent>
        </CustomBasicAppShell>
    )
}


