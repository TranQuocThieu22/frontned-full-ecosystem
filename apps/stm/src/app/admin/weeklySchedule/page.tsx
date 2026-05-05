'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import F_i47273jqpi_ViewCondition from "@/features/admin/i47273jqpi/F_i47273jqpi_Filter/F_i47273jqpi_Filter";
import F_Shared_ViewSchedule from "@/features/shared/ViewSchedule/F_Shared_ViewSchedule";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";


//weeklySchedule
export default function Page() {
    return (
        <CustomPageContent>
            <MyFlexColumn>
                <F_i47273jqpi_ViewCondition />
                <F_Shared_ViewSchedule />
            </MyFlexColumn>
        </CustomPageContent>
    )
}

