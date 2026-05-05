'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EstablishmentEditorialCreate from "./EstablishmentEditorialCreate";
import EstablishmentEditorialDelete from "./EstablishmentEditorialDelete";
import EstablishmentEditorialDeleteList from "./EstablishmentEditorialDeleteList";
import EstablishmentEditorialUpdate from "./EstablishmentEditorialUpdate";

export interface ApprovedProposal {
    code: string;
    title: string;
}

export interface Member {
    lecturerCode: string;
    unit: string;
    name: string;
    role: string;
}

export interface EditingBoard {
    id: number;
    code: string;
    name: string;
    proposalCode: string;
    proposalTitle: string;
    chiefEditor: string;
    members: Member[];
    establishedDate: string;
    objectives: string;
    note: string;
    fileUrl: string;
    status: string;
    approvedProposals: ApprovedProposal[];
}

export default function EstablishmentEditorialLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<EditingBoard>[]>(() => [
        {
            accessorKey: 'code',
            header: 'Mã ban biên soạn',
        },
        {
            accessorKey: 'name',
            header: 'Tên ban biên soạn',
        },
        {
            accessorKey: 'proposalCode',
            header: 'Mã đề xuất',
        },
        {
            accessorKey: 'proposalTitle',
            header: 'Tên giáo trình đề xuất',
        },
        {
            accessorKey: 'chiefEditor',
            header: 'Chủ biên Ban biên soạn',
        },
        {
            accessorKey: 'members',
            header: 'Danh sách thành viên Ban biên soạn (Mã GV, Tên, Vai trò)',
            Cell: ({ row }) => (
                <div>
                    {row.original.members.map((m, idx) => (
                        <div key={idx}>
                            {m.lecturerCode}, {m.name}, {m.role}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: 'establishedDate',
            header: 'Ngày thành lập',
        },
        {
            accessorKey: 'objectives',
            header: 'Mục tiêu công việc',
        },
        {
            accessorKey: 'note',
            header: 'Ghi chú',
        },
        {
            accessorKey: 'fileUrl',
            header: 'File đính kèm',
            accessorFn: () => <MyButtonViewPDF />
        },
        {
            accessorKey: 'status',
            header: 'Trạng thái Đề xuất',
        },
    ], []);


    return (
        <MyFieldset title="Danh sách ban biên soạn" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={mockEditingBoards || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <EstablishmentEditorialCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <EstablishmentEditorialDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <EstablishmentEditorialUpdate values={row.original} />
                            <EstablishmentEditorialDelete id={row.original.id || 0} code={row.original.code} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

const mockEditingBoards: EditingBoard[] = [
    {
        id: 1,
        code: "BBGT2025001",
        name: "Ban biên soạn X",
        proposalCode: "GT2025001",
        proposalTitle: "Giáo trình Nguyên lý Kế toán",
        chiefEditor: "ThS. Nguyễn Văn A (GV12345)",
        members: [
            {
                lecturerCode: "GV67890",
                name: "TS. Trần Thị B",
                unit: "KCNTT",
                role: "Chủ biên",
            },
            {
                lecturerCode: "GV33443",
                name: "ThS. Phạm C",
                unit: "KDDT",
                role: "Thành viên",
            },
        ],
        establishedDate: "2025-08-01",
        objectives: `Hoàn thành bản thảo chương 1-3 trong 3 tháng,\nTổ chức họp nhóm định kỳ 2 tuần/lần.`,
        note: `Ban đầu dự kiến 2 thành viên, sau đó bổ sung thêm 1 thành viên.`,
        fileUrl: "Xem file",
        status: "Đang biên soạn",
        approvedProposals: [
            { code: "GT2025001", title: "Giáo trình Nguyên lý Kế toán" },
            { code: "GT2025002", title: "Giáo trình Phân tích Dữ liệu Lớn" },
            { code: "GT2025004", title: "Giáo trình Kinh tế Vĩ mô" },
        ],
    },
    {
        id: 2,
        code: "BBGT2025002",
        name: "Ban biên soạn Y",
        proposalCode: "GT2025002",
        proposalTitle: "Giáo trình Phân tích Dữ liệu Lớn",
        chiefEditor: "TS. Hoàng D (GV49887)",
        members: [
            {
                lecturerCode: "GV55467",
                name: "GS. Lê E",
                unit: "KCNTT",
                role: "Thành viên",
            },
            {
                lecturerCode: "GV77889",
                name: "ThS. Vũ F",
                unit: "KDDT",
                role: "Thành viên",
            },
        ],
        establishedDate: "2025-08-05",
        objectives: `Xây dựng khung nội dung chi tiết cho toàn bộ giáo trình trong 1 tháng,\nPhân công nhiệm vụ cụ thể cho từng thành viên.`,
        note: `Cần chú ý cập nhật các công nghệ Big Data mới nhất.`,
        fileUrl: "Xem file",
        status: "Đang biên soạn",
        approvedProposals: [
            { code: "GT2025006", title: "Giáo trình Quản trị Rủi ro Tín dụng" },
            { code: "GT2025007", title: "Giáo trình Lập trình Python cho Khoa học Dữ liệu" },
        ],
    },
    {
        id: 3,
        code: "BBGT2025003",
        name: "Ban biên soạn Z",
        proposalCode: "GT2025004",
        proposalTitle: "Giáo trình Kinh tế Vĩ mô",
        chiefEditor: "PGS. Kim G (GV44556)",
        members: [
            {
                lecturerCode: "GV11223",
                name: "TS. Phan H",
                unit: "KDDT",
                role: "Thành viên",
            },
        ],
        establishedDate: "2025-08-10",
        objectives: "Hoàn thành bản thảo chương 1 trong 2 tháng.",
        note: "Giáo trình này có tính liên ngành cao.",
        fileUrl: "Xem file",
        status: "Đang biên soạn",
        approvedProposals: [
            { code: "GT2025003", title: "Giáo trình Dược lý học" },
        ],
    },
];


export const roleOptions = Array.from(
    new Set(
        mockEditingBoards.flatMap(board => board.members.map(m => m.role))
    )
).map(role => ({
    value: role,
    label: role,
}));
