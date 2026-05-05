"use client"
import { useStore_Global } from "@/stores/useStore_Global"
import { notifications } from "@mantine/notifications"
import { Feat_Authenticate_Login } from "aq-fe-framework/modules-features"
import { useRouter } from "next/navigation"


export default function Page() {
    const router = useRouter()
    const store = useStore_Global()
    return (
        <Feat_Authenticate_Login
            customSubmit={(username, password) => {
                if (username === "adminaq" && password === "AQtech25") {
                    store.setProperty("isLogin", true)
                    router.replace("/")
                } else {
                    notifications.show({
                        message: "Vui lòng kiểm tra lại tài khoản hoặc mật khẩu",
                        color: "red"
                    })
                }
            }}
        />
    )
}
