import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    data: SRMEvaluationCommittee;
    table: MRT_TableInstance<SRMEvaluationCommittee>;
    isLoading: boolean;
}

export default function CostReviewSetupDelete({ data, table, isLoading }: Props) {
    return (
        <CustomActionIconDelete
            contextData={data.code}
            onSubmit={() => { return evaluationCommitteeService.delete(data.id ?? -1) }}
            onSuccess={() => { table.resetRowSelection() }}
            actionIconProps={{
                loading: isLoading
            }}
        />
    );
}