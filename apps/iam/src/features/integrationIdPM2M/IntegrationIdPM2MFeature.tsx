"use client"

import { Alert, Stack } from "@mantine/core"
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs"
import IntegrationIdPM2MIdPWizard from "./IntegrationIdPM2MIdPWizard"
import IntegrationIdPM2MM2MClients from "./IntegrationIdPM2MM2MClients"
import IntegrationIdPM2MUserSync from "./IntegrationIdPM2MUserSync"

const CURRENT_TENANT = "DAV"

export default function IntegrationIdPM2MFeature() {
    return (
        <Stack gap="md">
            <Alert color="blue" variant="light" title="Ngữ cảnh Tenant">
                Đang cấu hình tích hợp cho: <strong>{CURRENT_TENANT}</strong>. Mọi thay đổi chỉ áp dụng cho tenant này.
            </Alert>
            <CustomTabs
                tabs={[
                    {
                        label: "Tích hợp IdP (Nhà cung cấp định danh)",
                        children: <IntegrationIdPM2MIdPWizard />,
                    },
                    {
                        label: "M2M (Machine to Machine)",
                        children: <IntegrationIdPM2MM2MClients />,
                    },
                    {
                        label: "Đồng bộ người dùng (User Sync)",
                        children: <IntegrationIdPM2MUserSync />,
                    },
                ]}
            />
        </Stack>
    )
}
