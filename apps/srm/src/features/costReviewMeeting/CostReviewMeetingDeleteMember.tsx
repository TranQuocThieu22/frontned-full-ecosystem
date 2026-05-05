import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface CostReviewMeetingDeleteMemberProps {
    table: MRT_TableInstance<SRMTopicMember>
    onDelete: (id: number[]) => void
}

export default function CostReviewMeetingDeleteMember({ table, onDelete }: CostReviewMeetingDeleteMemberProps) {
    return (
        <CustomButtonDeleteList
            contextData={table.getSelectedRowModel().rows.map(r => r.original.id).join(",")}
            onSubmit={() => {
                onDelete(table.getSelectedRowModel().rows.map(r => r.original.id || 0));
            }}
            onSuccess={() => {
                table.resetRowSelection();
            }}
        />
    );
}