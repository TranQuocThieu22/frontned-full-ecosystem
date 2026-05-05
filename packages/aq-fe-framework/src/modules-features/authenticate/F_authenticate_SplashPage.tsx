'use client'
import { MyBoxesBackground } from "@/components";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";
import { useStore_Authenticate } from "./useStore_Authenticate";

export function F_authenticate_SplashPage() {
    const router = useRouter()
    const authenticateStore = useStore_Authenticate()
    useEffect(() => {
        if (authenticateStore.state.token == "") {
            router.push("/authenticate/login")
            return
        }
        router.push("/admin/core71678")

    }, [authenticateStore.state.token])
    return (
        <MyBoxesBackground title="Hệ thống thông tin quản lí đào tạo ngắn hạn" />
    );
}
