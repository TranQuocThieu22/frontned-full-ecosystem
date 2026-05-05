"use client"
import { APP_CONFIG } from '@/shared/configs/appConfig'
import { menuDataVerifyProgram } from '@/shared/constants/menuData/menuDataVerifyProgram'
import { AuthenticateSSOHandler } from '@aq-fe/core-ui/features/authenticate/AuthenticateSSOHandler'
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
    const router = useRouter()
    const permissionStore = usePermissionStore()
    useEffect(() => {
        permissionStore.setState({})
    }, [])
    return (
        <AuthenticateSSOHandler
            aqModule={APP_CONFIG.aqModule}
            siteUrl={APP_CONFIG.alias}
            menuData={menuDataVerifyProgram}
            onSuccessNavigateFollowRole={(data, firstPagePermission) => {
                if (firstPagePermission?.link == undefined) {
                    router.push("/admin/noPermission")
                    return
                }
                router.push("/admin/" + firstPagePermission?.link)
            }}
        />
    )
}
