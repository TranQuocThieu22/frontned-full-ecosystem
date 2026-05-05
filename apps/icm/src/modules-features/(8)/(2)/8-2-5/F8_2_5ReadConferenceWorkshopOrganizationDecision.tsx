'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F8_2_5CreateConferenceWorkshopOrganizationDecision from "./F8_2_5CreateConferenceWorkshopOrganizationDecision";
import FeatDeleteConferenceWorkshopOrganizationDecision from './F8_2_5DeleteConferenceWorkshopOrganizationDecision';
import FeatUpdateConferenceWorkshopOrganizationDecision from './F8_2_5UpdateConferenceWorkshopOrganizationDecision';

export interface I8_2_5ConferenceWorkshopOrganizationDecision {
    id?: number;
    decisionNumber?: string; // Số quyết định
    decisionDate?: string; // Ngày quyết định
    decisionName?: string; // Tên quyết định
}

export default function ReadTemplate() {
    const query = useQuery<I8_2_5ConferenceWorkshopOrganizationDecision[]>({
        queryKey: [`ConferenceWorkshopOrganizationDecision`],
        queryFn: async () => [
            {
                decisionNumber: "QD/KT001",
                decisionDate: "01/01/2000",
                decisionName: "V/v thực hiện tổ chức hội thảo ngành CNTT 2024",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I8_2_5ConferenceWorkshopOrganizationDecision>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "decisionNumber",
        },
        {
            header: "Ngày quyết định",
            accessorKey: "decisionDate",
        },
        {
            header: "Tên quyết định",
            accessorKey: "decisionName",
        },
        {
            header: "File quyết định",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F8_2_5CreateConferenceWorkshopOrganizationDecision />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateConferenceWorkshopOrganizationDecision values={row.original} />
                        <FeatDeleteConferenceWorkshopOrganizationDecision id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
