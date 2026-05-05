"use client"

import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput"
import { Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import SystemConfigChangePreview from "./SystemConfigChangePreview"
import { useDisclosure } from "@mantine/hooks"

interface SessionConfig {
    accessTokenTtlMinutes: number
    refreshTokenTtlDays: number
    sessionIdleMinutes: number
}

const DEFAULT_CONFIG: SessionConfig = {
    accessTokenTtlMinutes: 15,
    refreshTokenTtlDays: 7,
    sessionIdleMinutes: 30,
}

export default function SystemConfigSessionTokenTab() {
    const [saved, setSaved] = useState<SessionConfig>(DEFAULT_CONFIG)
    const form = useForm<SessionConfig>({
        initialValues: saved,
    })
    const previewDisc = useDisclosure(false)

    const hasChange =
        form.values.accessTokenTtlMinutes !== saved.accessTokenTtlMinutes ||
        form.values.refreshTokenTtlDays !== saved.refreshTokenTtlDays ||
        form.values.sessionIdleMinutes !== saved.sessionIdleMinutes

    const handleSave = () => {
        setSaved({ ...form.values })
    }

    return (
        <Stack gap="md">
            <CustomFieldset title="Session & Token">
                <Stack gap="md">
                    <CustomNumberInput
                        label="Access Token TTL (phút)"
                        description="Thời gian sống của Access Token."
                        min={1}
                        {...form.getInputProps("accessTokenTtlMinutes")}
                    />
                    <CustomNumberInput
                        label="Refresh Token TTL (ngày)"
                        min={1}
                        {...form.getInputProps("refreshTokenTtlDays")}
                    />
                    <CustomNumberInput
                        label="Session Idle Timeout (phút)"
                        description="Tự đăng xuất khi không hoạt động."
                        min={5}
                        {...form.getInputProps("sessionIdleMinutes")}
                    />
                    <SystemConfigChangePreview
                        title="Xác nhận thay đổi cấu hình Session & Token"
                        disclosure={previewDisc}
                        onConfirm={handleSave}
                        changes={[
                            {
                                parameter: "Access Token TTL (phút)",
                                oldValue: String(saved.accessTokenTtlMinutes),
                                newValue: String(form.values.accessTokenTtlMinutes),
                            },
                            {
                                parameter: "Refresh Token TTL (ngày)",
                                oldValue: String(saved.refreshTokenTtlDays),
                                newValue: String(form.values.refreshTokenTtlDays),
                            },
                            {
                                parameter: "Session Idle (phút)",
                                oldValue: String(saved.sessionIdleMinutes),
                                newValue: String(form.values.sessionIdleMinutes),
                            },
                        ].filter((c) => c.oldValue !== c.newValue)}
                        impactWarning="Giảm TTL Access Token có thể làm tăng tần suất đăng nhập. Thay đổi có hiệu lực với phiên mới."
                    />
                    <CustomButton
                        onClick={previewDisc[1].open}
                        disabled={!hasChange}
                    >
                        Xem thay đổi & Áp dụng
                    </CustomButton>
                </Stack>
            </CustomFieldset>
        </Stack>
    )
}
