'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F8_2_1CreateWorkshopRegistrationFormTab1 from "./F8_2_1CreateWorkshopRegistrationFormTab1";
import FeatDeleteWorkshopRegistrationForm from './F8_2_1DeleteWorkshopRegistrationForm';
import FeatUpdateWorkshopRegistrationForm from './F8_2_1UpdateWorkshopRegistrationForm';
export interface IWorkshopRegistrationForm {
    id?: number; // STT
    workshopName?: string; // Tên hội nghị, hội thảo
    hostUnit?: string; // Đơn vị chủ trì
    organizingUnit?: string; // Đơn vị tổ chức
    coordinatingUnit?: string; // Đơn vị phối hợp
    numberOfDelegates?: number; // Số lượng đại biểu dự kiến
    content?: string; // Nội dung
    time?: string; // Thời gian dự kiến
}

export default function F8_2_1ReadWorkshopRegistrationForm() {
    const query = useQuery<IWorkshopRegistrationForm[]>({
        queryKey: ["F8_2_1ReadWorkshopRegistrationForm"],
        queryFn: async () => [
            {
                id: 1,
                workshopName: "Nâng cao chất lượng dạy học",
                hostUnit: "Khoa công nghệ thông tin",
                organizingUnit: "NLU",
                coordinatingUnit: "VLU",
                numberOfDelegates: 75,
                content: "Trình bày giải pháp ứng dụng của AI trong giáo dục đại học.",
                time: "01/01/2024",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<IWorkshopRegistrationForm>[]>(() => [
        {
            header: "Tên hội nghị, hội thảo",
            accessorKey: "workshopName",
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
            header: "Nội dung",
            accessorKey: "content",
        },
        {
            header: "Thời gian dự kiến",
            accessorKey: "time",
        },
        {
            header: "Phiếu đăng ký",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "Kế hoạch và kinh phí",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F8_2_1CreateWorkshopRegistrationFormTab1 />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateWorkshopRegistrationForm values={row.original} />
                        <FeatDeleteWorkshopRegistrationForm id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
