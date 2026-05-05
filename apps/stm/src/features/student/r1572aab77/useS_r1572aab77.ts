import { createGenericStore } from "@/stores/CreateGenericStore";

interface IAttendanceDetails {
    status?: number,
    studyDate?: Date
    lecturerReview?: string
}

interface I {
    attendanceDetails?: IAttendanceDetails[]
    courseName?: string
    currentCourseId?: number
}

const useStore = createGenericStore<I>({
    initialState: {
        attendanceDetails: [],
        currentCourseId: 0
    },
    storageKey: "useS_r1572aab77"
})

export function useS_r1572aab77() {
    const store = useStore()
    return {
        ...store
    }
}