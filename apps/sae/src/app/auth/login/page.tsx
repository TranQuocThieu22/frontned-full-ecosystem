
"use client";
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { AuthenticateLogin } from "@aq-fe/core-ui/features/authenticate/AuthenticateLogin";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const permissionStore = usePermissionStore()
    const [googleClientId, setGoogleClientId] = useState<string>("1035478198325-aducuidqd14or1c2ab402182k2pjutph.apps.googleusercontent.com");

    // useEffect(() => {
    //     service_account.getGoogleSetting().then((res) => {
    //         if (res.data?.data?.clientId) {
    //             setGoogleClientId(res.data.data.clientId);
    //         }
    //     }).catch(err => console.error("Failed to fetch google settings", err));
    // }, []);

    return (
        <AuthenticateLogin
            siteUrl={APP_CONFIG.alias}
            googleClientId={googleClientId}
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

