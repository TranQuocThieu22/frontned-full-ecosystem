"use client"
import { APP_CONFIG } from "@/shared/configs/appConfig";
import { AuthenticateLogin } from "@aq-fe/core-ui/features/authenticate/AuthenticateLogin";
import { useStore_Permission } from "aq-fe-framework/stores";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const permissionStore = useStore_Permission()
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
