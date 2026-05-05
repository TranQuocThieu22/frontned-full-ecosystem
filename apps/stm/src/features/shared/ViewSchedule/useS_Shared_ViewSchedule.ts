import { createGenericStore } from "@/stores/CreateGenericStore";

export const c_i47273jqpi_filterType = ['Giảng viên', 'Lớp', 'Phòng']
interface I {
    anChuNhat?: boolean,
    lecturerId?: number,
    studentId?: number,
    courseSectionId?: number,
    addressId?: number
    currentFilterType?: string
}

const useStore = createGenericStore<I>({
    initialState: {
        anChuNhat: false,
        addressId: 0,
        courseSectionId: 0,
        lecturerId: 0,
        studentId: 0
    },
})

export default function useS_Shared_ViewSchedule() {
    const store = useStore()
    const updateFilter = (payload: {
        lecturerId?: number;
        studentId?: number;
        courseSectionId?: number;
        addressId?: number;
    }) => {
        const defaultReset = {
            lecturerId: 0,
            studentId: 0,
            courseSectionId: 0,
            addressId: 0,
        }

        const key = Object.keys(payload)[0] as keyof typeof defaultReset
        const value = payload[key]

        if (value === undefined) return

        store.setState({
            ...defaultReset,
            [key]: value,
        })
    }
    return {
        ...store,
        updateFilter,
    }
}