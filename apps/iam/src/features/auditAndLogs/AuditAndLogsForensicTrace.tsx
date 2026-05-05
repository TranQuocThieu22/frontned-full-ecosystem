"use client"

import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils"
import { Button, Stack, Table, Text } from "@mantine/core"
import { useState } from "react"

interface TraceEvent {
    timeUtc: string
    service: string
    action: string
    result: string
    metadata?: string
}

const MOCK_TRACE: TraceEvent[] = [
    { timeUtc: "2025-02-26T08:00:00.100Z", service: "Frontend", action: "GET /admin/users", result: "200", metadata: "corr-001-abc" },
    { timeUtc: "2025-02-26T08:00:00.150Z", service: "API Gateway", action: "Auth", result: "ALLOW", metadata: "JWT valid" },
    { timeUtc: "2025-02-26T08:00:00.200Z", service: "IAM", action: "Check user:read", result: "ALLOW", metadata: "TENANT_ADMIN" },
    { timeUtc: "2025-02-26T08:00:00.250Z", service: "User Service", action: "List users", result: "200", metadata: "tenant=DAV" },
]

export default function AuditAndLogsForensicTrace() {
    const [correlationId, setCorrelationId] = useState("corr-001-abc")
    const [events, setEvents] = useState<TraceEvent[]>([])

    const handleSearch = () => {
        if (correlationId.trim()) {
            setEvents(MOCK_TRACE.filter((e) => e.metadata?.includes(correlationId.trim()) || e.timeUtc.includes(correlationId)))
        } else {
            setEvents(MOCK_TRACE)
        }
    }

    const displayEvents = events.length > 0 ? events : MOCK_TRACE

    return (
        <CustomFieldset title="Truy vết (Forensic)">
            <Stack gap="md">
                <Text size="sm" c="dimmed">
                    Tìm kiếm theo Correlation ID để theo dõi toàn bộ luồng hành vi của một request. Thời gian UTC.
                </Text>
                <CustomTextInput
                    label="Correlation ID"
                    placeholder="Nhập Correlation ID"
                    value={correlationId}
                    onChange={(e) => setCorrelationId(e.currentTarget.value)}
                />
                <Button onClick={handleSearch}>Tìm kiếm</Button>
                <Table withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Time (UTC)</Table.Th>
                            <Table.Th>Service</Table.Th>
                            <Table.Th>Action</Table.Th>
                            <Table.Th>Result</Table.Th>
                            <Table.Th>Metadata</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {displayEvents.map((e, i) => (
                            <Table.Tr key={i}>
                            <Table.Td>
                                {dateUtils.toDateTime(e.timeUtc, true)}
                            </Table.Td>
                                <Table.Td>{e.service}</Table.Td>
                                <Table.Td>{e.action}</Table.Td>
                                <Table.Td>{e.result}</Table.Td>
                                <Table.Td>
                                    <Text size="sm" c="dimmed">
                                        {e.metadata ?? "—"}
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Stack>
        </CustomFieldset>
    )
}
