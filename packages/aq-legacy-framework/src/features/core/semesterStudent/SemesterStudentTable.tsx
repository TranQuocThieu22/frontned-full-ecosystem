"use client"
import { accountService, ImportStudentActivityPlan } from "@aq-fe/aq-legacy-framework/shared/APIs/accountService"
import { AQDataSynchronizationService } from "@aq-fe/aq-legacy-framework/shared/APIs/AQDataSynchronizationService"
import { studentActivityPlanService } from "@aq-fe/aq-legacy-framework/shared/APIs/studentActivityPlanService"
import { CustomColumnDef } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable"
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset"
import { CustomDataTableAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI"
import { useSemesterStore } from "@aq-fe/aq-legacy-framework/shared/features/Semester/useSemesterStore"
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery"
import { StudentActivityPlan, studentActivityPlanStatusLabel } from "@aq-fe/aq-legacy-framework/shared/interfaces/StudentActivityPlan"
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils"
import { PaginationState } from "@tanstack/table-core"
import { useMemo, useState } from "react"
import SemesterStudentCreateUpdate from "./SemesterStudentCreateUpdate"
import SemesterStudentSelect from "./SemesterStudentSelect"

export default function SemesterStudentTable() {
    const semesterStore = useSemesterStore()
    const pagingState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20
    })
    const semesterStudentQuery = useLegacyReactQuery({
        queryKey: ['semesterStudents', pagingState[0], semesterStore.state.semester?.id],
        axiosFn: () => accountService.getStudentActivitiyPlan({
            activityPlanId: semesterStore.state.semester?.id,
            pageNumber: pagingState[0].pageIndex + 1,
            pageSize: pagingState[0].pageSize
        }),
        options: {
            enabled: semesterStore.state.semester != undefined
        }
    })
    const columns = useMemo<CustomColumnDef<StudentActivityPlan, ImportStudentActivityPlan>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: "user.code",
            importFieldProps: {
                fieldKey: "studentCode",
                isUnique: true,
                isRequired: true
            }
        },
        {
            header: "Họ",
            accessorKey: "user.lastName",
            accessorFn: (row) => textUtils.splitFullName(row.user?.fullName).lastName
        },
        {
            header: "Tên",
            accessorKey: "user.firstName",
            accessorFn: (row) => textUtils.splitFullName(row.user?.fullName).firstName
        },
        {
            header: "Họ và tên",
            accessorKey: "user.fullName",
        },
        {
            header: "Giới tính",
            accessorKey: "user.gender",
            type: "gender"
        },
        {
            header: "Ngày sinh",
            accessorKey: "user.dateOfBirth",
            type: "ddMMyyyy"
        },
        {
            header: "Trạng thái",
            accessorFn: (row) => studentActivityPlanStatusLabel[row.status!]
        },
        {
            header: "Mã lớp",
            accessorKey: "user.class.code"
        },
        {
            header: "Mã cố vấn học tập"
        },
        {
            header: "Mã giáo viên chủ nhiệm"
        },
        {
            header: "Mã khóa",
            accessorKey: "user.class.coeGrade.code"
        },
        {
            header: "Mã chương trình",
            accessorKey: "user.class.coeGrade.coeProgram.code"
        },
        {
            header: "Mã khoa",
            accessorKey: "user.class.coeGrade.coeProgram.department.code"
        },
        {
            header: "Năm học - Học kỳ vào",
            accessorKey: "user.class.coeGrade.activityPlanEnd.name"
        },
        {
            header: "Năm học - Học kỳ ra",
            accessorKey: "user.class.coeGrade.activityPlanStart.name"
        }
    ], [])
    return (
        <CustomFieldset
            title="Danh sách sinh viên học kỳ"
        >
            <CustomDataTableAPI
                rowCount={semesterStudentQuery.dataCount}
                pagination={pagingState[0]}
                onPaginationChange={pagingState[1]}
                columns={columns}
                isLoading={semesterStudentQuery.isLoading}
                query={semesterStudentQuery}
                enableRowSelection
                syncButtonProps={({
                    axiosFn: () => AQDataSynchronizationService.AQDataStudent({ params: { semester: semesterStore.state.semester?.semester } }),
                })}
                exportProps={{
                    fileName: "Danh sách sinh viên học kỳ"
                }}
                customActionIconDeleteProps={(row) => ({
                    contextData: row.user?.code
                })}
                deleteListFn={studentActivityPlanService.deleteListIds}
                deleteFn={studentActivityPlanService.delete}
                buttonImportProps={{
                    onSubmit: (finalValues) => {
                        return accountService.importStudentActivityPlan(finalValues.map(item => ({
                            studentCode: item.studentCode,
                            activityPlanCode: semesterStore.state.semester?.code
                        })))
                    }
                }}
                renderTopToolbarCustomActions={() => (
                    <SemesterStudentSelect
                        defaultSelectedIds={semesterStudentQuery.data?.map(item => item.user?.id!)}
                    />
                )}
                renderRowActions={({ row }) => (
                    <>
                        <SemesterStudentCreateUpdate actionType="view" values={row.original} />
                        <SemesterStudentCreateUpdate values={row.original} />
                    </>
                )}
            />
        </CustomFieldset>
    )
}
