'use client'
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StudentTopicAwardsCreate from "./StudentTopicAwardsCreate";
import StudentTopicAwardsDelete from "./StudentTopicAwardsDelete";
import StudentTopicAwardsDeleteList from "./StudentTopicAwardsDeleteList";
import StudentTopicAwardsUpdate from "./StudentTopicAwardsUpdate";

export interface StudentTopicAward {
    id: number;
    code: string;
    name: string;
    rating: string;
    hours: number;
    score?: number;
    isDiscontinued: boolean;
    notes: string;
}

export default function StudentTopicAwardsLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<StudentTopicAward>[]>(() => [
        {
            header: "Mã loại giải thưởng",
            accessorKey: "code",
        },
        {
            header: "Tên loại giải thưởng",
            accessorKey: "name",
        },
        {
            header: "Xếp hạng",
            accessorKey: "rating",
        },
        {
            header: "Số giờ",
            accessorKey: "hours",
        },
        {
            header: "Số điểm",
            accessorKey: "score",
        },
        {
            header: "Ngừng sử dụng",
            accessorKey: "isDiscontinued",
            Cell: ({ row }) => (
                <Checkbox checked={row.original.isDiscontinued} readOnly />
            ),
        },
        {
            header: "Ghi chú",
            accessorKey: "notes",
        },
    ], []);

    return (
        <MyFieldset title="Danh mục loại giải thưởng đề tài sinh viên" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockStudentTopicAwards || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <StudentTopicAwardsCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <StudentTopicAwardsDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <StudentTopicAwardsUpdate values={row.original} />
                            <StudentTopicAwardsDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockStudentTopicAwards: StudentTopicAward[] = [
    {
        id: 1,
        code: "CTHTEG.1",
        name: "Cuộc thi học thuật bằng tiếng Anh - Giải nhất",
        rating: "Giải nhất",
        hours: 250,
        score: undefined,
        isDiscontinued: false,
        notes: ""
    },
    {
        id: 2,
        code: "CTHTEG.2",
        name: "Cuộc thi học thuật bằng tiếng Anh - Giải nhì",
        rating: "Giải nhì",
        hours: 200,
        score: undefined,
        isDiscontinued: false,
        notes: ""
    },
    {
        id: 3,
        code: "CTHTEG.3",
        name: "Cuộc thi học thuật bằng tiếng Anh - Giải ba",
        rating: "Giải ba",
        hours: 150,
        score: undefined,
        isDiscontinued: false,
        notes: ""
    },
    {
        id: 4,
        code: "CTHTEG.K",
        name: "Cuộc thi học thuật bằng tiếng Anh - Giải khuyến khích",
        rating: "Giải khuyến khích",
        hours: 120,
        score: undefined,
        isDiscontinued: false,
        notes: ""
    },
    {
        id: 5,
        code: "CTHTEG.0",
        name: "Cuộc thi học thuật bằng tiếng Anh - Không có giải",
        rating: "Giải nhất",
        hours: 100,
        score: undefined,
        isDiscontinued: false,
        notes: ""
    }
];
