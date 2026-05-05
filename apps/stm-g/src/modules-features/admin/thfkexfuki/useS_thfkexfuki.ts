import useQ_UserDashboard_GetStudentDashboard from "@/hooks/query-hooks/UserDashboard/useQ_UserDashboard_GetStudentDashboard";
import { useS_Shared_FilterStudent } from "@/modules-features/shared/FilterStudent/useS_FilterStudent";
import { IUserDashboardData } from "@/modules-features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import { createGenericStore } from "@/stores/CreateGenericStore";
import { useEffect } from "react";

interface I {
    studentDashboard?: IUserDashboardData
}

const useStore = createGenericStore<I>({
    initialState: {},
    storageKey: "useS_thfkexfuki"
})

export function useS_thfkexfuki() {
    const store = useStore()
    const filterStudent_store = useS_Shared_FilterStudent()
    const getStudentDashboard_query = useQ_UserDashboard_GetStudentDashboard({
        params: "?id=" + filterStudent_store.state.userId,
        options: {
            enabled: filterStudent_store.state.userId != 0
        }
    })
    useEffect(() => {
        if (!getStudentDashboard_query.data) return
        store.setProperty("studentDashboard", getStudentDashboard_query.data)
    }, [getStudentDashboard_query.data])
    return {
        ...store,
    }
}