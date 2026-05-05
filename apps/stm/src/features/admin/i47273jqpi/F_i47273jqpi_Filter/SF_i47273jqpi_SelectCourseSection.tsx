import MySelect from "@/components/Combobox/Select/MySelect";
import useS_Shared_ViewSchedule from "@/features/shared/ViewSchedule/useS_Shared_ViewSchedule";
import { courseSectionService } from "@/shared/APIs/courseSectionService";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function SF_i47273jqpi_SelectCourseSection() {
    const query = useCustomReactQuery({
        queryKey: ["courseSections"],
        axiosFn: () => courseSectionService.getAll(),
    });
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
