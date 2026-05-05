"use client"
import TaskProposalNoticeTable from "@/features/taskProposalNotice/TaskProposalNoticeTable";
import { EnumProposalNotificationType } from "@/shared/consts/enum/EnumProposalNotificationType";

export default function Page() {
    return (
        <TaskProposalNoticeTable type={EnumProposalNotificationType.TaskSelection} />
    )
}
