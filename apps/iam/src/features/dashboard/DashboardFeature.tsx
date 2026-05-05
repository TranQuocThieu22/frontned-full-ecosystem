"use client"

import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import CustomSimpleGrid from "@aq-fe/core-ui/shared/components/layout/CustomSimpleGrid"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomDataTable, CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject"
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils"
import { Badge, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import { IconShieldLock, IconUsers, IconBuildingSkyscraper, IconClockPlay } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

interface DashboardTenantRow {
    id: number
    code: string
    name: string
    status: "ACTIVE" | "SUSPENDED"
    createdAt: string
}

interface DashboardAuthDecision {
    id: number
    timeUtc: string
    user: string
    action: string
    decision: "ALLOW" | "DENY"
    reason: string
}

interface DashboardSecurityEvent {
    id: number
    type: string
    severity: "low" | "medium" | "high"
    countLastHour: number
}

const DASHBOARD_TENANTS: DashboardTenantRow[] = [
    { id: 1, code: "DAV", name: "Học viện Ngoại giao", status: "ACTIVE", createdAt: "2023-09-01T00:00:00Z" },
    { id: 2, code: "FTU", name: "ĐH Ngoại thương", status: "ACTIVE", createdAt: "2023-10:01T00:00:00Z" },
    { id: 3, code: "HUST", name: "ĐH Bách khoa Hà Nội", status: "ACTIVE", createdAt: "2024-01-15T00:00:00Z" },
    { id: 4, code: "DEMO", name: "Demo tenant", status: "SUSPENDED", createdAt: "2022-12-01T00:00:00Z" },
]

const DASHBOARD_AUTH_DECISIONS: DashboardAuthDecision[] = [
    {
        id: 1,
        timeUtc: "2025-02-26T08:00:10Z",
        user: "admin@dav.edu.vn",
        action: "user:list",
        decision: "ALLOW",
        reason: "TENANT_ADMIN has user.read",
    },
    {
        id: 2,
        timeUtc: "2025-02-26T08:00:20Z",
        user: "sv.2022.0001@dav.edu.vn",
        action: "grade:update",
        decision: "DENY",
        reason: "STUDENT missing grade.write",
    },
    {
        id: 3,
        timeUtc: "2025-02-26T08:00:35Z",
        user: "iam.operator@dav.edu.vn",
        action: "tenant:update",
        decision: "ALLOW",
        reason: "IAM_OPERATOR has tenant.write",
    },
]

const DASHBOARD_SECURITY_EVENTS: DashboardSecurityEvent[] = [
    { id: 1, type: "Đăng nhập thất bại liên tiếp", severity: "high", countLastHour: 12 },
    { id: 2, type: "Brute force login", severity: "high", countLastHour: 3 },
    { id: 3, type: "Đăng nhập từ IP bất thường", severity: "medium", countLastHour: 7 },
]

export default function DashboardFeature() {
    const router = useRouter()
    const tenantColumns = useMemo<CustomColumnDef<DashboardTenantRow>[]>(() => [
        { header: "Mã Tenant", accessorKey: "code" },
        {
            header: "Tên",
            accessorKey: "name",
            size: columnSizeObject.name,
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            Cell: ({ row }) => (
                <Badge color={row.original.status === "ACTIVE" ? "green" : "red"} variant="light">
                    {row.original.status}
                </Badge>
            ),
        },
        {
            header: "Ngày tạo",
            accessorKey: "createdAt",
            Cell: ({ row }) =>
                dateUtils.toDDMMYYYY(row.original.createdAt),
        },
    ], [])

    const authColumns = useMemo<CustomColumnDef<DashboardAuthDecision>[]>(() => [
        {
            header: "Thời gian (UTC)",
            accessorKey: "timeUtc",
            Cell: ({ row }) =>
                dateUtils.toDateTime(row.original.timeUtc, true),
        },
        { header: "User", accessorKey: "user" },
        { header: "Action", accessorKey: "action" },
        {
            header: "Quyết định",
            accessorKey: "decision",
            Cell: ({ row }) => (
                <Badge color={row.original.decision === "ALLOW" ? "green" : "red"} variant="light">
                    {row.original.decision}
                </Badge>
            ),
        },
        { header: "Nguyên nhân", accessorKey: "reason" },
    ], [])

    return (
        <Stack gap="lg">
            <CustomFieldset title="Ngữ cảnh & Nguyên tắc vận hành">
                <CustomSimpleGrid cols={{ base: 1, md: 2 }}>
                    <Stack gap={4}>
                        <Text size="sm" fw={600}>Tenant Context Awareness</Text>
                        <Text size="sm" c="dimmed">
                            Đang xem dashboard trong ngữ cảnh tenant: <strong>DAV</strong>.
                            Super Admin có thể chuyển sang chế độ xem toàn bộ tenants.
                        </Text>
                    </Stack>
                    <Stack gap={4}>
                        <Text size="sm" fw={600}>Security First & Audit-aware</Text>
                        <Text size="sm" c="dimmed">
                            Thông tin nhạy cảm (mật khẩu, token, secret) không hiển thị trực tiếp.
                            Mọi thay đổi cấu hình phải qua bước Preview & Confirm và được ghi vào Audit Log.
                        </Text>
                    </Stack>
                </CustomSimpleGrid>
            </CustomFieldset>

            <SimpleGrid cols={{ base: 1, md: 4 }}>
                <SummaryCard
                    label="Tổng số Tenant"
                    value="12"
                    description="4 đang bật, 1 tạm dừng"
                    icon={<IconBuildingSkyscraper size={20} />}
                    color="blue"
                />
                <SummaryCard
                    label="Người dùng hoạt động"
                    value="1 250"
                    description="70% đăng nhập 30 ngày gần đây"
                    icon={<IconUsers size={20} />}
                    color="teal"
                />
                <SummaryCard
                    label="Sự kiện DENY trong 1h"
                    value="23"
                    description="Cần kiểm tra Security Dashboard"
                    icon={<IconShieldLock size={20} />}
                    color="red"
                />
                <SummaryCard
                    label="Thời gian đáp ứng IAM"
                    value="≤ 1.2s"
                    description="Mục tiêu < 2 giây / request"
                    icon={<IconClockPlay size={20} />}
                    color="grape"
                />
            </SimpleGrid>

            <CustomSimpleGrid cols={{ base: 1, md: 2 }}>
                <CustomFieldset title="Quản lý Tổ chức (Tenant Management)">
                    <Text size="sm" c="dimmed" mb="xs">
                        Top tenant theo trạng thái và ngày tạo. Chi tiết tại màn hình Quản lý Tổ chức.
                    </Text>
                    <CustomDataTable
                        columns={tenantColumns}
                        data={DASHBOARD_TENANTS}
                        enablePagination={false}
                        initialState={{ pagination: { pageIndex: 0, pageSize: 4 } }}
                    />
                    <Group justify="space-between" mt="sm">
                        <Text size="xs" c="dimmed">
                            Màn hình cấu hình Tenant chi tiết cho phép thiết lập Token, Session, IdP riêng.
                        </Text>
                        <CustomButton
                            variant="light"
                            type="button"
                            onClick={() => router.push("/admin/tenants")}
                        >
                            Mở Quản lý Tenant
                        </CustomButton>
                    </Group>
                </CustomFieldset>

                <CustomFieldset title="Người dùng & Phân quyền (User & Access)">
                    <CustomSimpleGrid cols={{ base: 1, md: 2 }}>
                        <Stack gap={4}>
                            <Text size="sm" fw={600}>Tổng quan User</Text>
                            <Text size="sm" c="dimmed">
                                Email, Role chính, trạng thái tài khoản và lần đăng nhập cuối được hiển thị ở
                                màn hình Quản lý Người dùng.
                            </Text>
                        </Stack>
                        <Stack gap={4}>
                            <Text size="sm" fw={600}>RBAC & Scope/ABAC</Text>
                            <Text size="sm" c="dimmed">
                                Giao diện gán role dạng chip/tag và bảng Preview Before → After trước khi lưu.
                                Scope/ABAC cho phép giới hạn theo Khoa, Cơ sở, Khóa,...
                            </Text>
                        </Stack>
                    </CustomSimpleGrid>
                    <Group mt="sm">
                        <CustomButton
                            variant="light"
                            type="button"
                            onClick={() => router.push("/admin/users")}
                        >
                            Mở Quản lý Người dùng
                        </CustomButton>
                        <CustomButton
                            variant="light"
                            type="button"
                            onClick={() => router.push("/admin/roles")}
                        >
                            Mở Quản lý Role & Scope
                        </CustomButton>
                    </Group>
                </CustomFieldset>
            </CustomSimpleGrid>

            <CustomSimpleGrid cols={{ base: 1, md: 2 }}>
                <CustomFieldset title="Giám sát & An ninh (Security & Monitoring)">
                    <Text size="sm" fw={600} mb="xs">
                        Authorization Monitoring (real-time snapshot)
                    </Text>
                    <CustomDataTable
                        columns={authColumns}
                        data={DASHBOARD_AUTH_DECISIONS}
                        enablePagination={false}
                        initialState={{ pagination: { pageIndex: 0, pageSize: 3 } }}
                    />
                    <Text size="sm" fw={600} mt="md" mb={4}>
                        Security Events (SOC-style)
                    </Text>
                    <Stack gap={6}>
                        {DASHBOARD_SECURITY_EVENTS.map((e) => (
                            <Group key={e.id} justify="space-between">
                                <Text size="sm">{e.type}</Text>
                                <Group gap={6}>
                                    <Badge
                                        size="sm"
                                        color={
                                            e.severity === "high"
                                                ? "red"
                                                : e.severity === "medium"
                                                    ? "yellow"
                                                    : "green"
                                        }
                                        variant="light"
                                    >
                                        {e.severity.toUpperCase()}
                                    </Badge>
                                    <Text size="sm" c="dimmed">
                                        {e.countLastHour} sự kiện / 1h
                                    </Text>
                                </Group>
                            </Group>
                        ))}
                    </Stack>
                    <Group mt="sm">
                        <CustomButton
                            variant="light"
                            type="button"
                            onClick={() => router.push("/admin/auditAndLogs")}
                        >
                            Mở Authorization Log
                        </CustomButton>
                        <CustomButton
                            variant="light"
                            type="button"
                            onClick={() => router.push("/admin/auditAndLogs")}
                        >
                            Mở Audit & Forensic
                        </CustomButton>
                    </Group>
                </CustomFieldset>

                <CustomFieldset title="Cấu hình Hệ thống (System Configuration)">
                    <Text size="sm" c="dimmed" mb="xs">
                        Read-only by default – chỉnh sửa chi tiết tại màn hình Cấu hình Hệ thống & Bảo mật.
                    </Text>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <ConfigInfoCard
                            title="Session & Token"
                            items={[
                                "Access Token TTL: 15 phút",
                                "Refresh Token TTL: 7 ngày",
                                "Session idle timeout: 30 phút",
                            ]}
                        />
                        <ConfigInfoCard
                            title="Authentication & MFA"
                            items={[
                                "Password: tối thiểu 8 ký tự, có chữ hoa & ký tự đặc biệt",
                                "MFA: Bắt buộc với role quản trị",
                            ]}
                        />
                        <ConfigInfoCard
                            title="Network & API Security"
                            items={[
                                "IP allowlist: Văn phòng + VPN",
                                "Rate limit: 1000 req/phút/tenant (override per service)",
                            ]}
                        />
                        <ConfigInfoCard
                            title="Audit & Forensic"
                            items={[
                                "Audit log: append-only, lưu tối thiểu 1 năm",
                                "Mọi thay đổi có Correlation ID để truy vết",
                            ]}
                        />
                    </SimpleGrid>
                    <Group mt="sm">
                        <CustomButton
                            variant="light"
                            type="button"
                            onClick={() => router.push("/admin/systemConfiguration")}
                        >
                            Mở Cấu hình Hệ thống
                        </CustomButton>
                    </Group>
                </CustomFieldset>
            </CustomSimpleGrid>
        </Stack>
    )
}

function SummaryCard({
    label,
    value,
    description,
    icon,
    color,
}: {
    label: string
    value: string
    description: string
    icon: React.ReactNode
    color: string
}) {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
                <Text size="sm" c="dimmed">
                    {label}
                </Text>
                <Badge color={color} variant="light">
                    {icon}
                </Badge>
            </Group>
            <Text fw={700} fz="xl">
                {value}
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
                {description}
            </Text>
        </Card>
    )
}

function ConfigInfoCard({ title, items }: { title: string; items: string[] }) {
    return (
        <Stack gap={4}>
            <Text fw={600} size="sm">
                {title}
            </Text>
            {items.map((item, idx) => (
                <Text key={idx} size="xs" c="dimmed">
                    • {item}
                </Text>
            ))}
        </Stack>
    )
}

