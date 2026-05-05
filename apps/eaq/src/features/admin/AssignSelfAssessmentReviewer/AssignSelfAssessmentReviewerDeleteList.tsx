import { service_EAQSelfAssessment } from '@/shared/APIs/service_EAQSelfAssessment'
import { ITaskDetail } from '@/shared/interfaces/task/ITaskDetail'
import { MRT_TableInstance } from 'mantine-react-table'
import { CustomButtonDeleteList } from '@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList'

export default function AssignSelfAssessmentReviewerDeleteList({ table }: { table: MRT_TableInstance<ITaskDetail> }) {
    const selectedRow = table.getSelectedRowModel().flatRows.flatMap(row => row.original)
    return (
        <CustomButtonDeleteList onSubmit={() => {
            const payload = selectedRow.map(item => ({ id: item.id }));
            service_EAQSelfAssessment.assignReviewersEAQSelfAssessment(payload);
        }} count={selectedRow.length} />
    )
}
