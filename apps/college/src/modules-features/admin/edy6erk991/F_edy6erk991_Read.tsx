'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { Button, Select } from "@mantine/core";

// Interface định nghĩa dữ liệu
export interface I_edy6erk991_Read {
    id?: number;
    code: string;
    name?: string;
    birdthday: Date;
    sex: string;
    class: string;
    block: string;
    certificate: string;
    numberregister: number;
    dateregister: Date;
    handler: string;
    orderhandler: number;
    status: string;
    reply: string;
    numberdatehandler: number;
    datestart: Date;
    dateend: Date;
    email: string;
    phone: string;
}

// Component hiển thị bảng dữ liệu
export default function F_edy6erk991_Read() {
    // Query lấy dữ liệu từ server
    const query = useQuery<I_edy6erk991_Read[]>({
        queryKey: ["F_edy6erk991_Read"],
        queryFn: async () => [
            {
                id: 1,
                code: "SV00001",
                name: "Tô Ngọc Lan",
                birdthday: new Date("2000-01-01"),
                sex: "Nữ",
                class: "IT2401",
                block: "IT24",
                certificate: "NVQS",
                numberregister: 1,
                dateregister: new Date("2024-02-28"),
                handler: "LYTN",
                orderhandler: 1,
                status: "Đã xử lý",
                reply: "",
                numberdatehandler: 1,
                datestart: new Date("2024-03-02"),
                dateend: new Date("2024-03-05"),
                email: "",
                phone: "",
            },
            {
                id: 1,
                code: "SV00001",
                name: "Tô Ngọc Lan",
                birdthday: new Date("2000-01-01"),
                sex: "Nữ",
                class: "IT2401",
                block: "IT24",
                certificate: "NVQS",
                numberregister: 1,
                dateregister: new Date("2024-02-28"),
                handler: "LAnTN",
                orderhandler: 2,
                status: "",
                reply: "",
                numberdatehandler: 1,
                datestart: new Date("2024-03-02"),
                dateend: new Date("2024-03-05"),
                email: "",
                phone: "",
            },
            {
                id: 1,
                code: "SV00001",
                name: "Tô Ngọc Lan",
                birdthday: new Date("2000-01-01"),
                sex: "Nữ",
                class: "IT2401",
                block: "IT24",
                certificate: "NVQS",
                numberregister: 1,
                dateregister: new Date("2024-02-28"),
                handler: "LAMTN",
                orderhandler: 3,
                status: "",
                reply: "",
                numberdatehandler: 1,
                datestart: new Date("2024-03-02"),
                dateend: new Date("2024-03-05"),
                email: "",
                phone: "",
            }
        ]
    });
    const exportConfig = {
        fields: [
            {
                header: "Mã sinh viên",
                fieldName: "code",
            },
            {
                header: "Họ tên",
                fieldName: "name",
            },
            {
                header: "Ngày sinh",
                fieldName: "birdthday",
            },
            {
                header: "Giới tính",
                fieldName: "sex",
            },
            {
                header: "Lớp",
                fieldName: "class",
            },
            {
                header: "Khoá",
                fieldName: "block",
            },
            {
                header: "Giải quyet",
                fieldName: "certificate",
            },
            {
                header: "Số lượng ĐK",
                fieldName: "numberregister",
            },
            {
                header: "Ngày đăng ký",
                fieldName: "dateregister",
            },            
            {
                header: "Người đăng ký",
                fieldName: "handler",
            
            },
            {
                header: "Số lần đăng ký",
                fieldName: "orderhandler",
            },
            {
                header: "Trang thái",
                fieldName: "status",
            },
            {
                header: "Phân hành",
                fieldName: "reply",
            },
            {
                header: "Số lần phân hành",
                fieldName: "numberdatehandler",
            },
            {
                header: "Ngày phân hành",
                fieldName: "datestart",
            },
            {
                header: "Ngày hệ thống",
                fieldName: "dateend",
            },

        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_edy6erk991_Read>[]>(
        () => [
            { header: "Mã sinh viên", accessorKey: "code" },
            { header: "Họ tên", accessorKey: "name" },
            {
                header: "Ngày sinh",
                accessorKey: "birdthday",
                Cell: ({ row }) => new Date(row.original.birdthday).toLocaleDateString("vi-VN"),
            },
            { header: "Giới tính", accessorKey: "sex" },
            { header: "Lớp", accessorKey: "class" },
            { header: "Khoá", accessorKey: "block" },
            { header: "Giấy chứng nhận", accessorKey: "certificate" },
            { header: "Số lượng ĐK", accessorKey: "numberregister" },
            {
                header: "Ngày đăng ký",
                accessorKey: "dateregister",
                Cell: ({ row }) => new Date(row.original.dateregister).toLocaleDateString("vi-VN"),
            },
            { header: "User xử lý", accessorKey: "handler" },
            { header: "Thứ tự xử lý", accessorKey: "orderhandler" },
            {
                header: "Trạng thái",
                accessorKey: "status",
                Cell: ({ row }) => (
                    <Select
                        value={row.getValue("status")}
                        onChange={(value) => console.log(`Cập nhật: ${value}`)}
                        data={[
                            { value: "Đã xử lý", label: "Đã xử lý" },
                            { value: "Đang xử lý", label: "Đang xử lý" },
                            { value: "Không xử lý", label: "Không xử lý" },
                        ]}
                    />
                ),
            },
            { header: "Trả lời GCN", accessorKey: "reply" },
            {
                header: "số ngày xử lí",
                accessorKey: "numberdatehandler",
            },
            {
                header: "Ngày tiếp nhận",
                accessorKey: "datestart",
                Cell: ({ row }) => new Date(row.original.datestart).toLocaleDateString("vi-VN"),
            },
            {
                header: "Ngày hết hạn",
                accessorKey: "dateend",
                Cell: ({ row }) => new Date(row.original.dateend).toLocaleDateString("vi-VN"),
            },
            { header: "Email SV", accessorKey: "email" },
            { header: "Điện thoại SV", accessorKey: "phone" },
            { header: "In", accessorKey: "print" },
        ],
        []
    );

    // Xử lí trạng thái dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <><Button color="green">Lưu</Button><AQButtonExportData
                    isAllData={true}
                    objectName="dmTHPB"
                    data={query.data!} exportConfig={exportConfig}  /></>
            )}
        />
    );
}
