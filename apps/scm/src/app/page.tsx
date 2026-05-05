'use client'
import MyBoxesBackground from "@/components/Aceternity/BoxesBackground/MyBoxesBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    router.push("/auth/login")
  }, [])
  return (
    <MyBoxesBackground></MyBoxesBackground>
  );
}
