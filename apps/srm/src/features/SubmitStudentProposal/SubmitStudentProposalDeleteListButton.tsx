import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface SubmitProposalDeleteListButtonProps {
    table: MRT_TableInstance<SRMTaskProposal>;
    disabled?: boolean;
}

export default function SubmitStudentProposalDeleteListButton({ table, disabled }: SubmitProposalDeleteListButtonProps) {
    const selectedRow = table.getSelectedRowModel().rows.map((item => item.original))

    return <CustomButtonDeleteList
        contextData={selectedRow.map((data: any) => `${data.code}`).join(", ")}
        onSubmit={() => taskProposalService.deleteList(selectedRow.map((item) => ({ id: item.id })))}
        onSuccess={() => table?.resetRowSelection()}
        buttonProps={{ disabled: disabled }}
    />
}