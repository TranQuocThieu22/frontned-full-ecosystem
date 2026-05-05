'use client'
import TrackCirculatingTickersTable from "@/modules-features/admin/METrackCirculatingTickers/TrackCirculatingTickersTable";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        <MyPageContent>
            <TrackCirculatingTickersTable />
        </MyPageContent>
    )
}