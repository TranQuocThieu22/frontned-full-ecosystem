import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MyButton, MyButtonModal, MyCenterFull, MyDataTable } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import FeatStudentDeleteList from './students/FeatStudentDeleteList';
import FeatStundentCreate from './students/FeatStundentCreate';
import FeatStudentDelete from './students/FeatStundentDelete';
import FeatStundentUpdate from './students/FeatStundentUpdate';

export default function FeatSignUp() {
    const disc = useDisclosure()
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
            header: "Mã sinh viên",
            accessorKey: "studentCode"
        },
        {
            header: "Họ tên",
            accessorKey: "fullName"
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth"
        },
        {
            header: "Giới tính ",
            accessorKey: "gender"
        },
        {
            header: "Mã lớp",
            accessorKey: "classCode",

        },
        {
            header: "Tên lớp",
            accessorKey: "className",

        },
        {
            header: "Mã khóa",
            accessorKey: "courseCode",

        },
        {
            header: "Tên khóa",
            accessorKey: "courseName",

        },

    ], []);

    return (
        <MyButtonModal
            disclosure={disc}
            label='Xem/ Cập nhật'
            title='Danh sách sinh viên'
            modalSize={'90%'}
        >
            <MyDataTable
                columns={columns}
                data={mockStudentEnrollments || []}
                initialState={{
                    density: "md",
                    pagination: { pageIndex: 0, pageSize: 10 },
                }}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        <FeatStundentCreate />
                        <MyButton crudType="import"></MyButton>
                        <MyButton crudType="export"></MyButton>
                        <FeatStudentDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                    </Group>
                )}
                renderRowActions={({ row }: any) => {
                    return (
                        <MyCenterFull>
                            <FeatStundentUpdate studentData={row.original} />
                            <FeatStudentDelete values={row.original} />
                        </MyCenterFull>
                    );
                }}>
            </MyDataTable >

        </MyButtonModal>
    )
}
const mockStudentEnrollments: IStudentCourseEnrollment[] = [
    {
        id: 1,
        subjectCode: 'KT001',
        subjectName: 'Kế toán vi mô',
        studentCode: 'SV00001',
        fullName: 'Tô Ngọc Lan',
        dateOfBirth: '01/01/2000',
        gender: 'Nam',
        classCode: 'KT2401',
        className: 'Kế toán 2021 Lớp 1',
        courseCode: 'KT24',
        courseName: 'Kế toán 24',
    },
    {
        id: 2,
        subjectCode: 'KT001',
        subjectName: 'Kế toán vi mô',
        studentCode: 'SV00002',
        fullName: 'Tô Ngọc La', // Note the slight name difference in the image
        dateOfBirth: '01/01/2000',
        gender: 'Nam',
        classCode: 'KT2401',
        className: 'Kế toán 2021 Lớp 1',
        courseCode: 'KT24',
        courseName: 'Kế toán 24',
    },
    {
        id: 3,
        subjectCode: 'KT001',
        subjectName: 'Kế toán vi mô',
        studentCode: 'SV00003',
        fullName: 'Tô Ngọc Li', // Note the slight name difference in the image
        dateOfBirth: '01/01/2000',
        gender: 'Nam',
        classCode: 'KT2401',
        className: 'Kế toán 2021 Lớp 1',
        courseCode: 'KT24',
        courseName: 'Kế toán 24',
    },
    {
        id: 4,
        subjectCode: 'KT001',
        subjectName: 'Kế toán vi mô',
        studentCode: 'SV00004',
        fullName: 'Tô Ngọc Lô', // Note the slight name difference in the image
        dateOfBirth: '01/01/2000',
        gender: 'Nam',
        classCode: 'KT2401',
        className: 'Kế toán 2021 Lớp 1',
        courseCode: 'KT24',
        courseName: 'Kế toán 24',
    },
];

// You can now use this mockData in your project

export interface IStudentCourseEnrollment {
    /** A unique identifier for the enrollment record. */
    id: number;

    /** Corresponds to "Mã môn học" */
    subjectCode: string;

    /** Corresponds to "Tên môn học" */
    subjectName: string;

    /** Corresponds to "Mã sinh viên" */
    studentCode: string;

    /** Corresponds to "Họ tên" */
    fullName: string;

    /** Corresponds to "Ngày sinh" (formatted as DD/MM/YYYY string) */
    dateOfBirth: string;

    /** Corresponds to "Giới tính" */
    gender: string;

    /** Corresponds to "Mã lớp" */
    classCode: string;

    /** Corresponds to "Tên lớp" */
    className: string;

    /** Corresponds to "Mã khóa" */
    courseCode: string;

    /** Corresponds to "Tên khóa" */
    courseName: string;
}