'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_i47273jqpi_ViewCondition from "@/modules-features/admin/i47273jqpi/F_i47273jqpi_Filter/F_i47273jqpi_Filter";
import F_Shared_ViewSchedule from "@/modules-features/shared/ViewSchedule/F_Shared_ViewSchedule";


//weeklySchedule
export default function Page() {
    return (
        <MyPageContent>
            <MyFlexColumn>
                <F_i47273jqpi_ViewCondition />
                <F_Shared_ViewSchedule />
            </MyFlexColumn>
        </MyPageContent>
    )
}

