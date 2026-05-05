import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function SubmitStudentProposalDeleteButton({ data }: { data: SRMTaskProposal }) {
    return (
        <CustomActionIconDelete
            contextData={data.code}
            onSubmit={() => taskProposalService.delete(data.id!)}
        />
    );
}