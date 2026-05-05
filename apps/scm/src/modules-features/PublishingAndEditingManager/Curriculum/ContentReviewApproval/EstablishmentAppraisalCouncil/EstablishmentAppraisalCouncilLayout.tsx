'use client'
import { useForm } from "@mantine/form";
import { AQButtonCreateByImportFile, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EstablishmentAppraisalCouncilCreate from "./EstablishmentAppraisalCouncilCreate";
import EstablishmentAppraisalCouncilDelete from "./EstablishmentAppraisalCouncilDelete";
import EstablishmentAppraisalCouncilDeleteList from "./EstablishmentAppraisalCouncilDeleteList";
import EstablishmentAppraisalCouncilUpdate from "./EstablishmentAppraisalCouncilUpdate";

export interface DraftProposal {
    draftCode: string;
    proposalCode: string;
    textbookTitle: string;
    chiefEditor: string;
}

export interface CouncilMember {
    lecturerCode: string;
    name: string;
    department: string;
    role: string;
}

export interface EvaluationCouncil {
    id: number;
    councilCode: string;
    name: string;
    draftProposals: DraftProposal[];
    establishmentDate: string;
    decisionSigner: string;
    chairman: string;
    members: CouncilMember[];
    expectedMeetingDate: string;
    expectedTime: string;
    expectedLocation: string;
    status: string;
    fileUrl: string;
}


export default function EstablishmentAppraisalCouncilLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<EvaluationCouncil>[]>(() => [
        { accessorKey: 'councilCode', header: 'Mã Hội đồng TD' },
        { accessorKey: 'name', header: 'Tên Hội đồng Thẩm định' },
        {
            accessorKey: 'draftProposals',
            header: 'Mã Bản thảo liên quan',
            Cell: ({ row }) =>
                row.original.draftProposals
                    .map((draft) => draft.draftCode)
                    .join('; '),
        },
        { accessorKey: 'establishmentDate', header: 'Ngày Quyết định thành lập' },
        { accessorKey: 'decisionSigner', header: 'Người ký Quyết định' },
        { accessorKey: 'chairman', header: 'Chủ tịch Hội đồng' },
        {
            accessorKey: 'members',
            header: 'Danh sách thành viên Ban biên soạn (Mã GV, Tên, Vai trò)',
            Cell: ({ row }) => (
                <div>
                    {row.original.members.map((m, idx) => (
                        <div key={idx}>
                            {m.lecturerCode}; {m.name}; {m.role}
                        </div>
                    ))}
                </div>
            ),
        },
        { accessorKey: 'expectedMeetingDate', header: 'Ngày họp dự kiến' },
        { accessorKey: 'expectedTime', header: 'Thời gian họp dự kiến' },
        { accessorKey: 'expectedLocation', header: 'Địa điểm họp dự kiến' },
        { accessorKey: 'status', header: 'Trạng thái Hội đồng TD' },
        {
            accessorKey: 'attachedFileUrl',
            header: 'File đính kèm',
            accessorFn: (row) => <MyButtonViewPDF />
        },
    ], []);


    return (
        <MyFieldset title="Danh sách hội đồng thẩm định" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={evaluationCouncils || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <EstablishmentAppraisalCouncilCreate />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                            <MyButton crudType="export" />
                            <EstablishmentAppraisalCouncilDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <EstablishmentAppraisalCouncilUpdate values={row.original} />
                            <EstablishmentAppraisalCouncilDelete id={row.original.id || 0} code={row.original.councilCode} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

export const evaluationCouncils: EvaluationCouncil[] = [
    {
        councilCode: "HDTD2025001",
        name: "HĐ Thẩm định GT Nguyên lý Kế toán & Phân tích Dữ liệu",
        draftProposals: [
            {
                draftCode: "BT001",
                proposalCode: "GT2025001",
                textbookTitle: "Giáo trình Nguyên lý Kế toán",
                chiefEditor: "ThS. Nguyễn Văn A",
            },
            {
                draftCode: "BT002",
                proposalCode: "GT2025002",
                textbookTitle: "Giáo trình Phân tích Dữ liệu Lớn",
                chiefEditor: "TS. Hoàng D",
            },
        ],
        establishmentDate: "2025-10-10",
        decisionSigner: "PGS.TS. Lê Văn T (Hiệu trưởng)",
        chairman: "GS. Phan H (GV0401)",
        members: [
            {
                lecturerCode: "GVB002",
                name: "TS. Trần K",
                department: "KCNTT",
                role: "Thư ký",
            },
            {
                lecturerCode: "GVC003",
                name: "PGS. Đỗ M",
                department: "KDDT",
                role: "Ủy viên phản biện",
            },
            {
                lecturerCode: "GVDD004",
                name: "TS. Nguyễn N",
                department: "KDDT",
                role: "Ủy viên",
            },
        ],
        expectedMeetingDate: "2025-10-25",
        expectedTime: "09:00 - 12:00",
        expectedLocation: "Phòng họp L.301",
        status: "Chưa họp",
        fileUrl: "link/to/file1",
        id: 1
    },
    {
        councilCode: "HDTD2025002",
        name: "HĐ Thẩm định GT Kinh tế Vĩ mô",
        draftProposals: [
            {
                draftCode: "BT003",
                proposalCode: "GT2025004",
                textbookTitle: "Giáo trình Kinh tế Vĩ mô",
                chiefEditor: "PGS. Kim G",
            },
        ],
        establishmentDate: "2025-10-12",
        decisionSigner: "PGS.TS. Lê Văn T (Hiệu trưởng)",
        chairman: "GS. Vũ P (GVE005)",
        members: [
            {
                lecturerCode: "GVF006",
                name: "TS. Trịnh Q",
                department: "KCNTT",
                role: "Thư ký",
            },
            {
                lecturerCode: "GVG007",
                name: "PGS. Hồ R",
                department: "KDDT",
                role: "Ủy viên phản biện",
            },
        ],
        expectedMeetingDate: "2025-10-28",
        expectedTime: "14:00 - 17:00",
        expectedLocation: "Phòng họp L.302",
        status: "Chưa họp",
        fileUrl: "link/to/file2",
        id: 2
    },
    {
        councilCode: "HDTD2025003",
        name: "HĐ Thẩm định GT Dược lý học",
        draftProposals: [
            {
                draftCode: "BT004",
                proposalCode: "GT2025005",
                textbookTitle: "Giáo trình Dược lý học",
                chiefEditor: "TS. Trần T",
            },
        ],
        establishmentDate: "2025-10-15",
        decisionSigner: "PGS.TS. Lê Văn T (Hiệu trưởng)",
        chairman: "GS. Hoàng S (GVH008)",
        members: [
            {
                lecturerCode: "GVI009",
                name: "TS. Đào T",
                department: "KCNTT",
                role: "Thư ký",
            },
        ],
        expectedMeetingDate: "2025-11-05",
        expectedTime: "09:00 - 12:00",
        expectedLocation: "Phòng họp L.303",
        status: "Chưa họp",
        fileUrl: "link/to/file3",
        id: 3
    },
];



export const draftCodeOptions = evaluationCouncils
  .flatMap(council => council.draftProposals)
  .map(draft => draft.draftCode);



export const lecturerOptions = evaluationCouncils
    .flatMap(council => council.members)
    .map(member =>  member.lecturerCode);


export const memberRoleOptions = Array.from(
    new Set(
        evaluationCouncils.flatMap(council =>
            council.members.map(member => member.role)
        )
    )
).map(role => ({
    value: role,
    label: role,
}));
