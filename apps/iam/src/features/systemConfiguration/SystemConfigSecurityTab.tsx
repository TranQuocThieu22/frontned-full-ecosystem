"use client"

import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { Checkbox, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import SystemConfigChangePreview, {
    type SystemConfigChangeItem,
} from "./SystemConfigChangePreview"
import SystemConfigIpListSection from "./SystemConfigIpListSection"
import { useDisclosure } from "@mantine/hooks"

interface SecurityConfig {
    passwordMinLength: number
    requireUppercase: boolean
    requireSpecialChar: boolean
    passwordExpiryDays: number
    requireMfa: boolean
    ipAllowlist: string
    ipBlocklist: string
}

const DEFAULT: SecurityConfig = {
    passwordMinLength: 8,
    requireUppercase: true,
    requireSpecialChar: true,
    passwordExpiryDays: 90,
    requireMfa: false,
    ipAllowlist: "",
    ipBlocklist: "",
}

export default function SystemConfigSecurityTab() {
    const [saved, setSaved] = useState<SecurityConfig>(DEFAULT)
    const form = useForm<SecurityConfig>({ initialValues: saved })
    const previewDisc = useDisclosure(false)

    const changes: SystemConfigChangeItem[] = []
    if (form.values.passwordMinLength !== saved.passwordMinLength)
        changes.push({
            parameter: "Độ dài mật khẩu tối thiểu",
            oldValue: String(saved.passwordMinLength),
            newValue: String(form.values.passwordMinLength),
        })
    if (form.values.requireMfa !== saved.requireMfa)
        changes.push({
            parameter: "Yêu cầu MFA",
            oldValue: saved.requireMfa ? "Có" : "Không",
            newValue: form.values.requireMfa ? "Có" : "Không",
        })

    if (form.values.ipAllowlist !== saved.ipAllowlist)
        changes.push({
            parameter: "IP Allowlist",
            oldValue: saved.ipAllowlist || "—",
            newValue: form.values.ipAllowlist || "—",
        })

    if (form.values.ipBlocklist !== saved.ipBlocklist)
        changes.push({
            parameter: "IP Blocklist",
            oldValue: saved.ipBlocklist || "—",
            newValue: form.values.ipBlocklist || "—",
        })

    const hasChange = changes.length > 0

    return (
        <Stack gap="md">
            <CustomFieldset title="Password policy">
                <Stack gap="md">
                    <CustomNumberInput
                        label="Độ dài tối thiểu"
                        min={6}
                        {...form.getInputProps("passwordMinLength")}
                    />
                    <Checkbox
                        label="Bắt buộc chữ hoa"
                        {...form.getInputProps("requireUppercase", {
                            type: "checkbox",
                        })}
                    />
                    <Checkbox
                        label="Bắt buộc ký tự đặc biệt"
                        {...form.getInputProps("requireSpecialChar", {
                            type: "checkbox",
                        })}
                    />
                    <CustomNumberInput
                        label="Hết hạn mật khẩu (ngày)"
                        min={0}
                        {...form.getInputProps("passwordExpiryDays")}
                    />
                </Stack>
            </CustomFieldset>
            <CustomFieldset title="MFA">
                <Checkbox
                    label="Yêu cầu MFA"
                    {...form.getInputProps("requireMfa", { type: "checkbox" })}
                />
            </CustomFieldset>
            <CustomFieldset title="IP Allowlist / Blocklist">
                <SystemConfigIpListSection
                    allowlist={form.values.ipAllowlist}
                    blocklist={form.values.ipBlocklist}
                    onChangeAllowlist={(value) =>
                        form.setFieldValue("ipAllowlist", value)
                    }
                    onChangeBlocklist={(value) =>
                        form.setFieldValue("ipBlocklist", value)
                    }
                />
            </CustomFieldset>
            <SystemConfigChangePreview
                title="Xác nhận thay đổi cấu hình Bảo mật"
                onConfirm={() => {
                    setSaved({ ...form.values })
                }}
                disclosure={previewDisc}
                changes={changes}
                impactWarning="Thay đổi password policy áp dụng cho user mới và lần đổi mật khẩu tiếp theo. MFA bắt buộc sẽ yêu cầu user bật MFA khi đăng nhập."
            />
            <CustomButton
                onClick={previewDisc[1].open}
                disabled={!hasChange}
            >
                Xem thay đổi & Áp dụng
            </CustomButton>
        </Stack>
    )
}
