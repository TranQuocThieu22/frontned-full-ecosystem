'use client'
import ClassAttendanceCheckTable from '@/modules-features/admin/ModuleMEClassAttendanceCheck/ClassAttendanceCheckTable'
import { MyPageContent } from 'aq-fe-framework/components'

export default function page() {
    return (
        <MyPageContent>
            <ClassAttendanceCheckTable />
        </MyPageContent>
    )
}
