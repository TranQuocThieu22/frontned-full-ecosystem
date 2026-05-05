import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { MRT_TableInstance } from "mantine-react-table";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function ProgramSelfAssessmentDeleteList(
    { table, loading }:
        { table: MRT_TableInstance<IEvaluationPlan>; loading?: boolean }
) {
    const selectedRow = table.getSelectedRowModel().flatRows;
    return (
        <CustomButtonDeleteList
            count={selectedRow.length}
            onSubmit={() => service_EAQEvaluationPlan.deleteList(selectedRow.flatMap((item) => item.original)).then(() => table.resetRowSelection())}
            loading={loading}
        />
    )
}
