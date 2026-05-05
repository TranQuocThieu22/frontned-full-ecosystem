'use client'
import { Checkbox } from "@mantine/core";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset, MyNumberFormatter } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F11_8CreateProjectTypeCategory from "./F11_8CreateProjectTypeCategory";
import F11_8DeleteListProjectTypeCategory from "./F11_8DeleteListProjectTypeCategory";
import F11_8DeleteProjectTypeCategory from "./F11_8DeleteProjectTypeCategory";
import F11_8UpdateProjectTypeCategory from "./F11_8UpdateProjectTypeCategory";

// TypeScript Interface for the data
export interface TopicDetail {
    id: number;
    topicTypeCode: string;
    topicTypeName: string;
    topicLevelCode: string;
    topicLevelName: string;
    hours: number;
    score: number | null; // Assuming score can be a number or null if empty
    isStop: boolean;
    note: string | null; // Assuming note can be a string or null if empty
}
export default function F11_8ReadProjectTypeCategory() {

    const columns = useMemo<MRT_ColumnDef<TopicDetail>[]>(
        () => [
            {
                header: "Mã loại đề tài",
                accessorKey: "topicTypeCode"
            },
            {
                header: "Tên loại đề tài",
                accessorKey: "topicTypeName"
            },
            {
                header: "Mã cấp đề tài",
                accessorKey: "topicLevelCode"
            },
            {
                header: "Tên cấp đề tài",
                accessorKey: "topicLevelName"
            },
            {
                header: "Số giờ",
                accessorKey: "hours",
                accessorFn(row) {
                    return (
                        <MyNumberFormatter value={row.hours} suffix="" />
                    )
                },
            },
            {
                header: "Số điểm",
                accessorKey: "score"
            },
            {
                header: "Ngừng sử dụng",
                accessorKey: "isStop",
                accessorFn(row) {
                    return (
                        <Checkbox checked={row.isStop} readOnly/>
                    )
                }
            },
            {
                header: "Ghi chú",
                accessorKey: "note"
            },

        ],
        []
    );
    return (
        <MyFieldset title="Danh mục loại đề tài">
            <MyDataTable
                columns={columns}
                data={mockData || []}
                enableRowSelection={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <F11_8CreateProjectTypeCategory />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <F11_8DeleteListProjectTypeCategory values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F11_8UpdateProjectTypeCategory values={row.original} />
                            <F11_8DeleteProjectTypeCategory id={row.original.id!} code={row.original.topicTypeCode} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}




const mockData: TopicDetail[] = [
    {
        "id": 1,
        "topicTypeCode": "DTNN",
        "topicTypeName": "Đề tài cấp Bộ",
        "topicLevelCode": "Bo",
        "topicLevelName": "Cấp Bộ",
        "hours": 12000,
        "score": null,
        "isStop": false,
        "note": null
    }
]