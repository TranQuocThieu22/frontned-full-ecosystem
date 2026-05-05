import { Center, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButtonViewPDF, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ContentApprovalUpdate from "./ContentApprovalUpdate";

export default function ContentApprovalTable() {
    // Mock data for the table
    const contentApprovalQuery = useQuery<I_ContentApprovalTable[]>({
        queryKey: ["curriculumApprovalTable"],
        queryFn: async () => contentApprovalMockData ?? []
    })

    const columns = useMemo<MRT_ColumnDef<I_ContentApprovalTable>[]>(() => [
        { header: "Mã tài liệu", accessorKey: "code" },
        { header: "Tên tài liệu", accessorKey: "name" },
        { header: "Loại tài liệu", accessorKey: "type" },
        { header: "Ban Biên soạn phụ trách", accessorKey: "committeeCode" },
        { header: "Phiên bản hoàn thiện", accessorKey: "version" },
        { header: "Trạng thái bản hoàn thiện", accessorKey: "completionStatus" },
        { header: "Trạng thái phê duyệt", accessorKey: "approvalStatus" },
        { header: "Quyết định chính thức", accessorKey: "officialDecision" },
        { header: "Lý do từ chối", accessorKey: "rejectReason" },
        {
            header: "Ngày phê duyệt",
            accessorFn: row => {if (row.approvalDate) return utils_date_dateToDDMMYYYString(new Date(row.approvalDate)); else return ""}, 
            id: "approvalDate"
        },
        { header: "Người phê duyệt", accessorKey: "approver" },
        { header: "Số Quyết định/Văn bản ban hành", accessorKey: "approvalNumber" },
        {
            header: "File Quyết định/Văn bản ban hành",

            accessorKey: "approvalFile"
        },
        { header: "Ghi chú", accessorKey: "note" }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã tài liệu" },
            { fieldName: "name", header: "Tên tài liệu" },
            { fieldName: "type", header: "Loại tài liệu" },
            { fieldName: "committeeCode", header: "Ban Biên soạn phụ trách" },
            { fieldName: "version", header: "Phiên bản hoàn thiện" },
            { fieldName: "completionStatus", header: "Trạng thái bản hoàn thiện" },
            { fieldName: "approvalStatus", header: "Trạng thái phê duyệt" },
            { fieldName: "officialDecision", header: "Quyết định chính thức" },
            { fieldName: "rejectReason", header: "Lý do từ chối" },
            { fieldName: "approvalDate", header: "Ngày phê duyệt" },
            { fieldName: "approver", header: "Người phê duyệt" },
            { fieldName: "approvalNumber", header: "Số Quyết định/Văn bản ban hành" },
            { fieldName: "approvalFile", header: "File Quyết định/Văn bản ban hành" },
            { fieldName: "note", header: "Ghi chú" }
        ]
    };

    if (contentApprovalQuery.isLoading) {
        return <Center>Đang tải . . .</Center>;
    }
    if (contentApprovalQuery.isError) {
        return <Center>Có Lỗi xảy ra!</Center>;
    }

    return (
        <MyFieldset title="Danh sách tài liệu">
            <MyDataTable
                columns={columns}
                data={contentApprovalQuery.data!}
                enableRowSelection={false}
                enableRowNumbers={false}
                exportAble={false}
                renderTopToolbarCustomActions={() => (<>
                    {/* <AQButtonExportData
                        isAllData
                        objectName="DanhSachTaiLieu"
                        data={contentApprovalQuery.data!}
                        exportConfig={exportConfig}
                    /> */}
                </>)}
                renderRowActions={({ row }) => (
                    <Group justify="space-evenly">
                        <ContentApprovalUpdate data={row.original} />
                    </Group>
                )}
            >

            </MyDataTable>
        </MyFieldset>
    )
}

export interface I_ContentApprovalTable {
    code: string;                // Mã tài liệu
    name: string;                // Tên tài liệu
    type: string;                // Loại tài liệu
    committeeCode: string;       // Ban Biên soạn phụ trách
    version: string;             // Phiên bản hoàn thiện
    completionStatus: string;    // Trạng thái bản hoàn thiện
    approvalStatus: string;      // Trạng thái phê duyệt
    officialDecision: string;    // Quyết định chính thức
    rejectReason: string;        // Lý do từ chối
    approvalDate?: Date;          // Ngày phê duyệt
    approver: string;            // Người phê duyệt
    approvalNumber: string;      // Số Quyết định/Văn bản ban hành
    approvalFile?: string;          // File Quyết định/Văn bản ban hành
    note: string;                // Ghi chú
}

const contentApprovalMockData: I_ContentApprovalTable[] = [
    {
        code: "TDBS-LG-001",
        name: "Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        type: "Chương trình đào tạo",
        committeeCode: "BBCTDT-LG-001",
        version: "V1.3",
        completionStatus: "Đã gửi bản hoàn thiện",
        approvalStatus: "Chờ phê duyệt",
        officialDecision: "",
        rejectReason: "",
        approvalDate: new Date("2026-02-01"),
        approver: "PGS.TS. Lê Văn S (Hiệu trưởng)",
        approvalNumber: "",
        approvalFile: "",
        note: ""
    },
    {
        code: "TDBS-QTKD-002",
        name: "Đề cương chi tiết học phần môn Quản trị chiến lược",
        type: "Đề cương chi tiết học phần",
        committeeCode: "BBDCHP-QTKD-002",
        version: "V2.1",
        completionStatus: "Đã gửi bản hoàn thiện",
        approvalStatus: "Đã phê duyệt",
        officialDecision: "Phê duyệt ban hành",
        rejectReason: "",
        approvalDate: new Date("2025-12-10"),
        approver: "TS. Phan Thị Y (Trưởng phòng Đào tạo)",
        approvalNumber: "QĐ/PDT/2025/12",
        approvalFile: "QD-DCDHP-QTCL.pdf",
        note: "Đã được ban hành chính thức."
    },
    {
        code: "TDBS-NN-003",
        name: "Chương trình đào tạo ngành Ngôn ngữ Anh",
        type: "Chương trình đào tạo",
        committeeCode: "BBCTDT-NN-004",
        version: "V1.0",
        completionStatus: "Đang thực hiện",
        approvalStatus: "Chờ phê duyệt",
        officialDecision: "",
        rejectReason: "",
        approvalDate: undefined,
        approver: "",
        approvalNumber: "",
        approvalFile: "",
        note: "Đang chờ bản hoàn thiện cuối cùng"
    },
    {
        code: "TDBS-KT-004",
        name: "Chương trình đào tạo ngành Kế toán (Cập nhật)",
        type: "Chương trình đào tạo",
        committeeCode: "BBCTDT-KT-005",
        version: "V4.0",
        completionStatus: "Đã gửi bản hoàn thiện",
        approvalStatus: "Đã từ chối",
        officialDecision: "Từ chối ban hành",
        rejectReason: "Nội dung chưa đủ tính cập nhật so với thị trường.",
        approvalDate: new Date("2025-05-20"),
        approver: "GS.TS. Nguyễn Văn V (Hiệu trưởng)",
        approvalNumber: "",
        approvalFile: "",
        note: ""
    }
];
