import { Center, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyButtonViewPDF, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CommitteeContentUpdate from "./CommitteeContentUpdate";

export default function CommitteeContentManagementTable() {
    const importForm = useForm({
        initialValues: {

        },
    });

    // fetch mockdata
    const committeeBoardQuery = useQuery<I_CommitteeBoardTable[]>({
        queryKey: ["committeeBoardTableQuery"],
        queryFn: async () => committeeBoardMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_CommitteeBoardTable>[]>(() => [
        { header: "Mã nhiệm vụ/Ban", accessorKey: "id" },
        { header: "Tên Ban Biên soạn", accessorKey: "name" },
        { header: "Đề xuất liên quan", accessorKey: "relatedProposal" },
        {
            header: "Ngày thành lập",
            accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.establishedDate)),
            id: "establishedDate"
        },
        { header: "Mục tiêu/Yêu cầu công việc", accessorKey: "objectives" },
        {
            header: "Thời hạn hoàn thành nhiệm vụ",
            accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.deadline)),
            id: "deadline"
        },
        { header: "Trạng thái Ban Biên soạn", accessorKey: "status" },
        { header: "Danh sách thành viên (Vai trò)", accessorKey: "members" },
        { header: "File đính kèm", accessorFn: row => (<Center><MyButtonViewPDF /></Center>) },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "id", header: "Mã nhiệm vụ/Ban" },
            { fieldName: "name", header: "Tên Ban Biên soạn" },
            { fieldName: "relatedProposal", header: "Đề xuất liên quan" },
            { fieldName: "establishedDate", header: "Ngày thành lập" },
            { fieldName: "objectives", header: "Mục tiêu/Yêu cầu công việc" },
            { fieldName: "deadline", header: "Thời hạn hoàn thành nhiệm vụ" },
            { fieldName: "status", header: "Trạng thái Ban Biên soạn" },
            { fieldName: "members", header: "Danh sách thành viên (Vai trò)" },
            { fieldName: "note", header: "Ghi chú" },
        ]
    };

    if (committeeBoardQuery.isLoading) {
        return <Center>Đang tải dữ liệu...</Center>;
    }
    if (committeeBoardQuery.isError) {
        return <Center>Có lỗi đang xảy ra</Center>;
    }

    return (
        <MyFieldset title="Danh sách Ban biên soạn">
            <MyDataTable
                columns={columns}
                data={committeeBoardQuery.data!}
                enableRowSelection={false}
                enableRowNumbers={false}
                exportAble={false}
                renderTopToolbarCustomActions={() => (<>
                    <MyButton crudType="create">Thêm</MyButton>
                    <AQButtonExportData
                        objectName="DanhSachBanBienSoan"
                        data={committeeBoardQuery.data!}
                        exportConfig={exportConfig}
                    />
                    <AQButtonCreateByImportFile onSubmit={() => { }} form={importForm} />
                    <MyButton crudType="delete">Xóa</MyButton>
                </>)}
                renderRowActions={({ row }) => (
                    <Group justify="space-evenly">
                        <CommitteeContentUpdate data={row.original} />

                    </Group>
                )}
            >

            </MyDataTable>

        </MyFieldset>
    );
}

export interface I_CommitteeBoardTable {
    id: string;                // Mã nhiệm vụ/Ban
    name: string;              // Tên Ban Biên soạn
    relatedProposal: string;   // Đề xuất liên quan
    establishedDate: Date;   // Ngày thành lập
    objectives: string;        // Mục tiêu/Yêu cầu công việc
    deadline: Date;          // Thời hạn hoàn thành nhiệm vụ
    status: string;            // Trạng thái Ban Biên soạn
    members: string;           // Danh sách thành viên (Vai trò)
    note: string;              // Ghi chú
}

const committeeBoardMockData: I_CommitteeBoardTable[] = [
    {
        id: "BBCTDT-LG-001",
        name: "Ban Biên soạn CTĐT ngành Logistics và Quản lý chuỗi cung ứng",
        relatedProposal: "DXCTDT-KHDT-001",
        establishedDate: new Date("2025-10-20"),
        objectives: "Biên soạn CTĐT theo chuẩn AUN-QA: Tích hợp các module về chuỗi cung ứng số",
        deadline: new Date("2026-03-31"),
        status: "Đang hoạt động",
        members: "TS. Nguyễn Văn C (Trưởng ban); ThS. Lê Thị D (Thành viên); Kỹ sư. Phạm Đức M (Thành viên)",
        note: "",
    },
    {
        id: "BBDCHP-QTKD-002",
        name: "Ban Biên soạn ĐCCTHP môn Quản trị chiến lược",
        relatedProposal: "DXDCHP-QTKD-002",
        establishedDate: new Date("2025-10-25"),
        objectives: "Cập nhật nội dung về chuyển đổi số trong quản trị chiến lược: Cải thiện ví dụ thực tiễn",
        deadline: new Date("2025-12-31"),
        status: "Đang hoạt động",
        members: "ThS. Phạm Thị E (Trưởng ban); TS. Hoàng Văn F (Thành viên)",
        note: "",
    },
    {
        id: "BBCTDT-KTPM-003",
        name: "Ban Rà soát CTĐT ngành Kỹ thuật phần mềm (năm 2024)",
        relatedProposal: "DXCTDT-CNTT-003",
        establishedDate: new Date("2024-11-15"),
        objectives: "Rà soát và đề xuất điều chỉnh CTĐT dựa trên khảo sát doanh nghiệp",
        deadline: new Date("2025-05-30"),
        status: "Đã hoàn thành",
        members: "GS. Lê Quang G (Trưởng ban); TS. Đào Thị H (Thành viên); ThS. Bùi Văn K (Thành viên)",
        note: "",
    }
];
