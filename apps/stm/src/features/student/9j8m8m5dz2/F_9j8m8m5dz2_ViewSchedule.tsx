import F_Shared_ViewSchedule from "@/features/shared/ViewSchedule/F_Shared_ViewSchedule";
import useS_Shared_ViewSchedule from "@/features/shared/ViewSchedule/useS_Shared_ViewSchedule";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { useEffect } from "react";

export default function F_9j8m8m5dz2_ViewSchedule() {
  const viewSchedule_store = useS_Shared_ViewSchedule()
  const authenticate_store = useAuthenticateStore()
  useEffect(() => {
    viewSchedule_store.updateFilter({
      studentId: parseInt(authenticate_store.state?.userId?.toString()!)
    })
  }, [authenticate_store.state.userId])
  return (
    <F_Shared_ViewSchedule />
  )
}

