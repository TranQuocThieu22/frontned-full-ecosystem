"use client"

import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import CustomSimpleGrid from "@aq-fe/core-ui/shared/components/layout/CustomSimpleGrid"
import { Button, Group, Stack, Switch, Table, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { IconPlugConnected } from "@tabler/icons-react"

const PROTOCOL_OPTIONS = [
    { value: "OIDC", label: "OIDC (OpenID Connect)" },
    { value: "SAML2", label: "SAML 2.0" },
    { value: "LDAP", label: "LDAP" },
]

const SAE_ATTRIBUTES = [
    { value: "student_code", label: "Mã sinh viên (student_code)" },
    { value: "email", label: "Email" },
    { value: "full_name", label: "Họ tên (full_name)" },
    { value: "faculty", label: "Khoa (faculty)" },
    { value: "cohort", label: "Khóa (cohort)" },
]

const MOCK_MAPPINGS = [
    { idpAttribute: "ext_student_id", saeAttribute: "student_code" },
    { idpAttribute: "email", saeAttribute: "email" },
    { idpAttribute: "display_name", saeAttribute: "full_name" },
    { idpAttribute: "department", saeAttribute: "faculty" },
]

export default function IntegrationIdPM2MIdPWizard() {
    const [protocol, setProtocol] = useState<string>("OIDC")
    const [enabled, setEnabled] = useState(false)
    const [testResult, setTestResult] = useState<"idle" | "success" | "error">("idle")
    const [mappings, setMappings] = useState(MOCK_MAPPINGS)

    const form = useForm({
        initialValues: {
            clientId: "",
            clientSecret: "",
            discoveryEndpoint: "https://idp.example.com/.well-known/openid-configuration",
            authorizeUrl: "",
            tokenUrl: "",
        },
    })

    const handleTestConnection = () => {
        setTestResult("idle")
        setTimeout(() => setTestResult("success"), 800)
    }

    return (
        <Stack gap="lg">
            <CustomFieldset title="Bước 1: Chọn giao thức kết nối">
                <CustomSelect
                    label="Loại giao thức"
                    description="OIDC và SAML 2.0 cho SSO; LDAP cho thư mục nội bộ."
                    data={PROTOCOL_OPTIONS}
                    value={protocol}
                    onChange={(v) => setProtocol(v ?? "OIDC")}
                />
            </CustomFieldset>

            <CustomFieldset title="Bước 2: Thông tin kỹ thuật">
                <CustomSimpleGrid cols={{ base: 1, md: 2 }}>
                    <CustomTextInput
                        label="Client ID"
                        placeholder="client-id từ IdP"
                        {...form.getInputProps("clientId")}
                    />
                    <CustomTextInput
                        label="Client Secret"
                        type="password"
                        placeholder="••••••••"
                        description="Thông tin nhạy cảm – luôn được che (masking) trên giao diện."
                        {...form.getInputProps("clientSecret")}
                    />
                    <CustomTextInput
                        label="Discovery Endpoint"
                        placeholder="https://idp.example.com/.well-known/openid-configuration"
                        {...form.getInputProps("discoveryEndpoint")}
                    />
                    <CustomTextInput
                        label="Authorize URL"
                        placeholder="https://idp.example.com/authorize"
                        {...form.getInputProps("authorizeUrl")}
                    />
                    <CustomTextInput
                        label="Token URL"
                        placeholder="https://idp.example.com/token"
                        {...form.getInputProps("tokenUrl")}
                    />
                </CustomSimpleGrid>
            </CustomFieldset>

            <CustomFieldset title="Bước 3: Ánh xạ thuộc tính (Claims Mapping)">
                <Text size="sm" c="dimmed" mb="xs">
                    Ánh xạ thuộc tính từ IdP ngoại vào thuộc tính hệ thống SAE.
                </Text>
                <Table withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Thuộc tính từ IdP</Table.Th>
                            <Table.Th>Thuộc tính trong hệ thống SAE</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {mappings.map((row, i) => (
                            <Table.Tr key={i}>
                                <Table.Td>{row.idpAttribute}</Table.Td>
                                <Table.Td>{SAE_ATTRIBUTES.find((a) => a.value === row.saeAttribute)?.label ?? row.saeAttribute}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                <Button variant="light" size="xs" mt="xs">
                    Thêm dòng ánh xạ
                </Button>
            </CustomFieldset>

            <CustomFieldset title="Trình quản lý trạng thái">
                <Group>
                    <Switch
                        label="Bật tích hợp IdP cho tenant này"
                        checked={enabled}
                        onChange={(e) => setEnabled(e.currentTarget.checked)}
                    />
                    <Button
                        leftSection={<IconPlugConnected size={16} />}
                        variant="light"
                        onClick={handleTestConnection}
                    >
                        Kiểm tra kết nối (Test Connection)
                    </Button>
                    {testResult === "success" && (
                        <Text size="sm" c="green">
                            Kết nối thành công.
                        </Text>
                    )}
                    {testResult === "error" && (
                        <Text size="sm" c="red">
                            Kết nối thất bại. Kiểm tra Client ID/Secret và URL.
                        </Text>
                    )}
                </Group>
            </CustomFieldset>

            <Group>
                <Button>Lưu cấu hình</Button>
                <Button variant="subtle">Hủy</Button>
            </Group>
        </Stack>
    )
}
