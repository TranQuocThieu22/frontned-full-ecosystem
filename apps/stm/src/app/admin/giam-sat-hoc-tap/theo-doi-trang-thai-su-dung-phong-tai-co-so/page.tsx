'use client'
import FacilityTrackRoomUsageStatusTable from "@/features/admin/MEFacilityTrackRoomUsageStatus/FacilityTrackRoomUsageStatusTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <FacilityTrackRoomUsageStatusTable />
        </CustomPageContent>
    )
}