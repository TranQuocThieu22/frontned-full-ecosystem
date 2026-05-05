import { useS_Shared_FilterStudent } from "@/features/shared/FilterStudent/useS_FilterStudent";
import { IUserDashboardData } from "@/features/student/emsiqqmzrm/interfaces/StudentDashBoard";
import { userDashboardStudentService } from "@/shared/APIs/userDashboardStudentService";
import { createGenericStore } from "@/stores/CreateGenericStore";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
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
    const getStudentDashboard_query = useCustomReactQuery({
        queryKey: ["studentDashboard", filterStudent_store.state.userId],
        axiosFn: () =>
            userDashboardStudentService.getStudentDashboard({
                params: "?id=" + filterStudent_store.state.userId,
            }),
        options: {
            enabled: filterStudent_store.state.userId != 0,
        },
    })
    useEffect(() => {
        if (!getStudentDashboard_query.data) return
        store.setProperty("studentDashboard", getStudentDashboard_query.data)
    }, [getStudentDashboard_query.data])
    return {
        ...store,
    }
}