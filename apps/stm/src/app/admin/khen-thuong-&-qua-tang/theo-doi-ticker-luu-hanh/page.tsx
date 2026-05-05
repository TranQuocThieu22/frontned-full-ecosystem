'use client'
import TrackCirculatingTickersTable from "@/features/admin/METrackCirculatingTickers/TrackCirculatingTickersTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <TrackCirculatingTickersTable />
        </CustomPageContent>
    )
}