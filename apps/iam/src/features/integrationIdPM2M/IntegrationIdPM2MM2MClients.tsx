"use client"

import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable"
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils"
import { Badge, Button, Checkbox, Group, Stack, Table, Text } from "@mantine/core"
import { useMemo, useState } from "react"
import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal"
import { useDisclosure } from "@mantine/hooks"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea"

interface M2MClient {
    id: number
    name: string
    description: string
    tenantCode: string
    secretExpiresAt: string
    scopes: string[]
}

const M2M_SCOPES = [
    { value: "student.read", label: "student.read – Đọc danh sách sinh viên" },
    { value: "student.write", label: "student.write – Cập nhật thông tin SV" },
    { value: "activity.read", label: "activity.read – Đọc hoạt động" },
    { value: "activity.write", label: "activity.write – Ghi hoạt động" },
    { value: "grade.read", label: "grade.read – Đọc điểm" },
    { value: "grade.write", label: "grade.write – Nhập/sửa điểm" },
]

const MOCK_CLIENTS: M2MClient[] = [
    {
        id: 1,
        name: "Hệ thống điểm danh",
        description: "Lấy danh sách SV và ghi nhận điểm danh",
        tenantCode: "DAV",
        secretExpiresAt: "2026-12-31T23:59:59Z",
        scopes: ["student.read", "activity.write"],
    },
    {
        id: 2,
        name: "Portal sinh viên",
        description: "Đọc điểm và hoạt động",
        tenantCode: "DAV",
        secretExpiresAt: "2026-06-30T23:59:59Z",
        scopes: ["student.read", "grade.read", "activity.read"],
    },
]

export default function IntegrationIdPM2MM2MClients() {
    const createModal = useDisclosure()
    const [selectedScopes, setSelectedScopes] = useState<string[]>([])
    const [secretGenerated, setSecretGenerated] = useState(false)

    const query = useCustomReactQuery<M2MClient[]>({
        queryKey: ["m2m-clients"],
        isPrototype: true,
        mockData: MOCK_CLIENTS,
    })

    const columns = useMemo<CustomColumnDef<M2MClient>[]>(() => [
        { header: "Tên ứng dụng", accessorKey: "name" },
        { header: "Tenant sở hữu", accessorKey: "tenantCode" },
        {
            header: "Ngày hết hạn Secret",
            accessorKey: "secretExpiresAt",
            Cell: ({ row }) =>
                row.original.secretExpiresAt
                    ? dateUtils.toDDMMYYYY(row.original.secretExpiresAt)
                    : "—",
        },
        {
            header: "Scopes",
            accessorKey: "scopes",
            Cell: ({ row }) => (
                <Group gap={4}>
                    {row.original.scopes?.map((s) => (
                        <Badge key={s} size="sm" variant="light">
                            {s}
                        </Badge>
                    ))}
                </Group>
            ),
        },
    ], [])

    const openCreate = () => {
        setSelectedScopes([])
        setSecretGenerated(false)
        createModal[1].open()
    }

    return (
        <Stack gap="md">
            <CustomFieldset title="Danh sách ứng dụng tích hợp (Integration Clients)">
                <CustomDataTable
                    columns={columns}
                    data={query.data ?? []}
                    enablePagination
                    renderTopToolbarCustomActions={() => (
                        <CustomButton actionType="create" onClick={openCreate}>
                            Tạo mới Client
                        </CustomButton>
                    )}
                    renderRowActions={({ row }) => (
                        <CustomCenterFull>
                            <Button variant="subtle" size="xs" color="orange">
                                Rotate Secret
                            </Button>
                        </CustomCenterFull>
                    )}
                />
            </CustomFieldset>

            <CustomModal
                disclosure={createModal}
                title="Tạo mới Client M2M"
                size="42em"
                description="Cấp Client ID và Secret cho hệ thống bên ngoài. Secret chỉ hiển thị một lần khi tạo."
            >
                <Stack gap="md">
                    <CustomTextInput label="Tên ứng dụng" placeholder="VD: Hệ thống điểm danh" />
                    <CustomTextArea label="Mô tả" placeholder="Mục đích sử dụng" />

                    <CustomFieldset title="Scopes (Phạm vi quyền)">
                        <Text size="sm" c="dimmed" mb="xs">
                            Chọn quyền mà ứng dụng được phép gọi API.
                        </Text>
                        <Stack gap="xs">
                            {M2M_SCOPES.map(({ value, label }) => (
                                <Checkbox
                                    key={value}
                                    label={label}
                                    checked={selectedScopes.includes(value)}
                                    onChange={(e) => {
                                        if (e.currentTarget.checked)
                                            setSelectedScopes((prev) => [...prev, value])
                                        else
                                            setSelectedScopes((prev) => prev.filter((s) => s !== value))
                                    }}
                                />
                            ))}
                        </Stack>
                    </CustomFieldset>

                    <CustomFieldset title="Bảo mật">
                        <Stack gap="xs">
                            <CustomButton
                                variant="light"
                                color="orange"
                                onClick={() => setSecretGenerated(true)}
                                disabled={secretGenerated}
                            >
                                Generate Secret
                            </CustomButton>
                            <Text size="xs" c="dimmed">
                                Secret chỉ hiển thị một lần duy nhất khi tạo. Lưu lại ở nơi an toàn.
                            </Text>
                            {secretGenerated && (
                                <Text size="sm" c="dimmed">
                                    Client Secret: <Text span inherit c="red">••••••••••••••••</Text> (đã che – không lưu trên giao diện)
                                </Text>
                            )}
                        </Stack>
                    </CustomFieldset>

                    <Group>
                        <CustomButton>Tạo Client</CustomButton>
                        <CustomButton variant="subtle" onClick={() => createModal[1].close()}>
                            Hủy
                        </CustomButton>
                    </Group>
                </Stack>
            </CustomModal>
        </Stack>
    )
}
