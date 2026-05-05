"use client"

import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore"
import { CustomBoxesBackground } from "@aq-fe/core-ui/shared/components/layout/CustomBoxesBackground"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const router = useRouter()
  const authenticateStore = useAuthenticateStore()

  useEffect(() => {
    if (authenticateStore.state.token) {
      router.push("/admin/dashboard")
    } else {
      router.push("/auth/login")
    }
  }, [router, authenticateStore.state.token])

  return (
    <CustomBoxesBackground title="Hệ thống quản trị IAM" />
  )
}
