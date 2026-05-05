"use client"
import { Feat_Authenticate_Login } from "@/modules-features/authenticate/Feat_Authenticate_Login";
import { useStore_Permission } from "@/stores/useStore_Permission";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();
    const permissionStore = useStore_Permission()
    return (
        <Feat_Authenticate_Login
            siteUrl="/srm"
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
