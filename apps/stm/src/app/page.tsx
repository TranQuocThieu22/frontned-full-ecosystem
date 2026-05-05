'use client'
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomBoxesBackground } from "@aq-fe/core-ui/shared/components/layout/CustomBoxesBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const S0Auth = useAuthenticateStore()
  useEffect(() => {
    if (S0Auth.state.token == "") {
      router.push("/auth/login")
      return
    }
    router.push("/admin/dashboard")

  }, [S0Auth.state.token])
  return (
    <CustomBoxesBackground title="Hệ thống thông tin quản lí đào tạo ngắn hạn" />
  );
}
