'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Checkbox } from "@mantine/core";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StudentAwardRankingCreateButton from "./StudentAwardRankingCreateButton";
import StudentAwardRankingDeleteButton from "./StudentAwardRankingDeleteButton";
import StudentAwardRankingDeleteListButton from "./StudentAwardRankingDeleteListButton";
import StudentAwardRankingUpdateButton from "./StudentAwardRankingUpdateButton";

export interface I11_12ConferenceType {
    code?: string; // Mã xếp hạng, có thể undefined
    name?: string; // Tên xếp hạng, có thể undefined
    notes?: string
    isStop?: boolean
}

export default function StudentAwardRankingTable() {

    const columns = useMemo<MRT_ColumnDef<I11_12ConferenceType>[]>(
        () => [
            {
                header: "Mã xếp hạng",
                accessorKey: "code"
            },
            {
                header: "Tên xếp hạng",
                accessorKey: "name"
            },
            {
                header: "Ngừng sử dụng",
                accessorKey: "isStop",
                accessorFn(row) {
                    return (<Checkbox checked={row.isStop} readOnly></Checkbox>)

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
        <MyFieldset title="Danh mục xếp hạng giải thưởng đề tài sinh viên">
            <MyDataTable
                enableRowNumbers={false}
                enableRowSelection
                columns={columns}
                data={mockData!}

                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <StudentAwardRankingCreateButton />
                            <MyButton crudType="import" color="orange"> Import </MyButton>
                            <MyButton crudType="export" color="green"> Export </MyButton>
                            <StudentAwardRankingDeleteButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )

                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <StudentAwardRankingUpdateButton values={row.original} />
                            <StudentAwardRankingDeleteListButton code={row.original.code || ''} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

const mockData = [
    {
        "code": "1",
        "name": "Giải nhất",
        "isStop": false,
        "note": null
    },
    {
        "code": "2",
        "name": "Giải nhì",
        "isStop": false,
        "note": null
    },
    {
        "code": "3",
        "name": "Giải ba",
        "isStop": false,
        "note": null
    },
    {
        "code": "k",
        "name": "Giải khuyến khích",
        "isStop": false,
        "note": null
    },
    {
        "code": "0",
        "name": "Không có giải",
        "isStop": false,
        "note": null
    },
]