'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I8_2_5ConferenceWorkshopOrganizationDecision } from "./F8_2_5ReadConferenceWorkshopOrganizationDecision";

export interface I8_2_5ConferenceSeminarList {
    name?: string; // Tên hội nghị hội thảo
    hostUnit?: string; // Đơn vị chủ trì
    organizingUnit?: string; // Đơn vị tổ chức
    coordinatingUnit?: string; // Đơn vị phối hợp
    numberOfDelegates?: number; // Số lượng đại biểu dự kiến
    content?: string; // Nội dung hội nghị hội thảo
    time?: string; // Thời gian thực hiện
    address?: string; // Địa điểm tổ chức
    expense?: number; // Tổng kinh phí
    action?: string // Thao tác
    note?: string; // Nhận xét kiểm tra
}

export default function F8_2_5CreateConferenceWorkshopOrganizationDecision() {

    const form = useForm<I8_2_5ConferenceWorkshopOrganizationDecision>({
        initialValues: {

            decisionNumber: "",
            decisionDate: "",
            decisionName: "",

        }
    })

    const query = useQuery<I8_2_5ConferenceSeminarList[]>({
        queryKey: [`I8_2_5ConferenceSeminarList`],
        queryFn: async () => [
            {
                name: "Nâng cao chất lượng dạy học",
                hostUnit: "Khoa công nghệ thông tin",
                organizingUnit: "NLU",
                coordinatingUnit: "VLU",
                numberOfDelegates: 75,
                content: "Trình bày giải pháp ứng dụng AI trong giáo dục đại học.",
                time: "01/01/2024",
                address: "NLU Phượng Vĩ",
                expense: 150000000,
                action: "Kiểm tra",
                note: "Đủ điều kiện tổ chức",

            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I8_2_5ConferenceSeminarList>[]>(() => [
        {
            header: "Tên hội nghị hội thảo",
            accessorKey: "name",
        },
        {
            header: "Đơn vị chủ trì",
            accessorKey: "hostUnit",
        },
        {
            header: "Đơn vị tổ chức",
            accessorKey: "organizingUnit",
        },
        {
            header: "Đơn vị phối hợp",
            accessorKey: "coordinatingUnit",
        },
        {
            header: "Số lượng đại biểu dự kiến",
            accessorKey: "numberOfDelegates",
        },
        {
            header: "Nội dung hội nghị hội thảo",
            accessorKey: "content",
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "time",
        },
        {
            header: "Địa điểm tổ chức",
            accessorKey: "address",
        },
        {
            header: "Tổng kinh phí",
            accessorKey: "expense",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
        {
            header: "File đăng ký",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "File kế hoạch",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "Thao tác",
            accessorKey: "action",
        },
        {
            header: "Duyệt",
            accessorFn: () =>
                <Checkbox />
        },
        {
            header: "Ghi chú duyệt",
            accessorKey: "note",
        },

    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyButtonCreate objectName="Quyết định tổ chức hội thảo" onSubmit={() => { }} modalSize={"100%"} form={form}  >
            <MyFlexRow>
                <MyTextInput label="Số quyết định" />
                <MyDateInput label="Ngày quyết định" />
            </MyFlexRow>
            <MyTextInput label="Tên quyết định" />
            <MyDataTable
                columns={columns}
                data={query.data!}
            />
        </MyButtonCreate>

    )
}
