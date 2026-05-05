"use client"
import AssignTeachingAssistantRead from "@/features/admin/assignTeachingAssistant/assignTeachingAssistantRead";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

export default function Page() {
    return (
        <CustomPageContent>
            <AssignTeachingAssistantRead />
        </CustomPageContent>
    )
}
