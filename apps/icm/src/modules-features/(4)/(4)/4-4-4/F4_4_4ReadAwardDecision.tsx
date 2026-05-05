'use client'
import MyActionIconU0MyDownloadPDF from "@/components/ActionIcons/ActionIconDownloadPDF/MyActionIconDownloadPDF";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F4_4_4CreateAwardDecision from "./F4_4_4CreateAwardDecision ";
import F4_4_4DeleteAwardDecision from "./F4_4_4DeleteAwardDecision";
import F4_4_4UpdateAwardDecision from "./F4_4_4UpdateAwardDecision";

interface IAwardDecisionViewModel {
    id?: number;
    decisionNumber?: string;
    decisionDate?: Date | undefined;
    decisionName?: string;
    decisionFileUrl?: string;
    totalExpense?: number;
}

const mockData: IAwardDecisionViewModel[] = [
    {
        id: 1,
        decisionNumber: "DEC001",
        decisionDate: new Date("2024-01-15T00:00:00Z"),
        decisionName: "Award Decision 1",
        decisionFileUrl: "http://example.com/dec001.pdf",
        totalExpense: 1000
    },
    {
        id: 2,
        decisionNumber: "DEC002",
        decisionDate: new Date("2024-01-15T00:00:00Z"),
        decisionName: "Award Decision 2",
        decisionFileUrl: "http://example.com/dec002.pdf",
        totalExpense: 2000
    },
    {
        id: 3,
        decisionNumber: "DEC003",
        decisionDate: new Date("2024-01-15T00:00:00Z"),
        decisionName: "Award Decision 3",
        decisionFileUrl: "http://example.com/dec003.pdf",
        totalExpense: 3000
    },
    {
        id: 4,
        decisionNumber: "DEC004",
        decisionDate: new Date("2024-01-15T00:00:00Z"),
        decisionName: "Award Decision 4",
        decisionFileUrl: "http://example.com/dec004.pdf",
        totalExpense: 4000
    },
    {
        id: 5,
        decisionNumber: "DEC005",
        decisionDate: new Date("2024-01-15T00:00:00Z"),
        decisionName: "Award Decision 5",
        decisionFileUrl: "http://example.com/dec005.pdf",
        totalExpense: 5000
    }
];



export default function F4_4_4ReadAwardDecision() {
    const AllAwardDecisionQuery = useQuery<IAwardDecisionViewModel[]>({
        queryKey: [`F4_4_4ReadAwardDecision`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const formatFunctions = {
        ddmmyyyyDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "decisionNumber",
                header: "Số quyết định"
            },
            {
                fieldName: "decisionDate",
                header: "Ngày quyết định",
                format: formatFunctions.ddmmyyyyDate
            },
            {
                fieldName: "decisionName",
                header: "Tên quyết định"
            },
            {
                fieldName: "totalExpense",
                header: "Tổng mức chi"
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<IAwardDecisionViewModel>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "decisionNumber"
            },
            {
                header: "Ngày quyết định",
                accessorKey: "decisionDate",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.decisionDate!))
                },
            },
            {
                header: "Tên quyết định",
                accessorKey: "decisionName"
            },
            {
                header: "File quyết định",
                accessorKey: "decisionFileUrl",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyActionIconViewPDF
                                // pdfLink={row.path!}
                                pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"}
                            />
                            <MyActionIconU0MyDownloadPDF
                                // pdfLink={row.path!}
                                pdfLink={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"}
                            />
                        </MyCenterFull>
                    )
                }
            },
            {
                header: "Tổng mức chi",
                accessorKey: "totalExpense"
            }
        ],
        []
    );

    if (AllAwardDecisionQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllAwardDecisionQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={AllAwardDecisionQuery.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F4_4_4CreateAwardDecision />
                            <AQButtonExportData
                                isAllData={true}
                                objectName="dsKhenThuong"
                                data={AllAwardDecisionQuery.data!}
                                exportConfig={exportConfig}
                            />
                            <AQButtonExportData
                                isAllData={false}
                                objectName="dsKhenThuong"
                                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F4_4_4UpdateAwardDecision initialValues={row.original} />
                        <F4_4_4DeleteAwardDecision id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
