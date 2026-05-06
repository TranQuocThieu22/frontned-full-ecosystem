import { accountService } from '@aq-fe/aq-legacy-framework/shared/APIs/accountService'
import { AQDataSynchronizationService } from '@aq-fe/aq-legacy-framework/shared/APIs/AQDataSynchronizationService'
import { CustomColumnDef } from '@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable'
import { CustomButtonModalSync } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomButtonModalSync";
import { CustomDataTableAPI } from '@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomDataTableAPI'
import { useLegacyReactQuery } from '@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery'
import { User } from '@aq-fe/aq-legacy-framework/shared/interfaces/User'
import { textUtils } from '@aq-fe/core-ui/shared/utils/textUtils'
import { Group } from '@mantine/core'
import { useMemo } from 'react'
import LecturerListExport from './LecturerListExport'

export function LecturerListTable() {
    const query = useLegacyReactQuery({
        queryKey: ['lecturers'],
        axiosFn: accountService.getEdusoftNetAccount
    })
    const columns = useMemo<CustomColumnDef<User>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "code"
        },
        {
            header: "Họ lót",
            accessorKey: "lastName",
            accessorFn: (row) => textUtils.splitFullName(row.fullName || "").lastName
        },
        {
            header: "Tên",
            accessorKey: "firstName",
            accessorFn: (row) => textUtils.splitFullName(row.fullName || "").firstName
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            type: "gender"
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            type: "ddMMyyyy"
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
            // accessorKey: "educationLevel"
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnit.name",
        },
        {
            header: "Viên chức ngoài trường",
            accessorKey: "isExternal",
            type: "squareCheck"
        }
    ], [])
    return (
        <CustomDataTableAPI
            query={query}
            pinningRightColumns={['isExternal']}
            enableRowSelection
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <CustomButtonModalSync
                        buttonProps={{
                            children: "Đồng bộ từ EduSoft.NET"
                        }}
                        axiosFn={() => AQDataSynchronizationService.AQDataLecturer()} />
                    <LecturerListExport table={table} />
                </Group>
            )}
            columns={columns}
            deleteListFn={accountService.deleteListIds}
            deleteFn={accountService.delete}
        />
    )
}
