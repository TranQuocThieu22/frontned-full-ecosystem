import ILimitation from '@/shared/interfaces/limitation/ILimitation'
import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList'
import { MRT_TableInstance } from 'mantine-react-table'

export default function AssignmentSummaryReportingDeleteList({ table }: { table: MRT_TableInstance<ILimitation> }) {
    const selectedQualities = table.getSelectedRowModel().flatRows.flatMap(row => row.original)
    return (
        <CustomButtonDeleteList onSubmit={() => {
        }} count={selectedQualities.length} />
    )
}
