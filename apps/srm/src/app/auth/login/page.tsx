"use client"
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { AuthenticateLogin } from "@aq-fe/core-ui/features/authenticate/AuthenticateLogin";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();
    const permissionStore = usePermissionStore()
    return (
        <AuthenticateLogin
            siteUrl={APP_CONFIG.alias}
            redirectUrlAfterLogin="/admin/dashboard"
            onSuccess={(data) => {
                if (data?.data?.userId?.toString() == APP_CONFIG.supperAdminId) {
                    permissionStore.setProperty("isSuperAdmin", true)
                }
                router.push("/admin/accountManagement");
            }}
        />
    )
}
