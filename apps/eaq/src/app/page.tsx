'use client'
import { CustomBoxesBackground } from "@aq-fe/core-ui/shared/components/layout/CustomBoxesBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  // useEffect(() => {
  //   if (authenStore.state.token == "") {
  //     router.replace("/auth/login");
  //     return
  //   }
  //   router.push("/admin/accountManagement")

  // }, [authenStore.state.token])
  useEffect(() => {
    router.push("/auth/login")
  }, [])
  return (
    <CustomBoxesBackground title="Phần mềm Quản lý Minh chứng Kiểm định" />
  );
}
