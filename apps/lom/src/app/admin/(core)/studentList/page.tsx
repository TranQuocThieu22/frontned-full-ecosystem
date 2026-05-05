import StudentListTable from '@aq-fe/core-ui/features/core/studentList/StudentListTable'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function page() {
    return (
        <CustomPageContent>
            <StudentListTable />
        </CustomPageContent>
    )
}
