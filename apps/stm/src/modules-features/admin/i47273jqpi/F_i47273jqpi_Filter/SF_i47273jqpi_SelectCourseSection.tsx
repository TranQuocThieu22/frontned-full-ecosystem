import MySelect from "@/components/Combobox/Select/MySelect";
import useQ_CourseSection_GetAll from "@/hooks/query-hooks/CourseSection/useQ_CourseSection_GetAll";
import useS_Shared_ViewSchedule from "@/modules-features/shared/ViewSchedule/useS_Shared_ViewSchedule";

export default function SF_i47273jqpi_SelectCourseSection() {
    const query = useQ_CourseSection_GetAll({
        params: ""
    })
    const store = useS_Shared_ViewSchedule()
    if (query.isLoading) return "Đang tải dữ liệu"
    if (query.isError) return "Có lỗi xảy ra"
    return (
        <MySelect
            label="Chọn lớp"
            data={query.data?.map(item => ({
                label: item.code! + " - " + item.name!,
                value: item.id?.toString()!
            })) || []}
            value={store.state.courseSectionId?.toString() ?? ""}
            onChange={(e) => {
                store.updateFilter({
                    courseSectionId: parseInt(e!)
                })
            }}
        />
    )
}
