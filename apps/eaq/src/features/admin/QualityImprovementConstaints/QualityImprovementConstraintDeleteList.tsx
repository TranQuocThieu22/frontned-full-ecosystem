import ILimitation from '@/shared/interfaces/limitation/ILimitation'
import { MRT_TableInstance } from 'mantine-react-table'
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function QualityImprovementConstraintDeleteList({ table }: { table: MRT_TableInstance<ILimitation> }) {
  const selectedQualities = table.getSelectedRowModel().flatRows.flatMap(row => row.original)
  return (
    <CustomButtonDeleteList onSubmit={() => { }} count={selectedQualities.length} />
  )
}
