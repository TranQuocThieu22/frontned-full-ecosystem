import { accountService } from "@/shared/APIs/accountService";
import { SRMLecturer } from "@/shared/interfaces/SRMLecturer";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { genderEnum, genderLabel } from "@aq-fe/core-ui/shared/consts/enum/genderEnum";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

interface Shared_LecturerTableSelectProps {
    values: SRMLecturer[]
    onChange: (values: SRMLecturer[]) => void
}
export default function Shared_LecturerTableSelect({ values, onChange }: Shared_LecturerTableSelectProps) {
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({})
    const columns = useMemo<MRT_ColumnDef<SRMLecturer>[]>(() => [
        {
            header: "Mã viên chức",
            accessorKey: "code"
        },
        {
            header: "Họ tên",
            accessorKey: "fullName"
        },

        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth",
            accessorFn: (row) => dateUtils.toDDMMYYYY(row.dateOfBirth),
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
            accessorFn: (row) => genderLabel[row.gender as genderEnum],
        },
        {
            header: "Đơn vị",
            accessorKey: "workingUnitName",
            accessorFn: (row) => row.workingUnit?.name
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
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
    ], [])
    const lecturerQuery = useCustomReactQuery({
        queryKey: ['lecturers'],
        axiosFn: () => accountService.getEdusoftNetAccount()
    })
    useEffect(() => {
        if (!values) return
        const initValues: MRT_RowSelectionState = {}
        values.forEach(item => {
            if (item?.id != null) {
                initValues[item.id] = true
            }
        })
        setRowSelection(initValues)
    }, [values])
    return (
        <CustomDataTable
            data={lecturerQuery.data || []}
            columns={columns}
            isLoading={lecturerQuery.isLoading}
            isError={lecturerQuery.isError}
            state={{ rowSelection }}
            onRowSelectionChange={setRowSelection}
            enableRowSelection={(row) => {
                if (values.some(item => item.id == row.original.id)) return false
                return true
            }}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <CustomButton actionType="select" type="button" onClick={() => {
                        const selectRow = table.getSelectedRowModel().rows.map(item => item.original)
                        onChange(selectRow)
                    }} />
                )
            }}
        />
    )
}
