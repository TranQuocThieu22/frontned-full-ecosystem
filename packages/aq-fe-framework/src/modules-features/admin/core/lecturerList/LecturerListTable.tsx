import { accountService } from '@/APIs/accountService'
import { CustomDataTableAPI } from '@/core'
import { CustomThemeIconSquareCheck } from '@/core/dataDisplay/CustomThemeIconSquareCheck'
import { useMyReactQuery } from '@/hooks'
import { IAccount } from '@/interfaces'
import { genderEnum, genderLabel } from '@/shared/consts/genderEnum'
import { utils_date, utils_text } from '@/utils-v2'
import { Group } from '@mantine/core'
import { MRT_ColumnDef } from 'mantine-react-table'
import { useMemo } from 'react'
import LecturerListExport from './LecturerListExport'
import LecturerListSyncFromEdusoft from './LecturerListSyncFromEdusoft'

export function LecturerListTable() {
    const query = useMyReactQuery({
        queryKey: ['lecturers'],
        axiosFn: accountService.getEdusoftNetAccount
    })
    const columns = useMemo<MRT_ColumnDef<IAccount>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "code"
        },
        {
            header: "Họ lót",
            accessorKey: "lastName",
            accessorFn: (row) => utils_text.splitFullName(row.fullName || "").lastName
        },
        {
            header: "Tên",
            accessorKey: "firstName",
            accessorFn: (row) => utils_text.splitFullName(row.fullName || "").firstName
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => genderLabel[row.gender as genderEnum],
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) => utils_date.toDDMMYYYY(row.dateOfBirth),
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Chức vụ",
            accessorKey: "jobTitle"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "Trình độ",
            accessorKey: "educationLevel"
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnit.name",
        },
        {
            header: "Viên chức ngoài trường",
            accessorKey: "isExternal",
            accessorFn: (row) => <CustomThemeIconSquareCheck checked={row.isExternal} />
        }
    ], [])
    return (
        <CustomDataTableAPI
            query={query}
            enableRowSelection
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <LecturerListSyncFromEdusoft />
                    <LecturerListExport table={table} />
                </Group>
            )}
            columns={columns}
            deleteListFn={accountService.deleteListIds}
            deleteFn={accountService.delete}
        />
    )
}
