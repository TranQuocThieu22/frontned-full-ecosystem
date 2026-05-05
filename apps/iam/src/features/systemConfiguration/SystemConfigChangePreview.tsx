"use client"

import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import CustomModal from "@aq-fe/core-ui/shared/components/overlays/CustomModal"
import { Alert, Checkbox, Stack, Table } from "@mantine/core"
import type { UseDisclosureReturnValue } from "@mantine/hooks"
import { useEffect, useState } from "react"

export interface SystemConfigChangeItem {
    parameter: string
    oldValue: string
    newValue: string
}

interface SystemConfigChangePreviewProps {
    title: string
    disclosure: UseDisclosureReturnValue
    onConfirm: () => void
    changes: SystemConfigChangeItem[]
    impactWarning?: string
}

export default function SystemConfigChangePreview({
    title,
    disclosure,
    onConfirm,
    changes,
    impactWarning,
}: SystemConfigChangePreviewProps) {
    const [confirmed, setConfirmed] = useState(false)
    const [opened, handlers] = disclosure

    useEffect(() => {
        if (!opened) setConfirmed(false)
    }, [opened])

    const handleConfirm = () => {
        if (!confirmed) return
        onConfirm()
        handlers.close()
    }

    return (
        <CustomModal
            disclosure={disclosure}
            title={title}
        >
            <Stack gap="md">
                <Table withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Tham số</Table.Th>
                            <Table.Th>Giá trị cũ</Table.Th>
                            <Table.Th>Giá trị mới</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {changes.map((c, i) => (
                            <Table.Tr key={i}>
                                <Table.Td>{c.parameter}</Table.Td>
                                <Table.Td>{c.oldValue}</Table.Td>
                                <Table.Td>{c.newValue}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                {impactWarning && (
                    <Alert color="orange" variant="light" title="Cảnh báo tác động">
                        {impactWarning}
                    </Alert>
                )}
                <Checkbox
                    label="Tôi xác nhận việc thay đổi cấu hình hệ thống và hiểu tác động"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.currentTarget.checked)}
                />
                <CustomButton
                    onClick={handleConfirm}
                    disabled={!confirmed}
                >
                    Áp dụng thay đổi
                </CustomButton>
            </Stack>
        </CustomModal>
    )
}
