"use client";
import { MyBoxesBackground } from "@/components";
import { useStore_Authenticate } from "@/modules-features/authenticate/useStore_Authenticate";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const authenticateStore = useStore_Authenticate();
    useEffect(() => {
        if (authenticateStore.state.token == "") {
            router.push("/test");
            return;
        }
        router.push("/admin/core71678");
    }, [authenticateStore.state.token]);

    return <MyBoxesBackground title="Hệ thống thông tin quản lí đào tạo ngắn hạn" />;
}
