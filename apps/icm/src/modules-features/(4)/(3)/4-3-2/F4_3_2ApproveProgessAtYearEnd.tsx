'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F4_3_3ModalProgressByUserId from "../4-3-3/F4_3_3ModalProgressByUserId";
import F4_3_2ApproveButton from "./F4_3_2ApproveButton";

interface IApproveProgressAtYearEndViewModel {
    id?: number;
    code?: string;
    fullName?: string;
    TotalHours?: string;
    ProgressPercentage?: string;
    ReportHours?: string;
    ReportPercentage?: string;
    ConferenceDuration?: string;
    ConferenceProgress?: string;
    Note: string;
    isEnable: boolean;
}

export default function F4_3_3ApproveProgressAtYearEnd() {
    const pogression = useQuery<IApproveProgressAtYearEndViewModel[]>({
        queryKey: [`F4_3_3ApproveProgressAtYearEnd`],
        queryFn: async () =>
            // (await baseAxios.get("userNCKHs?isExternal=false"))
            mockData
    })


    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã"
            },
            {
                fieldName: "fullName",
                header: "Họ và tên"
            },
            {
                fieldName: "TotalHours",
                header: "Số giờ đề tài",
            },
            {
                fieldName: "ProgressPercentage",
                header: "% tiến độ đề tài"
            },
            {
                fieldName: "ReportHours",
                header: "Số giờ bài báo"
            },
            {
                fieldName: "ReportPercentage",
                header: "% tiến độ bài báo"
            },
            {
                fieldName: "ConferenceDuration",
                header: "Số giờ hội thảo",
            },
            {
                fieldName: "ConferenceProgress",
                header: "% tiến độ hội thảo"
            }, {
                fieldName: "Note",
                header: "Ghi chú"
            },
        ]
    };

    const columns = useMemo<MRT_ColumnDef<IApproveProgressAtYearEndViewModel>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã",
                accessorFn(originalRow) {
                    return (
                        <F4_3_3ModalProgressByUserId
                            userId={originalRow.id!}
                            displayText={originalRow.code!}
                        />
                    )
                },
            },
            {
                accessorKey: "fullName",
                header: "Họ và tên"
            },
            {
                accessorKey: "TotalHours",
                header: "Số giờ đề tài",
            },
            {
                accessorKey: "ProgressPercentage",
                header: "% tiến độ đề tài"
            },
            {
                accessorKey: "ReportHours",
                header: "Số giờ bài báo"
            },
            {
                accessorKey: "ReportPercentage",
                header: "% tiến độ bài báo"
            },
            {
                accessorKey: "ConferenceDuration",
                header: "Số giờ hội thảo",
            },
            {
                accessorKey: "ConferenceProgress",
                header: "% tiến độ hội thảo"
            }, {
                accessorKey: "Note",
                header: "Đánh giá"
            }
        ],
        []
    );

    if (pogression.isLoading) return "Đang tải dữ liệu..."
    if (pogression.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={pogression.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>

                    </>
                )
            }}
            renderRowActions={({ row }) => (
                <Group>
                    <F4_3_2ApproveButton data={row.original} />
                </Group>
            )
            }
        />
    )
}


const mockData: IApproveProgressAtYearEndViewModel[] = [{
    id: 1,
    code: "GV001",
    TotalHours: "120",
    fullName: "Nguyen Van A",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Note: "Dung tien do",
    isEnable: true
},
{
    id: 2,
    code: "GV002",
    TotalHours: "120",
    fullName: "Tran Thi B",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Note: "Dung tien do",
    isEnable: true
},
{
    id: 3,
    code: "GV003",
    TotalHours: "120",
    fullName: "Le Van C",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Note: "Dung tien do",
    isEnable: true
},
{
    id: 4,
    code: "GV004",
    fullName: "Pham Thi D",
    TotalHours: "120",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Note: "Dung tien do",
    isEnable: true
},
{
    id: 5,
    code: "GV005",
    TotalHours: "120",
    fullName: "Hoang Van E",
    ProgressPercentage: "50",
    ReportHours: "50",
    ReportPercentage: "40",
    ConferenceDuration: "20",
    ConferenceProgress: "100",
    Note: "Dung tien do",
    isEnable: true
}
]