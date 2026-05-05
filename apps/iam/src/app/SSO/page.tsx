'use client'
import { APP_CONFIG } from "@/shared/configs/appConfig"
import { menuData } from "@/shared/consts/data/menuData"
import { AuthenticateSSOHandler } from "@aq-fe/core-ui/features/authenticate/AuthenticateSSOHandler"

export default function Page() {
    return (
        <AuthenticateSSOHandler
            aqModule={APP_CONFIG.aqModule}
            siteUrl={APP_CONFIG.alias}
            menuData={menuData}
        />
    )
}
