'use client'
import { Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
    AQButtonCreateByImportFile,
    AQButtonExportData,
    MyButtonViewPDF,
    MyCenterFull,
    MyDataTable,
    MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CooperationPlanCreate from "./CooperationPlanCreate";
import CooperationPlanDelete from "./CooperationPlanDelete";
import CooperationPlanDeleteList from "./CooperationPlanDeleteList";
import CooperationPlanUpdate from "./CooperationPlanUpdate";

export default function CooperationPlanTable() {
    const form = useForm<any>({
        initialValues: {}
    });

    const query = useQuery<I_CooperationPlanTable[]>({
        queryKey: ['CooperationPlanQuery'],
        queryFn: async () => cooperationPlanMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_CooperationPlanTable>[]>(() => [
        { header: "Mã Thỏa thuận", accessorKey: "code" },
        { header: "Tên Thỏa thuận", accessorKey: "name" },
        { header: "Đối tác (Mã Đối tác FK)", accessorKey: "partnerCode" },
        { header: "Loại Thỏa thuận", accessorKey: "type" },
        {
            header: "Ngày ký",
            accessorFn: row => row.signDate ? utils_date_dateToDDMMYYYString(row.signDate) : "",
            id: "signDate"
        },
        {
            header: "Ngày hiệu lực",
            accessorFn: row => row.effectiveDate ? utils_date_dateToDDMMYYYString(row.effectiveDate) : "",
            id: "effectiveDate"
        },
        {
            header: "Ngày hết hạn",
            accessorFn: row => row.expireDate ? utils_date_dateToDDMMYYYString(row.expireDate) : "",
            id: "expireDate"
        },
        { header: "Lĩnh vực Hợp tác", accessorKey: "field" },
        { header: "Tóm tắt Nội dung", accessorKey: "summary" },
        { header: "Trạng thái", accessorKey: "status" },
        { header: "Người Phụ Trách", accessorKey: "manager" },
        {
            header: "Link File Thỏa thuận",
            accessorFn: row => (<Center><MyButtonViewPDF /></Center>),
            id: "agreementFile"
        },
        { header: "Ghi chú", accessorKey: "note" },
        { header: "Mã Đề xuất", accessorKey: "proposalCode" }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Thỏa thuận" },
            { fieldName: "name", header: "Tên Thỏa thuận" },
            { fieldName: "partnerCode", header: "Đối tác (Mã Đối tác FK)" },
            { fieldName: "type", header: "Loại Thỏa thuận" },
            { fieldName: "signDate", header: "Ngày ký" },
            { fieldName: "effectiveDate", header: "Ngày hiệu lực" },
            { fieldName: "expireDate", header: "Ngày hết hạn" },
            { fieldName: "field", header: "Lĩnh vực Hợp tác" },
            { fieldName: "summary", header: "Tóm tắt Nội dung" },
            { fieldName: "status", header: "Trạng thái" },
            { fieldName: "manager", header: "Người Phụ Trách" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "proposalCode", header: "Mã Đề xuất" }
        ]
    };


    return (
        <MyFieldset title="Danh sách thoả thuận hợp tác">
            <MyDataTable
                isLoading={query.isLoading}
                isError={query.isError}
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                data={query.data || []}
                renderTopToolbarCustomActions={({ table }) => (
                    <MyCenterFull>
                        <CooperationPlanCreate />
                        <AQButtonCreateByImportFile onSubmit={() => { }} form={form} /> 
                        <AQButtonExportData
                            
                            objectName="DanhSachQuanHeDoiTac"
                            data={query.data ?? []}
                            exportConfig={exportConfig} />
                        <CooperationPlanDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)}/>
                    </MyCenterFull>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <CooperationPlanUpdate values={row.original} />
                        <CooperationPlanDelete agreementCode={row.original.code} />

                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}

export interface I_CooperationPlanTable {
    code: string;                // Mã Thỏa thuận
    name: string;                // Tên Thỏa thuận
    partnerCode: string;         // Đối tác (Mã Đối tác FK)
    type: string;                // Loại Thỏa thuận
    signDate?: Date;             // Ngày ký
    effectiveDate?: Date;        // Ngày hiệu lực
    expireDate?: Date;           // Ngày hết hạn
    field: string;               // Lĩnh vực Hợp tác
    summary: string;             // Tóm tắt Nội dung
    status: string;              // Trạng thái
    manager: string;             // Người Phụ Trách
    note: string;                // Ghi chú
    proposalCode: string;        // Mã Đề xuất
}

const cooperationPlanMockData: I_CooperationPlanTable[] = [
    {
        code: "THTQT-2023-001",
        name: "MOU về Nghiên cứu và Trao đổi Sinh viên",
        partnerCode: "DTQT-001",
        type: "MOU",
        signDate: new Date("2023-08-15"),
        effectiveDate: new Date("2023-08-15"),
        expireDate: new Date("2028-08-14"),
        field: "Công nghệ thông tin; Trí tuệ nhân tạo",
        summary: "Khung hợp tác nghiên cứu; trao đổi sinh viên và giảng viên.",
        status: "Còn hiệu lực",
        manager: "Phòng Hợp tác Quốc tế",
        note: "Đã đề xuất 2 dự án nghiên cứu dưới MOU này.",
        proposalCode: "DX-2025-001"
    },
    {
        code: "THTQT-2024-002",
        name: "Thỏa thuận Hợp tác Nghiên cứu Y sinh",
        partnerCode: "DTQT-002",
        type: "Agreement",
        signDate: new Date("2024-03-01"),
        effectiveDate: new Date("2024-03-01"),
        expireDate: new Date("2028-02-28"),
        field: "Y sinh; Sinh học",
        summary: "Nghiên cứu chung về vaccine thế hệ mới.",
        status: "Còn hiệu lực",
        manager: "Khoa Y",
        note: "Cần xem xét gia hạn vào cuối năm 2028.",
        proposalCode: "DX-2025-001"
    },
    {
        code: "THTQT-2024-003",
        name: "Biên bản ghi nhớ Hợp tác Đào tạo Kỹ thuật",
        partnerCode: "DTQT-003",
        type: "MOA",
        signDate: new Date("2024-05-10"),
        effectiveDate: new Date("2024-05-10"),
        expireDate: new Date("2027-05-09"),
        field: "Kỹ thuật; Năng lượng tái tạo",
        summary: "Hợp tác phát triển chương trình đào tạo kỹ sư năng lượng mặt trời.",
        status: "Còn hiệu lực",
        manager: "Khoa Kỹ thuật",
        note: "Hiện chưa có dự án cụ thể nào phát sinh.",
        proposalCode: "DX-2025-001"
    },
    {
        code: "THTQT-2021-004",
        name: "Thỏa thuận về Trao đổi Giảng viên và Nghiên cứu chung",
        partnerCode: "DTQT-005",
        type: "Agreement",
        signDate: new Date("2021-11-20"),
        effectiveDate: new Date("2021-11-20"),
        expireDate: new Date("2024-11-19"),
        field: "Khoa học Vật liệu; Kỹ thuật Nano",
        summary: "Trao đổi giảng viên và hợp tác nghiên cứu về vật liệu nano.",
        status: "Hết hiệu lực",
        manager: "Phòng KHCN",
        note: "Đã kết thúc và không gia hạn. Cần đánh giá tổng kết.",
        proposalCode: "DX-2025-001"
    },
    {
        code: "THTQT-2025-005",
        name: "Hợp đồng Li-xăng Công nghệ 'Smart Home AI'",
        partnerCode: "DTQT-007",
        type: "Hợp đồng",
        signDate: new Date("2025-01-05"),
        effectiveDate: new Date("2025-01-05"),
        expireDate: new Date("2030-01-04"),
        field: "Công nghệ thông tin; Tự động hóa",
        summary: "Chuyển giao quyền sử dụng công nghệ nhà thông minh do trường phát triển.",
        status: "Còn hiệu lực",
        manager: "Trung tâm Chuyển giao Công nghệ",
        note: "Hợp đồng thương mại hóa đầu tiên từ IP của trường.",
        proposalCode: "DX-2025-001"
    }
];
