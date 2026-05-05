'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Checkbox } from "@mantine/core";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import StudentGuideDocsCreate from "./StudentGuideDocsCreate";
import StudentGuideDocsDelete from "./StudentGuideDocsDelete";
import StudentGuideDocsDeleteList from "./StudentGuideDocsDeleteList";
import StudentGuideDocsUpdate from "./StudentGuideDocsUpdate";
export interface TopicDetail {
    id: number;
    topicTypeCode: string;
    topicTypeName: string;
    topicLevelCode: string;
    topicLevelName: string;
    hours: number;
    score: number | null;
    isStop: boolean;
    note: string | null;
}
export default function StudentGuideDocsRead() {

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
                accessorKey: "hours"
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
                        <Checkbox checked={row.isStop} readOnly></Checkbox>
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
        <MyFieldset title="Danh sách loại đề tài">
            <MyDataTable
                columns={columns}
                enableRowSelection
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <StudentGuideDocsCreate />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <StudentGuideDocsDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />

                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <StudentGuideDocsUpdate values={row.original} />
                            <StudentGuideDocsDelete id={row.original.id!} code={row.original.topicTypeCode} />
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
        "topicTypeCode": "DTKH",
        "topicTypeName": "Đề tài cấp Khoa đã được nghiệm thu",
        "topicLevelCode": "KH",
        "topicLevelName": "Cấp Khoa",
        "hours": 150,
        "score": null,
        "isStop": false,
        "note": null
    },
    {
        "id": 2,
        "topicTypeCode": "DTTR",
        "topicTypeName": "Đề tài cấp Trường đã nghiệm thu",
        "topicLevelCode": "TR",
        "topicLevelName": "Cấp Trường",
        "hours": 300,
        "score": null,
        "isStop": false,
        "note": null
    }
]
