'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_2_2_1CreateConfirmation from "./F7_2_2_1CreateConfirmation";
import F7_2_2_1DeleteConfirmation from "./F7_2_2_1DeleteConfirmation";
import F7_2_2_1UpdateConfirmation from "./F7_2_2_1UpdateConfirmation";

export interface I7_2_2_1Confirmation {
    promulgateDate: string | number | Date;
    id: number;
    decisionNumber?: string;
    decisionDate?: Date;
    decisionName?: string;
    reseacrhName?: string;
    headOfDepartment?: string;
    advisor?: string;
    decisionFile: string;
}

export default function F7_2_2_1ReadAllConfirmation() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_2_1Confirmation[]>({
        queryKey: ["F7_2_2_1ReadAllConfirmation"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_2_1Confirmation>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "decisionNumber", // Changed to match field in the interface
            },
            {
                header: "Ngày quyết định",
                accessorKey: "decisionDate",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
            },
            {
                header: "Tên quyết định",
                accessorKey: "decisionName", // Changed to match field in the interface
            },
            {
                header: "Tên đề tài",
                accessorKey: "reseacrhName", // Corrected typo and updated field
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "headOfDepartment", // Changed to match field in the interface
            },
            {
                header: "Cố vấn",
                accessorKey: "advisor", // Changed to match field in the interface
            },
            {
                header: "File quyết định",
                accessorKey: "decisionFile", // Changed to match field in the interface
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; // Renders PDF viewer button
                },
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        //Danh sách Quyết định Thành lập hội đồng xét duyệt đề cương/ thuyết minh
        <MyFlexColumn>
            <Text>Danh sách Quyết định Thành lập hội đồng xét duyệt đề cương/ thuyết minh</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_2_2_1CreateConfirmation />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_2_2_1UpdateConfirmation values={row.original} />
                            <F7_2_2_1DeleteConfirmation id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I7_2_2_1Confirmation[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        decisionDate: new Date("2024-10-01"),  // Example date
        decisionName: "Quyết định 1",
        reseacrhName: "Nghiên cứu A",
        headOfDepartment: "Nguyễn Văn A",
        advisor: "Lê Minh B",
        promulgateDate: new Date("2024-10-01"),  // Example promulgate date
        decisionFile: "decision1.pdf",
    },
    {
        id: 2,
        decisionNumber: "QD002",
        decisionDate: new Date("2024-10-10"),  // Example date
        decisionName: "Quyết định 2",
        reseacrhName: "Nghiên cứu B",
        headOfDepartment: "Trần Thị C",
        advisor: "Phan Thanh D",
        promulgateDate: new Date("2024-10-10"),  // Example promulgate date
        decisionFile: "decision2.pdf",
    },
    {
        id: 3,
        decisionNumber: "QD003",
        decisionDate: new Date("2024-10-15"),  // Example date
        decisionName: "Quyết định 3",
        reseacrhName: "Nghiên cứu C",
        headOfDepartment: "Lê Minh E",
        advisor: "Nguyễn Thị F",
        promulgateDate: new Date("2024-10-15"),  // Example promulgate date
        decisionFile: "decision3.pdf",
    },
]; 