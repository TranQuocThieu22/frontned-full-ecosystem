"use client"
import { menuData } from '@/data/adminMenuData'
import { APP_CONFIG } from '@/shared/configs/appConfig'
import { AuthenticateSSOHandler } from '@aq-fe/core-ui/features/authenticate/AuthenticateSSOHandler'
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const permissionStore = usePermissionStore()
    return (
        <AuthenticateSSOHandler
            aqModule={APP_CONFIG.aqModule}
            siteUrl={APP_CONFIG.alias}
            menuData={menuData}
            onSuccessNavigateFollowRole={(data, firstPagePermission) => {
                // Điều hướng tùy theo role
                if (data?.roleIds?.[0] === 1) {
                    permissionStore.setProperty("isSuperAdmin", true)
                    router.push("/student/activity-planning");
                } else {
                    if (firstPagePermission?.link == undefined) {
                        router.push("/admin/noPermission")
                        return
                    }
                    router.push("/admin/" + firstPagePermission?.link)
                }

            }}
        />
    )
}
