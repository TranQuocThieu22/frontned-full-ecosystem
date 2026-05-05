"use client";
import ScheduleTestTable from "@/features/admin/MEScheduleTest/ScheduleTestTable";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <ScheduleTestTable />
        </CustomPageContent>
    );
}