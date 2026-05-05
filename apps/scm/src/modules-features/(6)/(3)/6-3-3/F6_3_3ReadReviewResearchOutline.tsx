'use client'
import MyActionIconCheck from "@/components/ActionIcons/ActionIconCheck/MyActionIconCheck";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I6_3_3ReviewResearchOutline {
    id?: number;
    code?: string;
    topicName?: string;
    field?: string;
    leaderName?: string;
    collaborationUnit?: string
    budget?: string
    time?: string;
    result?: string;
    comment?: string;
}

export default function F6_3_3ReadReviewResearchOutline() {
    const query = useQuery<I6_3_3ReviewResearchOutline[]>({
        queryKey: ["F6_3_2ReadResearchOutlineFeedback"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I6_3_3ReviewResearchOutline>[]>(
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
                header: "Lĩnh vực",
                accessorKey: "field"
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "leaderName"
            },
            {
                header: "Đơn vị cộng tác",
                accessorKey: "collaborationUnit"
            },
            {
                header: "Kinh phí",
                accessorKey: "budget"
            },
            {
                header: "Thời gian",
                accessorKey: "time"
            },
            {
                header: "File thuyết minh",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            },
            {
                header: "Duyệt",
                accessorFn: () =>
                    <Checkbox />
            },
            {
                header: "File thuyết minh hoàn thiện cấp trường",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
            },
            {
                header: "Kết quả kiểm tra",
                accessorKey: "result"
            },
            {
                header: "Nhận xét",
                accessorKey: "comment"
            },
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <MyActionIconCheck comment={"Nhận xét"} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

const data: I6_3_3ReviewResearchOutline[] = [
    {
        code: "DT0001",
        topicName: "Đổi mới phương pháp giáo dục",
        field: "Khoa học tự nhiên",
        leaderName: "Nguyễn Văn A",
        collaborationUnit: "Khoa Tự nhiên",
        budget: "115000000",
        time: "11 tháng",
        result: "Đạt yêu cầu",
        comment: "Nhóm đã cập nhập đầy đủ nội dung mà hội đồng yêu cầu"
    },

];