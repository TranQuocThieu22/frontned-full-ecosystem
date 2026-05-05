"use client"
import { Button, Group } from '@mantine/core'
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils'
import { MantineReactTable, MRT_ColumnDef, MRT_RowSelectionState, useMantineReactTable } from 'mantine-react-table'
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi/index.cjs'
import { useEffect, useMemo, useState } from 'react'
import { useSelectedStudentStore } from '../Store/SelectedStudentStore'
import { IStudentInfoViewModel } from './Interfaces/Interfaces'


export default function SearchStudentTable(
    { allStudents, discSearchStudentTable }: { allStudents: IStudentInfoViewModel[], discSearchStudentTable: any }
) {
    const selectedStudentStore = useSelectedStudentStore();

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({
        [selectedStudentStore.student.id && selectedStudentStore.student.id.toString()]: true
    });

    useEffect(() => {
        if (Object.keys(rowSelection).length === 0) {
            selectedStudentStore.setSelectedStudent({});
        }
    }, [rowSelection])

    const studentSelectMRTColumns = useMemo<MRT_ColumnDef<IStudentInfoViewModel>[]>(() => [
        {
            header: "Mã học viên",
            accessorKey: "code",
        },
        {
            header: "Họ tên",
            accessorKey: "fullName",
        },
        {
            header: "Ngày sinh",
            accessorFn(originalRow) {
                return originalRow.dateOfBirth ? utils_date_dateToDDMMYYYString(new Date(originalRow.dateOfBirth)) : ""
            }
        },
        {
            header: "Số điện thoại",
            accessorKey: "phoneNumber",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
    ], []);

    const StudentSelectMRT = useMantineReactTable({
        columns: studentSelectMRTColumns,
        data: allStudents,
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-numbers": {
                Header: "STT",
                size: 70
            },
        },
        enableColumnPinning: true,
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        getRowId: (originalRow: IStudentInfoViewModel) => originalRow.id!.toString(),
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false
            }
        },
        enableColumnResizing: true,
        mantineTableHeadCellProps: {
            style: {
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        localization: MRT_Localization_VI,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    <Button
                        onClick={handleOnClickSelectStudentButton}
                    >
                        Chọn
                    </Button>
                </Group>
            );
        }
    });

    const handleOnClickSelectStudentButton = () => {
        if (Object.keys(rowSelection).length === 0) {
            selectedStudentStore.setSelectedStudent({});
        } else {
            selectedStudentStore.setSelectedStudent(StudentSelectMRT.getSelectedRowModel().rows[0]?.original);
        }
        discSearchStudentTable[1].close();
    }

    return (
        <>
            <MantineReactTable
                table={StudentSelectMRT}
            />
        </>
    )
}

