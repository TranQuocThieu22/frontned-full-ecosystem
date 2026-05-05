import MySelect from "@/components/Combobox/Select/MySelect";
import useS_Shared_ViewSchedule from "@/features/shared/ViewSchedule/useS_Shared_ViewSchedule";
import useH_i47273jqpi_GetAllLecturer from "../hooks/H_i47273jqpi_GetAllLecturer";

export default function SF_i47273jqpi_SelectLecurer() {
    const queryHook = useH_i47273jqpi_GetAllLecturer()
    const store = useS_Shared_ViewSchedule()
    if (queryHook.isLoading) return "Đang tải dữ liệu"
    if (queryHook.isError) return "Có lỗi xảy ra"
    return (
        <MySelect
            label="Chọn giảng viên"
            data={queryHook.data?.map(item => ({
                label: item.code! + " - " + item.fullName!,
                value: item.id?.toString()!
            })) || []}
            value={store.state.lecturerId?.toString() ?? ""}
            onChange={(e) => {
                store.updateFilter({
                    lecturerId: parseInt(e!)
                })
            }}
        />
    )
}
