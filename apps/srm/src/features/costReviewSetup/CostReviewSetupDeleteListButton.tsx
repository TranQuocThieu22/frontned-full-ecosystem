import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    values: SRMEvaluationCommittee[],
    table: MRT_TableInstance<SRMEvaluationCommittee>
    isFetchingTable: number
}

export default function CostReviewSetupDeleteListButton({ values, table, isFetchingTable }: Props) {
    return (
        <CustomButtonDeleteList
            loading={isFetchingTable > 0}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { return evaluationCommitteeService.deleteList(values) }}
            onSuccess={() => { table.resetRowSelection() }}
        />
    );
}
