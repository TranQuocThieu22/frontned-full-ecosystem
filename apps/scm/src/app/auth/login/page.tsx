"use client"
import { Feat_Authenticate_Login } from "aq-fe-framework/modules-features";
import { useStore_Permission } from "aq-fe-framework/stores";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();
    const permissionStore = useStore_Permission()
    return (
        <Feat_Authenticate_Login
            siteUrl="/scm"
            
            redirectUrlAfterLogin="/admin/dashboard"
            onSuccess={(data) => {
                if (data?.data?.userId?.toString() == "5") {
                    permissionStore.setProperty("isSuperAdmin", true)
                }
                router.push("/admin/accountManagement");
            }}
        />
    )
}
