'use client'

import { Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { MyButton, MyCenterFull, MyDataTable } from "aq-fe-framework/components"
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table"
import { useMemo, useState } from "react"
import FeatCourseSectionCreate from "./FeatCourseSectionCreate"
import FeatCourseSectionDelete from "./FeatCourseSectionDelete"
import FeatCourseSectionDeleteList from "./FeatCourseSectionDeleteList"
import CourseSectionUpdate from "./FeatCourseSectionUpdate"
import FeatSignUp from "./FeatSignUp"
import { ICOECourseSectionInfoViewModel } from "./Interfaces/InfoInterfaces"

export default function FeatCourseSectionRead() {
    const discUpdateModal = useDisclosure(false)
    const discDeleteModal = useDisclosure(false);

    const currentUpdateCourseSection = useState<ICOECourseSectionInfoViewModel>({})
    const currentDeleteCourseSection = useState<ICOECourseSectionInfoViewModel>({})

    const SelectedCourseSection = useState<any[]>()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});



    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [

        {
            header: "Mã môn học",
            accessorKey: "subjectCode"
        },
        {
            header: "Tên môn học",
            accessorKey: "subjectName"
        },
        {
            header: "Nhóm học",
            accessorKey: "groupNumber"
        },
        {
            header: "MaGV",
            accessorKey: "instructorCode"
        },
        {
            header: "Cán bộ giảng dạy chính",
            accessorKey: "instructorName"
        },
        {
            header: "Số lượng sinh viên",
            accessorKey: "studentCount"
        },
        {
            header: "Đăng ký",
            accessorKey: "signUp",
            accessorFn: (row) => {
                return (<FeatSignUp />)
            }
        },

    ], []);

    const handleOnClickDeleteIcon = (row: any) => {
        discDeleteModal[1].open();
        currentDeleteCourseSection[1](row)
    }
    return (
        <>
            <MyDataTable
                columns={columns}
                data={mockCourseOfferings || []}
                enableRowSelection={true}
                setSelectedRow={SelectedCourseSection[1]}
                onRowSelectionChange={setRowSelection}
                state={{ rowSelection }}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <FeatCourseSectionCreate />
                        <MyButton crudType="import"></MyButton>
                        <MyButton crudType="export"></MyButton>
                        <FeatCourseSectionDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        <MyButton bg={'green'}> Đồng bộ từ EduSoft.Net</MyButton>
                    </Group>
                )}
                renderRowActions={({ row }: any) => {
                    return (
                        <MyCenterFull>
                            <CourseSectionUpdate data={row.original} />
                            <FeatCourseSectionDelete values={row.original} />
                        </MyCenterFull>
                    );
                }}>
            </MyDataTable >

        </>
    )
}

const mockCourseOfferings: any[] = [
    {
        id: 1,
        subjectCode: 'KTTC001',
        subjectName: 'Kế toán vi mô',
        subjectId: 1,
        groupNumber: '01',
        instructorId: 1,
        instructorCode: 'GV0025',
        instructorName: 'Tô Ngọc Lan',
        studentCount: 30,
    },
    {
        id: 2,
        subjectCode: 'KTTC002',
        subjectName: 'Kế toán tài chính',
        subjectId: 2,
        groupNumber: '01',
        instructorId: 1,
        instructorCode: 'GV0025',
        instructorName: 'Tô Ngọc Lan',
        studentCount: 30,
    },
    {
        id: 3,
        subjectCode: 'KTTC003',
        subjectName: 'Kế toán thuế',
        subjectId: 3,
        groupNumber: '01',
        instructorId: 1,
        instructorCode: 'GV0025',
        instructorName: 'Tô Ngọc Lan',
        studentCount: 30,
    },
    {
        id: 4,
        subjectCode: 'KTTC004',
        subjectName: 'Kế toán doanh nghiệp',
        subjectId: 4,
        groupNumber: '01',
        instructorId: 1,
        instructorCode: 'GV0025',
        instructorName: 'Tô Ngọc Lan',
        studentCount: 7,
    },
    {
        id: 5,
        subjectCode: 'KTTC005',
        subjectName: 'Kế toán ngân hàng',
        subjectId: 5,
        groupNumber: '01',
        instructorId: 1,
        instructorCode: 'GV0025',
        instructorName: 'Tô Ngọc Lan',
        studentCount: 5,
    },
];

// You can now use this mockData in your project
console.log(mockCourseOfferings);

