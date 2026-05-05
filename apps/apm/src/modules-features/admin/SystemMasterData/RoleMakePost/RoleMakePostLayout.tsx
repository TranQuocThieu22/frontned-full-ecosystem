'use client'
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RoleMakePostCreate from "./RoleMakePostCreate";
import RoleMakePostDelete from "./RoleMakePostDelete";
import RoleMakePostDeleteList from "./RoleMakePostDeleteList";
import RoleMakePostUpdate from "./RoleMakePostUpdate";

export interface RoleMakePost {
    id: number;
    code: string;
    name: string;
    isDiscontinued: boolean;
    notes: string;
}

export default function RoleMakePostLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<RoleMakePost>[]>(() => [
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
        <MyFieldset title="Danh mục vai trò thực hiện bài đăng" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <RoleMakePostCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <RoleMakePostDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <RoleMakePostUpdate values={row.original} />
                            <RoleMakePostDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockData: RoleMakePost[] = [
    {
        id: 1,
        code: "TGC",
        name: "Tác giả chính",
        isDiscontinued: false,
        notes: "",
    },
    {
        id: 2,
        code: "DTG",
        name: "Đồng tác giả",
        isDiscontinued: false,
        notes: "",
    },
    {
        id: 3,
        code: "BCV",
        name: "Báo cáo viên",
        isDiscontinued: false,
        notes: "",
    }
];
