'use client'
import SelectionResultTable from "@/features/selectionResult/SelectionResultTable"
import { EnumProposalNotificationType } from "@/shared/consts/enum/EnumProposalNotificationType"

export default function Page() {
    return (
        <SelectionResultTable type={EnumProposalNotificationType.TaskSelectionNotification} />
    )
}
