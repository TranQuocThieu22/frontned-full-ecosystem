import { Center } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyButtonViewPDF, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CurriculumVersionHistoryTable() {

    const versionQuery = useQuery<I_VersionTable[]>({
        queryKey: ["versionTableQuery"],
        queryFn: async () => versionMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_VersionTable>[]>(() => [
        { header: "Mã phiên bản", accessorKey: "code" },
        { header: "Tên phiên bản/Mã phiên bản", accessorKey: "name" },
        { header: "Tài liệu CTĐT/ĐCCTHP", accessorKey: "document" },
        { header: "Đề xuất biên soạn", accessorKey: "proposalCode" },
        { header: "Ban biên soạn", accessorKey: "committeeCode" },
        { header: "Mô tả phiên bản", accessorKey: "description" },
        { header: "Người tạo/Cập nhật", accessorKey: "author" },
        {
            header: "Thời gian tạo/Cập nhật",
            accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.createdAt)),
            id: "createdAt"
        },
        { header: "Trạng thái phiên bản", accessorKey: "status" },
        {
            header: "File đính kèm của phiên bản",
            accessorFn: row => (<Center><MyButtonViewPDF /></Center>),
            id: "fileAttachment"
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã phiên bản" },
            { fieldName: "name", header: "Tên phiên bản/Mã phiên bản" },
            { fieldName: "document", header: "Tài liệu CTĐT/ĐCCTHP" },
            { fieldName: "proposalCode", header: "Đề xuất biên soạn" },
            { fieldName: "committeeCode", header: "Ban biên soạn" },
            { fieldName: "description", header: "Mô tả phiên bản" },
            { fieldName: "author", header: "Người tạo/Cập nhật" },
            { fieldName: "createdAt", header: "Thời gian tạo/Cập nhật" },
            { fieldName: "status", header: "Trạng thái phiên bản" },
        ]
    };

    if (versionQuery.isLoading) {
        return <Center>Đang tải dữ liệu...</Center>;
    }
    if (versionQuery.isError) {
        return <Center>Có lỗi đang xảy ra</Center>;
    }
    return (
        <MyFieldset title="Danh sách Ban hành">
            <MyDataTable
                columns={columns}
                data={versionQuery.data!}
                enableRowSelection={false}
                enableRowNumbers={false}
                exportAble={false}
                renderTopToolbarCustomActions={() => (<>
                    {/* <AQButtonExportData
                        isAllData
                        objectName="DanhSachBanBienSoan"
                        data={versionQuery.data!}
                        exportConfig={exportConfig}
                    /> */}

                </>)}

            >

            </MyDataTable>

        </MyFieldset>
    )
}

export interface I_VersionTable {
    code: string;              // Mã phiên bản
    name: string;              // Tên phiên bản/Mã phiên bản
    document: string;          // Tài liệu CTĐT/ĐCCTHP
    proposalCode: string;      // Đề xuất biên soạn
    committeeCode: string;     // Ban biên soạn
    description: string;       // Mô tả phiên bản
    author: string;            // Người tạo/Cập nhật
    createdAt: Date;           // Thời gian tạo/Cập nhật
    status: string;            // Trạng thái phiên bản
}

const versionMockData: I_VersionTable[] = [
    {
        code: "PBLG-2026-V10",
        name: "Phiên bản 10 (Ban hành chính thức)",
        document: "Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        proposalCode: "DXCTDT-KHDT-001",
        committeeCode: "BBCTDT-LG-001",
        description: "Phiên bản chính thức được Hiệu trưởng ký ban hành.",
        author: "PGS. Lê Văn S",
        createdAt: new Date("2026-02-01T10:00:00"),
        status: "Đã ban hành",
    },
    {
        code: "PBLG-2026-V13",
        name: "Phiên bản 13 (Sửa hoàn thiện)",
        document: "Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        proposalCode: "DXCTDT-KHDT-001",
        committeeCode: "BBCTDT-LG-001",
        description: "Đã chỉnh sửa và bổ sung theo góp ý từ Hội đồng thẩm định.",
        author: "TS. Nguyễn Văn C",
        createdAt: new Date("2026-01-20T15:30:00"),
        status: "Sửa đã hoàn thiện",
    },
    {
        code: "PBLG-2026-V12",
        name: "Phiên bản 12 (Hội đồng thẩm định)",
        document: "Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        proposalCode: "DXCTDT-KHDT-001",
        committeeCode: "BBCTDT-LG-001",
        description: "Bản nhập chờ Hội đồng thẩm định lần 1.",
        author: "TS. Lê Thị Y",
        createdAt: new Date("2025-12-12T14:00:00"),
        status: "Bản đã thẩm định",
    },
    {
        code: "PBDCHP-QTKD-V2.1",
        name: "Phiên bản 2.1 (Ban hành chính thức)",
        document: "Đề cương chi tiết học phần môn Quản trị chiến lược",
        proposalCode: "DXDCHP-QTKD-002",
        committeeCode: "BBDCHP-QTKD-002",
        description: "Phiên bản chính thức được Trưởng phòng Đào tạo ký ban hành.",
        author: "ThS. Phan Thị Y",
        createdAt: new Date("2025-12-10T14:00:00"),
        status: "Đã ban hành",
    },
    {
        code: "PBDCHP-QTKD-V2.0",
        name: "Phiên bản 2.0 (Sửa hoàn thiện)",
        document: "Đề cương chi tiết học phần môn Quản trị chiến lược",
        proposalCode: "DXDCHP-QTKD-002",
        committeeCode: "BBDCHP-QTKD-002",
        description: "Đã hoàn thiện theo góp ý của Hội đồng.",
        author: "ThS. Phạm Thị E",
        createdAt: new Date("2025-08-25T16:35:00"),
        status: "Sửa đã hoàn thiện",
    },
    {
        code: "PBNNA-2026-V10",
        name: "Phiên bản 10 (Bản nháp đầu tiên)",
        document: "Chương trình đào tạo ngành Ngôn ngữ Anh",
        proposalCode: "DXCTDT-NN-004",
        committeeCode: "BBCTDT-NN-004",
        description: "Bản nháp khởi tạo ban đầu theo đề xuất.",
        author: "PGS. Đinh Thị L",
        createdAt: new Date("2025-11-20T10:00:00"),
        status: "Bản nháp",
    },
];
