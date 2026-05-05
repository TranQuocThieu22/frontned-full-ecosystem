"use client";
import { AuthenticateLogin } from "@aq-fe/core-ui/features/authenticate/AuthenticateLogin";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const permissionStore = usePermissionStore()
    return (
        <AuthenticateLogin
            siteUrl="/eaq-internal"
            onSuccess={(data) => {
                if (data?.data?.userId?.toString() == '6') {
                    permissionStore.setProperty("isSuperAdmin", true)
                }
                router.replace("/admin/accountManagement");
            }}
        />
    );
}
