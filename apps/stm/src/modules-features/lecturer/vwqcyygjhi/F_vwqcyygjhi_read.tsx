import F_Shared_ViewSchedule from "@/modules-features/shared/ViewSchedule/F_Shared_ViewSchedule"
import useS_Shared_ViewSchedule from "@/modules-features/shared/ViewSchedule/useS_Shared_ViewSchedule"
import { useStore_Authenticate } from "aq-fe-framework/modules-features"
import { useEffect } from "react"
export default function F_vwqcyygjhi_read() {
  const viewSchedule_store = useS_Shared_ViewSchedule()
  const authenticate_store = useStore_Authenticate()
  useEffect(() => {
    if (!authenticate_store.state.userId) return
    viewSchedule_store.updateFilter({
      lecturerId: parseInt(authenticate_store.state.userId?.toString()!)
    })
  }, [authenticate_store.state.userId])
  return (
    <F_Shared_ViewSchedule />
  )
}
