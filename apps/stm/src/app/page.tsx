'use client'
import { MyBoxesBackground } from "aq-fe-framework/components";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const S0Auth = useStore_Authenticate()
  useEffect(() => {
    if (S0Auth.state.token == "") {
      router.push("/auth/login")
      return
    }
    router.push("/admin/dashboard")

  }, [S0Auth.state.token])
  return (
    <MyBoxesBackground title="Hệ thống thông tin quản lí đào tạo ngắn hạn" />
  );
}
