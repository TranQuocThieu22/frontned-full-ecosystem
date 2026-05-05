'use client'
import { MyBoxesBackground } from "aq-fe-framework/components";
import { useStore_Authenticate } from "aq-fe-framework/modules-features";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const authenticateStore = useStore_Authenticate()
  useEffect(() => {
    if (authenticateStore.state.token == "") {
      router.push("/auth/login")
      return
    }
    router.push("/admin/core71678")

  }, [authenticateStore.state.token])
  return (
    <MyBoxesBackground title="Quản lý đo lường và đánh giá chuẩn đầu ra chương trình đào tạo" />
  );
}
