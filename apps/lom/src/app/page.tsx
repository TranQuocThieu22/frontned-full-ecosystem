'use client'
import useS0Auth from "@/stores/S0Auth";
import { CustomBoxesBackground } from "@aq-fe/core-ui/shared/components/layout/CustomBoxesBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const S0Auth = useS0Auth()
  useEffect(() => {
    if (S0Auth.state.token == "") {
      router.push("/auth/login")
      return
    }
    router.push("/admin/core71678")

  }, [S0Auth.state.token])
  return (
    <>
      <CustomBoxesBackground title="Quản lý đo lường và đánh giá chuẩn đầu ra chương trình đào tạo" />
    </>
  );
}
