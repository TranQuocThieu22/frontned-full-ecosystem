'use client'
import { Center, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CurriculumSyllabusProposalsCreate from "./CurriculumSyllabusProposalsCreate";
import CurriculumSyllabusProposalsUpdate from "./CurriculumSyllabusProposalsUpdate";
import CurriculumSyllabusProposalDelete from "./CurriculumSyllabusProposalDelete";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

export enum EnumProposalType {
    TRAINING_PROGRAM = 1,
    COURSE_DETAIL = 2
}

export const ProposalTypeLabel: Record<EnumProposalType, string> = {
    [EnumProposalType.TRAINING_PROGRAM]: 'Chương trình đào tạo',
    [EnumProposalType.COURSE_DETAIL]: 'Đề cương chi tiết học phần'
}

export enum EnumDepartment {
    ECONOMICS = 1,
    MANAGEMENT = 2,
    IT = 3,
}

export const DepartmentLabel: Record<EnumDepartment, string> = {
    [EnumDepartment.ECONOMICS]: 'Khoa Kinh tế',
    [EnumDepartment.MANAGEMENT]: 'Bộ môn Quản trị',
    [EnumDepartment.IT]: 'Khoa Công nghệ thông tin',
}

export enum EnumProposer {
    USER_1 = 1,
    USER_2 = 2,
    USER_3 = 3,
}

export const ProposerLabel: Record<EnumProposer, string> = {
    [EnumProposer.USER_1]: 'TS. Nguyễn Văn B',
    [EnumProposer.USER_2]: 'ThS. Phạm Thị E',
    [EnumProposer.USER_3]: 'GS. Lê Quang G',
}

export enum EnumProposalStatus {
    DRAFT = 1,
    PENDING = 2,
    REQUEST_EDIT = 3,
    APPROVED = 4,
    CANCELED = 5
}

export const ProposalStatusLabel: Record<EnumProposalStatus, string> = {
    [EnumProposalStatus.DRAFT]: 'Nháp',
    [EnumProposalStatus.PENDING]: 'Chờ xét duyệt',
    [EnumProposalStatus.REQUEST_EDIT]: 'Yêu cầu chỉnh sửa',
    [EnumProposalStatus.APPROVED]: 'Đã phê duyệt',
    [EnumProposalStatus.CANCELED]: 'Bị từ chối',
}

export interface I_Proposal {
    id?: number;
    code: string;               // Mã đề xuất
    name: string;               // Tên đề xuất
    type: number;               // Loại đề xuất
    department: number;         // Phòng/Ban/Đơn vị đề xuất
    proposer: number;           // Người phụ trách đề xuất
    reason: string;             // Lý do đề xuất
    objective: string;          // Mục tiêu chỉnh
    subject: string;            // Đối tượng đào tạo/Môn học liên quan
    expectedMembers: string;    // Danh sách thành viên dự kiến tham gia biên soạn
    expectedEnd: string;        // Thời gian dự kiến hoàn thành biên soạn
    attachment: string;         // Tài liệu đính kèm (dự thảo/minh chứng)
    note: string;               // Ghi chú
    status: number;             // Trạng thái đề xuất
}

export default function CurriculumSyllabusProposalsTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<I_Proposal[]>({
        queryKey: ["CurriculumSyllabusProposalsRead"],
        queryFn: async () => mockData
    });


    const columns = useMemo<MRT_ColumnDef<I_Proposal>[]>(() => [
        { header: "Mã đề xuất", accessorKey: "code" },
        { header: "Tên đề xuất", accessorKey: "name" },
        { header: "Loại đề xuất", accessorKey: "type", accessorFn: row => ProposalTypeLabel[row.type as EnumProposalType] },
        { header: "Phòng/Ban/Đơn vị đề xuất", accessorKey: "department", accessorFn: row => DepartmentLabel[row.department as EnumDepartment] },
        { header: "Người phụ trách đề xuất", accessorKey: "proposer", accessorFn: row => ProposerLabel[row.proposer as EnumProposer] },
        { header: "Lý do đề xuất", accessorKey: "reason" },
        { header: "Mục tiêu chỉnh", accessorKey: "objective" },
        { header: "Đối tượng đào tạo/Môn học liên quan", accessorKey: "subject" },
        { header: "Danh sách thành viên dự kiến tham gia biên soạn", accessorKey: "expectedMembers" },
        {
            header: "Thời gian dự kiến hoàn thành biên soạn",
            id: "expectedEnd",
            accessorFn: row => row.expectedEnd ? utils_date_dateToDDMMYYYString(new Date(row.expectedEnd)) : ""
        },
        {
            header: "Tài liệu đính kèm (dự thảo/minh chứng)",
            accessorKey: "attachment",
            accessorFn: row => <Center>
                <MyButtonViewPDF />
            </Center>
        },
        { header: "Ghi chú", accessorKey: "note" },
        { header: "Trạng thái đề xuất", accessorKey: "status", accessorFn: row => ProposalStatusLabel[row.status as EnumProposalStatus] },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã đề xuất" },
            { fieldName: "name", header: "Tên đề xuất" },
            { fieldName: "type", header: "Loại đề xuất" },
            { fieldName: "department", header: "Phòng/Ban/Đơn vị đề xuất" },
            { fieldName: "proposer", header: "Người phụ tralach đề xuất" },
            { fieldName: "reason", header: "Lý do đề xuất" },
            { fieldName: "objective", header: "Mục tiêu chỉnh" },
            { fieldName: "subject", header: "Đối tượng đào tạo/Môn học liên quan" },
            { fieldName: "expectedMembers", header: "Danh sách thông báo" },
            { fieldName: "expectedEnd", header: "Thời gian dự kiến hoàn thành biên soạn" },
            { fieldName: "attachment", header: "Tài liệu đính kèm (dự thảo/minh chứng)" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "status", header: "Trạng thái đề xuất" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <MyFieldset title={"Danh sách đề xuất"}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <CurriculumSyllabusProposalsCreate />
                            <AQButtonCreateByImportFile
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                objectName="dsUnit"
                                data={query.data || []} exportConfig={exportConfig} />
                            <MyButton crudType="delete" onSubmit={() => { }}>Xóa</MyButton>
                        </Group>
                    )}
                    initialState={{
                        columnVisibility: {
                            modifiedBy: false,
                            modifiedAt: false,
                        }
                    }}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) =>
                        <MyCenterFull>
                            <CurriculumSyllabusProposalsUpdate data={row.original} />
                            <CurriculumSyllabusProposalDelete id={row.original.id || 0} />
                        </MyCenterFull>}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}


const mockData: I_Proposal[] = [
    {

        code: "DXCTDT-KHDT-001",
        name: "Đề xuất xây dựng Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        type: 1,
        department: 1,
        proposer: 1,
        reason: "Đáp ứng nhu cầu thị trường lao động: Cập nhật công nghệ mới",
        objective: "Nâng cao năng lực cạnh tranh của sinh viên: Tối ưu hóa cấu trúc chương trình",
        subject: "Sinh viên ngành Logistics",
        expectedMembers: "TS. Nguyễn Văn C; ThS. Lê Thị D",
        expectedEnd: "2026-03-31",
        attachment: "Xem file",
        note: "",
        status: 2,
    },
    {
        code: "DXDCHP-QTKD-002",
        name: "Đề xuất cập nhật Đề cương chi tiết học phần môn Quản trị chiến lược",
        type: 2,
        department: 2,
        proposer: 2,
        reason: "Cập nhật kiến thức mới về Digital Transformation: Phù hợp với chuẩn đầu ra mới",
        objective: "Nâng cao tính ứng dụng của môn học: Cải thiện điểm đánh giá môn học",
        subject: "Môn Quản trị chiến lược",
        expectedMembers: "TS. Hoàng Văn F; Giảng viên Bộ môn Quản trị",
        expectedEnd: "2025-09-30",
        attachment: "Xem file",
        note: "Cần hỗ trợ tài liệu tham khảo quốc tế",
        status: 2,
    },
    {
        code: "DXCTDT-CNTT-003",
        name: "Đề xuất rà soát CTĐT ngành Kỹ thuật phần mềm (năm 2024)",
        type: 1,
        department: 3,
        proposer: 3,
        reason: "Đánh giá chất lượng chương trình đào tạo theo chuẩn AUN-QA: Chuẩn bị cho kiểm định ngoài",
        objective: "Đảm bảo chất lượng chương trình: Cải thiện phản hồi cựu sinh viên",
        subject: "Sinh viên ngành Kỹ thuật phần mềm",
        expectedMembers: "TS. Đào Thị H; ThS. Bùi Văn K",
        expectedEnd: "2024-12-31",
        attachment: "Xem file",
        note: "Đã được Hội đồng Khoa phê duyệt sơ bộ",
        status: 4,
    }
];

