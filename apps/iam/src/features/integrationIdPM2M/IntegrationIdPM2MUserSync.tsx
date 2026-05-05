"use client"

import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils"
import { Badge, Button, Group, Stack, Text } from "@mantine/core"
import { useMemo, useState } from "react"
import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal"
import { useDisclosure } from "@mantine/hooks"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"

const CRON_OPTIONS = [
    { value: "manual", label: "Thủ công (chạy khi bấm Đồng bộ)" },
    { value: "daily", label: "Hàng ngày (00:00 UTC)" },
    { value: "weekly", label: "Hàng tuần (Chủ nhật 00:00 UTC)" },
]

interface SyncLog {
    id: number
    runAt: string
    status: "success" | "partial" | "failed"
    successCount: number
    failCount: number
    reason?: string
}

const MOCK_SYNC_LOGS: SyncLog[] = [
    {
        id: 1,
        runAt: "2025-02-26T02:00:00Z",
        status: "success",
        successCount: 150,
        failCount: 0,
    },
    {
        id: 2,
        runAt: "2025-02-25T02:00:00Z",
        status: "partial",
        successCount: 148,
        failCount: 2,
        reason: "Trùng email: 2 bản ghi",
    },
    {
        id: 3,
        runAt: "2025-02-24T02:00:00Z",
        status: "failed",
        successCount: 0,
        failCount: 150,
        reason: "IdP không phản hồi – kiểm tra kết nối",
    },
]

export default function IntegrationIdPM2MUserSync() {
    const [schedule, setSchedule] = useState("manual")
    const previewModal = useDisclosure()

    const query = useCustomReactQuery<SyncLog[]>({
        queryKey: ["user-sync-logs"],
        isPrototype: true,
        mockData: MOCK_SYNC_LOGS,
    })

    const columns = useMemo<CustomColumnDef<SyncLog>[]>(() => [
        {
            header: "Thời gian chạy",
            accessorKey: "runAt",
            Cell: ({ row }) =>
                row.original.runAt
                    ? dateUtils.toDateTime(row.original.runAt, true)
                    : "—",
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            Cell: ({ row }) => (
                <Badge
                    color={
                        row.original.status === "success"
                            ? "green"
                            : row.original.status === "partial"
                                ? "yellow"
                                : "red"
                    }
                    variant="light"
                >
                    {row.original.status === "success"
                        ? "Thành công"
                        : row.original.status === "partial"
                            ? "Một phần"
                            : "Thất bại"}
                </Badge>
            ),
        },
        {
            header: "Thành công",
            accessorKey: "successCount",
        },
        {
            header: "Thất bại",
            accessorKey: "failCount",
        },
        {
            header: "Lý do lỗi",
            accessorKey: "reason",
            Cell: ({ row }) => (
                <Text size="sm" c="dimmed">
                    {row.original.reason ?? "—"}
                </Text>
            ),
        },
    ], [])

    return (
        <Stack gap="lg">
            <CustomFieldset title="Cấu hình lịch trình đồng bộ (Cron)">
                <CustomSelect
                    label="Lịch trình"
                    description="Chọn tần suất đồng bộ người dùng từ hệ thống ngoài."
                    data={CRON_OPTIONS}
                    value={schedule}
                    onChange={(v) => setSchedule(v ?? "manual")}
                />
            </CustomFieldset>

            <CustomFieldset title="Preview & Chạy đồng bộ">
                <Group>
                    <CustomButton variant="light" onClick={() => previewModal[1].open()}>
                        Xem trước dữ liệu (Preview)
                    </CustomButton>
                    <CustomButton onClick={() => {}}>
                        Chạy đồng bộ ngay
                    </CustomButton>
                </Group>
                <Text size="xs" c="dimmed">
                    Preview giúp xem trước bản ghi sẽ thêm/cập nhật trước khi chạy chính thức.
                </Text>
            </CustomFieldset>

            <CustomFieldset title="Báo cáo kết quả (Sync Logs)">
                <CustomDataTable
                    columns={columns}
                    data={query.data ?? []}
                    enablePagination
                />
            </CustomFieldset>

            <CustomModal
                disclosure={previewModal}
                title="Preview đồng bộ"
                size="50em"
                description="Dữ liệu sẽ thay đổi khi chạy đồng bộ. Kiểm tra trước khi xác nhận."
            >
                <Stack gap="md">
                    <Text size="sm">
                        Sẽ thêm mới: <strong>5</strong> user. Cập nhật: <strong>12</strong> user. Không đổi: <strong>133</strong> user.
                    </Text>
                    <Text size="xs" c="dimmed">
                        Chi tiết từng bản ghi có thể mở rộng tại bước chạy đồng bộ.
                    </Text>
                    <CustomButton
                        variant="subtle"
                        onClick={() => previewModal[1].close()}
                    >
                        Đóng
                    </CustomButton>
                </Stack>
            </CustomModal>
        </Stack>
    )
}
