'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_4_2CreateProgressAndResultsReport from "./F6_4_2CreateProgressAndResultsReport";
import DeleteProgressAndResultsReport from './F6_4_2DeleteProgressAndResultsReport';
import UpdateProgressAndResultsReport from './F6_4_2UpdateProgressAndResultsReport';

export interface I6_4_2ProgressAndResultsReport {
    id?: number;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    time?: string;
    percentageComplete?: string;
    expenditures?: number
}

export default function F6_4_2ReadProgressAndResultsReport() {
    const query = useQuery<I6_4_2ProgressAndResultsReport[]>({
        queryKey: ["f6_4_2ReadProgressAndResultsReport"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_4_2ProgressAndResultsReport>[]>(
        () => [
            {
                header: "Mã đề tài",
                accessorKey: "code"
            },
            {
                header: "Tên đề tài",
                accessorKey: "topicName"
            },
            {
                header: "Tên nhóm nghiên cứu",
                accessorKey: "groupName"
            },
            {
                header: "Trưởng nhóm",
                accessorKey: "leaderName"
            },
            {
                header: "Thời gian thực hiện",
                accessorKey: "time"
            },
            {
                header: "% hoàn thành",
                accessorKey: "percentageComplete"
            },
            {
                header: "Kinh phí đã chi",
                accessorKey: "expenditures"
            },
            {
                header: "File báo cáo tiến độ",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />


            }
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F6_4_2CreateProgressAndResultsReport />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <UpdateProgressAndResultsReport values={row.original} />
                        <DeleteProgressAndResultsReport id={row.original.id!} />
                    </MyCenterFull>
                )
            }} />
    )
}

const data: I6_4_2ProgressAndResultsReport[] = [
    {
        code: "DT00001",
        topicName: "Đổi mới phương pháp giáo dục",
        groupName: "Nhóm A KHTN",
        leaderName: "Nguyễn Văn A",
        time: "11 tháng",
        percentageComplete: "60%",
        expenditures: 58000000
    },

];