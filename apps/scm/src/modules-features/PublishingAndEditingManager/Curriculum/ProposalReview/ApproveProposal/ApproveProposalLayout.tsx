'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ApproveProposalCreate from "./ApproveProposalCreate";
import ApproveProposalDelete from "./ApproveProposalDelete";
import ApproveProposalDeleteList from "./ApproveProposalDeleteList";
import ApproveProposalUpdate from "./ApproveProposalUpdate";

export interface CurriculumApprovalDecision {
    id?: number;
    code: string; // Số Quyết định
    issuedDate: string; // Ngày Ban hành
    title: string; // Tiêu đề Quyết định
    signer: string; // Người ký Quyết định
    approvedProposals: ApprovedProposal[]; // Danh sách đề xuất được phê duyệt
}

export interface ApprovedProposal {
    code: string;
    title: string;
}


export default function ApproveProposalLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<CurriculumApprovalDecision>[]>(() => [
        { header: "Số Quyết định", accessorKey: "code" },
        { header: "Ngày Ban hành", accessorKey: "issuedDate" },
        { header: "Tiêu đề Quyết định", accessorKey: "title" },
        { header: "Người ký Quyết định", accessorKey: "signer" },
        {
            header: "Danh sách Mã Đề xuất được phê duyệt",
            accessorFn: (row) => <>{'"'}{row.approvedProposals.map(d => d.code).join("; ")}{'"'}</>,
        },
    ], []);


    return (
        <MyFieldset title="Danh sách quyết định phê duyệt đề xuất" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <ApproveProposalCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <ApproveProposalDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <ApproveProposalUpdate values={row.original} />
                            <ApproveProposalDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

export const mockData: CurriculumApprovalDecision[] = [
    {
        code: "QĐ-GT-2025-001",
        issuedDate: "2025-07-28",
        title: '"Về việc Phê duyệt Đề xuất Biên soạn Giáo trình Quý III/2025"',
        signer: "PGS.TS. Lê Văn T (Hiệu trưởng)",
        approvedProposals: [
            { code: "GT2025001", title: "Giáo trình Nguyên lý Kế toán" },
            { code: "GT2025002", title: "Giáo trình Phân tích Dữ liệu Lớn" },
            { code: "GT2025004", title: "Giáo trình Kinh tế Vĩ mô" },
        ],
        id: 1
    },
    {
        code: "QĐ-GT-2025-002",
        issuedDate: "2025-08-10",
        title: '"Về việc Phê duyệt Đề xuất Biên soạn Giáo trình bổ sung"',
        signer: "PGS.TS. Lê Văn T (Hiệu trưởng)",
        approvedProposals: [
            { code: "GT2025006", title: "Giáo trình Quản trị Rủi ro Tín dụng" },
            { code: "GT2025007", title: "Giáo trình Lập trình Python cho Khoa học Dữ liệu" },
        ],
        id: 2
    },
    {
        code: "QĐ-GT-2025-003",
        issuedDate: "2025-08-15",
        title: '"Về việc Từ chối Đề xuất Biên soạn Giáo trình Quý III/2025"',
        signer: "PGS.TS. Lê Văn T (Hiệu trưởng)",
        approvedProposals: [
            { code: "GT2025003", title: "Giáo trình Dược lý học" },
        ],
        id: 3
    },
];
