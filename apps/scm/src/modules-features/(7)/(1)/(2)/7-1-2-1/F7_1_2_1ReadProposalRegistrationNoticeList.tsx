'use client'
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Fieldset } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F7_1_2_1ViewList from "./F7_1_2_1ViewList";

export interface I7_1_2_1ResearchOrientationProposalNotice {
    id?: number;
    sendDate?: string;
    notificationTitle?: string;
}


export default function F7_1_2_1ReadProposalRegistrationNoticeList() {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("80vh");
    const query = useQuery<I7_1_2_1ResearchOrientationProposalNotice[]>({
        queryKey: ["F6_5_2ReadPaymentOfRemuneration"],
        queryFn: async () => data
    })
    const columns = useMemo<MRT_ColumnDef<I7_1_2_1ResearchOrientationProposalNotice>[]>(
        () => [
            {
                header: "STT",
                accessorKey: "id"
            },
            {
                header: "Ngày gửi",
                accessorKey: "sendDate"
            },
            {
                header: "Tiêu đề thông báo",
                accessorKey: "notificationTitle"
            },
            {
                header: "Danh sách người nhận",
                accessorFn: () =>
                    <F7_1_2_1ViewList />
            },
            {
                header: "File đính kèm",
                accessorFn: () =>
                    <MyActionIconViewPDF pdfLink={"https://example.com/sample.pdf"} />,
            },
        ],
        []
    )
    if (query.isLoading) return "Loading..."
    if (query.isError) return "Error!"
    return (
        <>
            <Fieldset legend="Danh sách thông báo đăng ký đề xuất định hướng">
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                />
            </Fieldset>

        </>

    )
}

const data: I7_1_2_1ResearchOrientationProposalNotice[] = [
    {
        id: 1,
        sendDate: "01/01/2024",
        notificationTitle: "Thông báo các Khoa triển khai cho sinh viên đăng ký đề xuất định hướng nghiên cứu năm 2024"
    },

];