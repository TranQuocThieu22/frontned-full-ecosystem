'use client'
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RoleImplementTopicCreate from "./RoleImplementTopicCreate";
import RoleImplementTopicDelete from "./RoleImplementTopicDelete";
import RoleImplementTopicDeleteList from "./RoleImplementTopicDeleteList";
import RoleImplementTopicUpdate from "./RoleImplementTopicUpdate";

export interface RoleImplementTopic {
    id: number;
    code: string;
    name: string;
    isDiscontinued: boolean;
    notes: string;
}

export default function RoleImplementTopicLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<RoleImplementTopic>[]>(() => [
        {
            header: "Mã vai trò",
            accessorKey: "code",
        },
        {
            header: "Tên vai trò",
            accessorKey: "name",
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
        <MyFieldset title="Danh mục vai trò thực hiện đề tài" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <RoleImplementTopicCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <RoleImplementTopicDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <RoleImplementTopicUpdate values={row.original} />
                            <RoleImplementTopicDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockData: RoleImplementTopic[] = [
    {
        id: 1,
        code: "CN",
        name: "Chủ Nhiệm",
        isDiscontinued: false,
        notes: "",
    },
    {
        id: 2,
        code: "TK",
        name: "Thư ký",
        isDiscontinued: false,
        notes: "",
    },
    {
        id: 3,
        code: "TV",
        name: "Thành viên",
        isDiscontinued: false,
        notes: "",
    },  
    {
        id: 4,
        code: "HT",
        name: "Hỗ trợ",
        isDiscontinued: false,
        notes: "",
    }
];
