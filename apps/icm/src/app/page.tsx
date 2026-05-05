'use client'
import { MyBoxesBackground } from "aq-fe-framework/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    router.push("/auth/login")
  }, [])
  return (
    <MyBoxesBackground title="icm"></MyBoxesBackground>
  );
}
