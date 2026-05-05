import { ITaskDetailAnalysis } from '@/shared/interfaces/task/ITaskDetailAnalysis';
import { MRT_TableInstance } from 'mantine-react-table';
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

type TaskDetailSubmit = Pick<ITaskDetailAnalysis, 'id' | 'hostUnit' | 'supportUnit' | 'note'>
export default function QualityAssurancePlanDeleteList({ table }: { table: MRT_TableInstance<ITaskDetailAnalysis> }) {
    const selected = table.getSelectedRowModel().flatRows.flatMap((row) => row.original);
    return (
        <CustomButtonDeleteList onSubmit={() => {
            console.info(selected)
            const mappedData: TaskDetailSubmit[] = selected.map((item) => {
                return {
                    id: item.id!,
                    hostUnit: undefined,
                    supportUnit: undefined,
                    note: undefined
                }
            })
        }} count={selected.length} />

    )
}
