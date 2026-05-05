'use client'
import { CustomBoxesBackground } from "@aq-fe/core-ui/shared/components/layout/CustomBoxesBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    router.push("/auth/login")
  }, [])
  return (
    <CustomBoxesBackground title="Quản lí nghiên cứu khoa học" />
  );
}
