'use client'
import MyActionIconU0MyDownloadPDF from "@/components/ActionIcons/ActionIconDownloadPDF/MyActionIconDownloadPDF";
import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F4_4_2ApproveButton from "./F4_4_2ApproveButton";

interface IScientificResearchAward {
    id: number;
    code?: string;
    fullName?: string;
    awardCategory?: string;
    awardContent?: string;
    evidenceFile?: string;
    isApproved?: boolean;
    ratingNote?: string;
}

const mockData = [
    {
        id: 1,
        code: "SR001",
        fullName: "Dr. John Doe",
        awardCategory: "Physics",
        awardContent: "For outstanding research in quantum mechanics",
        evidenceFile: "quantum_mechanics_research.pdf",
        isApproved: true,
        ratingNote: "Excellent"
    },
    {
        id: 2,
        code: "SR002",
        fullName: "Dr. Jane Smith",
        awardCategory: "Chemistry",
        awardContent: "For groundbreaking work in organic chemistry",
        evidenceFile: "organic_chemistry_research.pdf",
        isApproved: true,
        ratingNote: "Very Good"
    },
    {
        id: 3,
        code: "SR003",
        fullName: "Dr. Emily Johnson",
        awardCategory: "Biology",
        awardContent: "For significant contributions to genetic research",
        evidenceFile: "genetic_research.pdf",
        isApproved: false,
        ratingNote: "Pending"
    },
    {
        id: 4,
        code: "SR004",
        fullName: "Dr. Michael Brown",
        awardCategory: "Mathematics",
        awardContent: "For innovative approaches in algebraic topology",
        evidenceFile: "algebraic_topology_research.pdf",
        isApproved: true,
        ratingNote: "Outstanding"
    },
    {
        id: 5,
        code: "SR005",
        fullName: "Dr. Sarah Davis",
        awardCategory: "Computer Science",
        awardContent: "For advancements in artificial intelligence",
        evidenceFile: "ai_research.pdf",
        isApproved: false,
        ratingNote: "Under Review"
    }
]

export default function F4_4_2ApproveScientificResearchAward() {

    const AllScientificResearchAwardQuery = useQuery<IScientificResearchAward[]>({
        queryKey: [`F4_4_1ReadScientificResearchAward`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isApproved: (value: boolean) => (value ? "Đã duyệt" : "Chưa duyệt")
    };

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
                fieldName: "awardCategory",
                header: "Hạng mục khen thưởng"
            },
            {
                fieldName: "awardContent",
                header: "Nội dung đề nghị"
            },
            {
                fieldName: "evidenceFile",
                header: "File minh chứng"
            },
            {
                fieldName: "isApproved",
                header: "Trạng thái duyệt",
                formatFunction: formatFunctions.isApproved
            }
        ]
    };

    const columns = useMemo<MRT_ColumnDef<IScientificResearchAward>[]>(
        () => [
            {
                header: "Mã giảng viên",
                accessorKey: "code"
            },
            {
                header: "Họ và tên",
                accessorKey: "fullName"
            },
            {
                header: "Hạng mục khen thưởng",
                accessorKey: "awardCategory",
            },
            {
                header: "Nội dung đề nghị",
                accessorKey: "awardContent",
            },
            {
                header: "File minh chứng",
                accessorKey: "evidenceFile",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyActionIconViewPDF
                                pdfLink="https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"
                            // pdfLink={row.evidenceFile!}
                            />
                            <MyActionIconU0MyDownloadPDF
                                pdfLink="https://datafiles.chinhphu.vn/cpp/files/vbpq/2021/07/17-bgd.signed.pdf"
                            // pdfLink={row.evidenceFile!}
                            />
                        </MyCenterFull>
                    )
                }
            },
            // {
            //     header: "Trạng thái duyệt",
            //     accessorKey: "isApproved",
            //     accessorFn(originalRow) {
            //         return originalRow.isApproved ?
            //             <Center>
            //                 <Checkbox
            //                     readOnly
            //                     checked={true}
            //                     color="green"
            //                 />
            //             </Center>
            //             :
            //             <Center>
            //                 <Checkbox
            //                     readOnly
            //                     checked={false}
            //                     color="red"
            //                 />
            //             </Center>
            //     },
            // },
            {
                header: "Đánh giá",
                accessorKey: "ratingNote",
            },
            {
                header: "Duyệt",
                accessorFn: (row) =>
                    <F4_4_2ApproveButton data={row}
                    />
            }
        ],
        []
    );


    if (AllScientificResearchAwardQuery.isLoading) return "Đang tải dữ liệu..."
    if (AllScientificResearchAwardQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={AllScientificResearchAwardQuery.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <AQButtonExportData
                                objectName="dsKhenThuong"
                                data={AllScientificResearchAwardQuery.data!}
                                exportConfig={exportConfig} isAllData={false}                            />
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
        // renderRowActions={({ row }) => (
        //     <Group>
        //         <F4_4_2ApproveButton data={row.original}
        //         />
        //     </Group>
        // )
        // }

        />
    )
}