import MySelect from "@/components/Combobox/Select/MySelect"
import useS_Shared_ViewSchedule from "@/features/shared/ViewSchedule/useS_Shared_ViewSchedule"
import useH_i47273jqpi_GetAllRoom from "../hooks/H_i47273jqpi_GetAllRoom"

export default function SF_i47273jqpi_SelectRoom() {
    const query = useH_i47273jqpi_GetAllRoom()
    const viewSchedule_store = useS_Shared_ViewSchedule()
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MySelect
            label="Phòng học"
            data={query.data?.map(item => ({
                label: item.code + " - " + item.name,
                value: item.id?.toString()!
            })) || []}
            value={viewSchedule_store.state.addressId?.toString() ?? ""}
            onChange={(e) => {
                viewSchedule_store.updateFilter({
                    addressId: parseInt(e!)
                })
            }}
        />
    )
}
