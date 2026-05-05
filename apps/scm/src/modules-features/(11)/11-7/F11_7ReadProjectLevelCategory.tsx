'use client'
import { Checkbox } from "@mantine/core";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F11_7CreateProjectLevelCategory from "./F11_7CreateProjectLevelCategory";
import F11_7DeleteListProjectLevelCategory from "./F11_7DeleteListProjectLevelCategory";
import F11_7DeleteProjectLevelCategory from "./F11_7DeleteProjectLevelCategory";
import F11_7UpdateProjectLevelCategory from "./F11_7UpdateProjectLevelCategory";
export interface I11_7ProjectLevelCategory {
    id?: number;   // ID duy nhất, có thể undefined
    code?: string; // Mã cấp đề tài, có thể undefined
    name?: string; // Tên cấp đề tài, có thể undefined
    isStop?: boolean;
    notes?: string
}

export default function F11_7ReadProjectLevelCategory() {

    const columns = useMemo<MRT_ColumnDef<I11_7ProjectLevelCategory>[]>(
        () => [
            {
                header: "Mã cấp đề tài",
                accessorKey: "code"
            },
            {
                header: "Tên cấp đề tài",
                accessorKey: "name"
            },
            {
                header: "Ngừng sử dụng",
                accessorKey: "isStop",
                accessorFn(row) {
                    return (<Checkbox checked={row.isStop} readOnly/>)
                }
            },
            {
                header: "Ghi chú",
                accessorKey: "notes"
            },
        ],
        []
    );
    return (
        <MyFieldset title="Danh mục cấp đề tài">
            <MyDataTable
                columns={columns}
                data={mockData!}
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <F11_7CreateProjectLevelCategory />
                            <MyButton crudType="import"/>
                            <MyButton crudType="export"/>
                            <F11_7DeleteListProjectLevelCategory values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )

                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F11_7UpdateProjectLevelCategory values={row.original} />
                            <F11_7DeleteProjectLevelCategory id={row.original.id!} code={row.original.code || ''} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


const mockData = [
    {
        "id": 1,
        "code": "Bo",
        "name": "Cấp Bộ",
        "isStop": false,
        "note": null
    },
    {
        "id": 2,
        "code": "T/TP",
        "name": "Cấp Tỉnh/ Thành phố",
        "isStop": false,
        "note": null
    },
    {
        "id": 3,
        "code": "Tr",
        "name": "Cấp trường",
        "isStop": false,
        "note": null
    }
]