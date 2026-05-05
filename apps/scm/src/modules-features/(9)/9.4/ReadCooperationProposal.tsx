'use client'
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset, MyNumberFormatter } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CooperationProposalCreate from "./CreateCooperationProposal";
import CooperationProposalUpdate from "./UpdateCooperationProposal";
import CooperationProposalDelete from "./DeleteCooperationProposal";

export interface CooperationProposalResearch {
    id: number,
    coreProposal: string;
    codeOpportunity: String;
    name: string;
    idParner: String;
    date: String;
    proposalStatus: String;
    price: string;
    internalManager: String;
    link: String;
    results: String;
}

export default function CooperationProposalLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<CooperationProposalResearch>[]>(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "coreProposal",
        },
        {
            header: "Mã cơ hội (FK)",
            accessorKey: "codeOpportunity",
        },
        {
            header: "Tên đề xuất",
            accessorKey: "name",
        },
        {
            header: "Đối tác (Mã DT FK)",
            accessorKey: "idParner",
        },
        {
            header: "Ngày gửi đề xuất",
            accessorKey: "date",
        },
        {
            header: "Trạng thái đề xuất",
            accessorKey: "proposalStatus",
        },
        {
            header: "Kinh phí đề xuất (VND)",
            accessorKey: "price",
        },
        {
            header: "Người chủ nhiệm nội bộ",
            accessorKey: "internalManager",
        },
        {
            header: "Link file đề xuất",
            accessorKey: "link",
            Cell: ({ cell }) => (
                <MyButtonViewPDF />
            ),
        },
        {
            header: "kết quả",
            accessorKey: "results",
        },
    ], []);

    return (
        <MyFieldset title="Danh sách đề xuất hợp tác" >
            <MyDataTable
                enableRowNumbers={false}
                enableRowSelection={true}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <CooperationProposalCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <CooperationProposalUpdate values={row.original} />
                            <CooperationProposalDelete id={row.original.id || 0} code={row.original.coreProposal} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockData: CooperationProposalResearch[] = [
    {
        id: 1,
        coreProposal: "DX-2025-001",
        codeOpportunity: "CH-2025-001",
        name: "Đề xuất dự án'AI-Enchanced Cancer Diagnostics'",
        idParner: "DTQT-002",
        date: "2025-05-20",
        proposalStatus: "Đang chờ duyệt",
        price: '4.500.000.000',
        internalManager: "DV005 - TS. Trần Bình",
        link: "xem file",
        results: "N/A"
    },
    {
        id: 2,
        coreProposal: "DX-2025-002",
        codeOpportunity: "CH-2025-002",
        name: "Đề xuất trao đổi SInh viên kỹ thuật'",
        idParner: "DTQT-003",
        date: "2025-03-15",
        proposalStatus: "Đã chấp thuận",
        price: '500.000.000',
        internalManager: "CB010 - TS. Lê Hoa",
        link: "xem file",
        results: "Chuyển thành TC-2025-004"
    },
];
