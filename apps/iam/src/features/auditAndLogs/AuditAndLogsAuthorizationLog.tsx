"use client"

import {
    CustomColumnDef,
    CustomDataTable,
} from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils"
import { Badge, Group, SimpleGrid } from "@mantine/core"
import { useMemo, useState } from "react"

export interface AuthLogEntry {
    id: number
    timeUtc: string
    user: string
    tenant: string
    action: string
    resource: string
    decision: "ALLOW" | "DENY"
    reason: string
    correlationId: string
}

const MOCK_LOGS: AuthLogEntry[] = [
    {
        id: 1,
        timeUtc: "2025-02-26T08:00:00Z",
        user: "admin@dav.edu.vn",
        tenant: "DAV",
        action: "user:read",
        resource: "/api/users",
        decision: "ALLOW",
        reason: "Role TENANT_ADMIN has user:read",
        correlationId: "corr-001-abc",
    },
    {
        id: 2,
        timeUtc: "2025-02-26T08:01:00Z",
        user: "sv.2022.0001@dav.edu.vn",
        tenant: "DAV",
        action: "grade:write",
        resource: "/api/grades",
        decision: "DENY",
        reason: "Role STUDENT does not have grade:write",
        correlationId: "corr-002-def",
    },
]

export default function AuditAndLogsAuthorizationLog() {
    const [decision, setDecision] = useState<string>("")
    const [correlationId, setCorrelationId] = useState("")

    const query = useCustomReactQuery<AuthLogEntry[]>({
        queryKey: ["authLog", decision, correlationId],
        isPrototype: true,
        mockData: MOCK_LOGS,
    })

    const filtered = useMemo(() => {
        let list = query.data ?? []
        if (decision) {
            list = list.filter((e) => e.decision === decision)
        }
        if (correlationId.trim()) {
            const k = correlationId.trim().toLowerCase()
            list = list.filter((e) =>
                e.correlationId.toLowerCase().includes(k)
            )
        }
        return list
    }, [query.data, decision, correlationId])

    const columns = useMemo<CustomColumnDef<AuthLogEntry>[]>(() => [
        {
            header: "Time (UTC)",
            accessorKey: "timeUtc",
            Cell: ({ row }) =>
                dateUtils.toDateTime(row.original.timeUtc, true),
        },
        { header: "User", accessorKey: "user" },
        { header: "Tenant", accessorKey: "tenant" },
        { header: "Action", accessorKey: "action" },
        { header: "Resource", accessorKey: "resource" },
        {
            header: "Decision",
            accessorKey: "decision",
            Cell: ({ row }) => (
                <Badge
                    color={row.original.decision === "ALLOW" ? "green" : "red"}
                    variant="light"
                >
                    {row.original.decision}
                </Badge>
            ),
        },
        { header: "Nguyên nhân / Policy", accessorKey: "reason" },
        { header: "Correlation ID", accessorKey: "correlationId" },
    ], [])

    return (
        <CustomFieldset
            title="Authorization Log"
        >
            <SimpleGrid cols={{ base: 1, md: 4 }} mb="md">
                <CustomSelect
                    label="Decision"
                    placeholder="Tất cả"
                    data={[
                        { value: "", label: "Tất cả" },
                        { value: "ALLOW", label: "ALLOW" },
                        { value: "DENY", label: "DENY" },
                    ]}
                    value={decision}
                    onChange={(v) => setDecision(v ?? "")}
                />
                <CustomTextInput
                    label="Correlation ID"
                    placeholder="Lọc theo Correlation ID"
                    value={correlationId}
                    onChange={(e) =>
                        setCorrelationId(e.currentTarget.value)
                    }
                />
            </SimpleGrid>
            <Group mb="xs">
                <Badge variant="outline" color="gray">
                    Time (UTC)
                </Badge>
            </Group>
            <CustomDataTable
                columns={columns}
                data={filtered}
                enablePagination
            />
        </CustomFieldset>
    )
}
