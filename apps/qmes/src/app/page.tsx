'use client'
import MyBoxesBackground from "@/components/ui/BoxesBackground/MyBoxesBackground";
import { useS0Auth } from "@/stores/S0Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  const S0Auth = useS0Auth()
  useEffect(() => {
    if (S0Auth.token == "") {
      router.push("/auth/login")
      return
    }
    router.push("/admin/dashboard")

  }, [S0Auth.token])
  return (
    <MyBoxesBackground title={""}></MyBoxesBackground>
  );
}
