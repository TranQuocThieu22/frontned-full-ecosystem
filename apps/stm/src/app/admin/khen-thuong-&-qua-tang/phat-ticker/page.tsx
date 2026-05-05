'use client'

import TickerDistributionTable from "@/features/admin/METickerDistribution/TickerDistributionTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <TickerDistributionTable />
        </CustomPageContent>
    )
}