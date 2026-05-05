"use client"

import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs"
import AuditAndLogsAuthorizationLog from "./AuditAndLogsAuthorizationLog"
import AuditAndLogsForensicTrace from "./AuditAndLogsForensicTrace"

export default function AuditAndLogsFeature() {
    return (
        <CustomTabs
            tabs={[
                { label: "Authorization Log", children: <AuditAndLogsAuthorizationLog /> },
                { label: "Truy vết (Forensic)", children: <AuditAndLogsForensicTrace /> },
            ]}
        />
    )
}