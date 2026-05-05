'use client'
import ClassAttendanceCheckTable from '@/features/admin/ModuleMEClassAttendanceCheck/ClassAttendanceCheckTable'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function page() {
    return (
        <CustomPageContent>
            <ClassAttendanceCheckTable />
        </CustomPageContent>
    )
}
