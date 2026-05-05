
"use client";
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
                if (data?.data?.userId?.toString() == "1") {
                    router.replace("/admin/accountManagement");
                    permissionStore.setProperty("isSuperAdmin", true)
                    return
                }
                if (data?.data?.roleIds?.[0] == 1) {
                    permissionStore.setProperty("isSuperAdmin", true)
                    router.push("/student/activity-planning");
                } else {
                    router.push("/admin/dashboard");
                }
            }}
        />
    );
}

