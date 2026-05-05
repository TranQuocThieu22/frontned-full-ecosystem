import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_i47273jqpi_ViewCondition from "@/modules-features/admin/i47273jqpi/F_i47273jqpi_ViewCondition";
import F_i47273jqpi_ViewSchedule from "@/modules-features/admin/i47273jqpi/F_i47273jqpi_ViewSchedule";


//i47273jqpi
export default function page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_i47273jqpi_ViewCondition />
                <F_i47273jqpi_ViewSchedule />
            </MyFlexColumn>
        </MyPageContent>
    )
}

