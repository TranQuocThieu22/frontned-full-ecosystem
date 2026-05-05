"use client"

import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs"
import SystemConfigSessionTokenTab from "./SystemConfigSessionTokenTab"
import SystemConfigSecurityTab from "./SystemConfigSecurityTab"

export default function SystemConfigurationFeature() {
    return (
        <CustomTabs
            tabs={[
                { label: "Session & Token", children: <SystemConfigSessionTokenTab /> },
                { label: "Security", children: <SystemConfigSecurityTab /> },
            ]}
        />
    )
}