import { ITaskDetail } from '@/shared/interfaces/task/ITaskDetail'
import { MRT_TableInstance } from 'mantine-react-table'
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function QualityActionsButtonDeleteList({ table }: { table: MRT_TableInstance<ITaskDetail> }) {
  const selectedQualities = table.getSelectedRowModel().flatRows.flatMap(row => row.original)
  return (
    <CustomButtonDeleteList onSubmit={() => { }} count={selectedQualities.length} />
  )
}
