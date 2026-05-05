'use client'

import { appConfig } from "@/shared/configs/appConfig"
import { menuData } from "@/shared/consts/data/menuData"
import { AuthenticateSSOHandler } from "@aq-fe/core-ui/features/authenticate/AuthenticateSSOHandler"
import { Suspense } from 'react'

function SSOContent() {
    return (
        <AuthenticateSSOHandler
            aqModule={appConfig.aqModule}
            siteUrl={appConfig.alias}
            menuData={menuData}
        />
    )
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <SSOContent />
        </Suspense>
    )
}