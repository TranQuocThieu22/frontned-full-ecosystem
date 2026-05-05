'use client'
import StudentListCreateUpdate from "@aq-fe/core-ui/features/core/studentList/StudentListCreateUpdate";
import { accountService } from "@aq-fe/core-ui/shared/APIs/accountService";
import { AQDataSynchronizationService } from "@aq-fe/core-ui/shared/APIs/AQDataSynchronizationService";
import { classService } from "@aq-fe/core-ui/shared/APIs/classService";
import { CustomColumnDef, PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Student } from "@aq-fe/core-ui/shared/interfaces/Student";
import { useProjectInfoStore } from "@aq-fe/core-ui/shared/stores/useProjectInfoStore";
import { excelUtils } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { textUtils } from "@aq-fe/core-ui/shared/utils/textUtils";
import { useDebouncedValue } from "@mantine/hooks";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export default function StudentListTable() {
    const searchState = useState("")
    const [debouncedSearch] = useDebouncedValue(searchState[0], 1000)
    const pagingState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })
    const studentQuery = useCustomReactQuery({
        axiosFn: () => accountService.getStudentCOE({
            pageNumber: pagingState[0].pageIndex + 1,
            pageSize: pagingState[0].pageSize,
            codeOrName: debouncedSearch
        }),
        queryKey: ['students', pagingState[0], debouncedSearch]
    })
    const classQuery = useCustomReactQuery({
        queryKey: ['classes'],
        axiosFn: () => classService.getAll({
            cols: ['COEGrade'],
        })
    })
    const projectInfoStore = useProjectInfoStore()
    const columns = useMemo<CustomColumnDef<Student>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: 'code',
            importFieldProps: {}
        },
        {
            header: "Họ lót",
            accessorKey: "lastName",
            accessorFn: (row) => textUtils.splitFullName(row.fullName).lastName,
            importFieldProps: {
                isRequired: true
            }
        },
        {
            header: "Tên",
            accessorKey: "firstName",
            accessorFn: (row) => textUtils.splitFullName(row.fullName).firstName,
            importFieldProps: {
                isRequired: true
            }
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            type: "gender",
            importFieldProps: {
                parseType: "number"
            }
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            type: "ddMMyyyy",
            importFieldProps: {
                parseType: "date"
            }
        },
        {
            header: "Mã lớp",
            accessorKey: "class.code",
            importFieldProps: {
                fieldKey: "classCode",
            }
        },
        // {
        //     header: "Mã cố vấn học tập"
        // },
        // {
        //     header: "Mã giáo viên chủ nhiệm"
        // },
        {
            header: "Mã khối",
            accessorKey: "class.coeGrade.code"
        },
        {
            header: "Mã ngành",
            accessorKey: "class.coeGrade.coeProgram.code"
        },
        {
            header: "Tên ngành",
            accessorKey: "class.coeGrade.coeProgram.name"
        },
        {
            header: "Mã khoa",
            accessorKey: "class.coeGrade.coeProgram.department.code"
        }
    ], [])

    return (
        <CustomDataTableAPI
            enableRowSelection
            exportProps={{
                fileName: "Danh sách sinh viên"
            }}
            pagination={pagingState[0]}
            onPaginationChange={pagingState[1]}
            query={studentQuery}
            rowCount={studentQuery.dataCount}
            columns={columns}
            safeDeleteFn={accountService.safeDelete}
            safeDeleteListFn={accountService.safeDeleteList}
            syncButtonProps={{
                axiosFn: () => AQDataSynchronizationService.AQDataStudentFull()
            }}
            buttonImportProps={{
                buttonProps: {
                    loading: classQuery.isLoading
                },
                fileName: "Cấu trúc import sinh viên",
                onPrepareWorkbook: (workbook) => {
                    excelUtils.addSheet({
                        sheetName: "Giới tính",
                        config: [
                            { fieldName: "Tên", fieldKey: "name" },
                            { fieldName: "Giá trị", fieldKey: "value" },
                        ],
                        data: [
                            { name: "Nam", value: "1" },
                            { name: "Nữ", value: "2" }
                        ],
                        workbook
                    })
                },
                onSubmit: (finalvalues) => {
                    return accountService.createList(finalvalues.map(item => {
                        const { firstName, lastName, classCode, ...rest } = item
                        return {
                            id: 0,
                            userName: "coe" + rest.code,
                            AQModuleId: projectInfoStore.state.aqModuleId,
                            roleId: 1007, // Role sinh viên
                            password: "123456",
                            classId: classQuery.data?.find(item => item.code == classCode)?.id,
                            ...rest,
                            fullName: `${lastName} ${firstName}`
                        }
                    }))
                }
            }}
            renderTopToolbarCustomActions={() => (
                <>
                    <CustomTextInput
                        w={350}
                        leftSection={<IconSearch />}
                        placeholder="Tìm theo mã sinh viên, họ tên hoặc email"
                        value={searchState[0]} onChange={(e) => searchState[1](e.currentTarget.value)} />
                    <StudentListCreateUpdate />
                </>
            )}
            renderRowActions={({ row }) => (
                <StudentListCreateUpdate values={row.original} />
            )}

        />
    )
}
