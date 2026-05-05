'use client'
export const dynamic = "force-dynamic"

import MyBoxesBackground from "@/components/Aceternity/BoxesBackground/MyBoxesBackground";
import useS0Auth from "@/stores/S0Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const S0Auth = useS0Auth()

  useEffect(() => {
    if (!S0Auth.state.token) {
      router.push("/auth/login")
    } else {
      router.push("/admin/dashboard")
    }
  }, [S0Auth.state.token])

  return (
    <MyBoxesBackground title="Phần mềm Quản lý Quy trình Biên soạn" />
  );
}
